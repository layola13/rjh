import HSCore from 'HSCore';
import HSFPConstants from 'HSFPConstants';
import HSApp from 'HSApp';
import CopyCommand from './CopyCommand';
import PasteCommand from './PasteCommand';
import CutCommand from './CutCommand';
import DuplicateCommand from './DuplicateCommand';
import PasteSequenceCommand from './PasteSequenceCommand';
import DuplicateSequenceCommand from './DuplicateSequenceCommand';
import PasteContentRequest from './PasteContentRequest';
import { isCopyable, isCuttable } from './ModelUtils';
import ResourceManager from './ResourceManager';
import MessageBox from './MessageBox';

interface PluginDependencies {
  [HSFPConstants.PluginType.UserInput]: UserInputPlugin;
  [HSFPConstants.PluginType.Toolbar]: ToolbarPlugin;
  [HSFPConstants.PluginType.Catalog]: CatalogPlugin;
}

interface InitConfig {
  app: Application;
  dependencies: PluginDependencies;
}

interface Application {
  selectionManager: SelectionManager;
  cmdManager: CommandManager;
  closeCabinetPage: boolean;
  transManager: TransactionManager;
  floorplan: Floorplan;
  activeView?: ActiveView;
  pluginManager: PluginManager;
  activeEnvironmentId: string;
  userTrackLogger: UserTrackLogger;
}

interface SelectionManager {
  selected(): ModelObject[] | ModelObject | null;
}

interface CommandManager {
  current?: Command;
  register(type: string, ...args: unknown[]): void;
  createCommand(type: string, args: unknown[]): Command;
  execute(command: Command): void;
  complete(command: Command): void;
}

interface TransactionManager {
  signalUndone: Signal;
  signalRedone: Signal;
  register(requestType: string, handler: unknown): void;
}

interface Floorplan {
  scene: Scene;
}

interface Scene {
  activeLayer: Layer;
}

interface Layer {
  underlay?: unknown;
}

interface ActiveView {
  pixiContext?: PixiContext;
}

interface PixiContext {
  dirty: boolean;
}

interface PluginManager {
  getPlugin(pluginType: string): Plugin;
}

interface Plugin {
  show?(): void;
  refresh?(arg: undefined, options: { refreshStatusBar: boolean }): void;
  cancelSingleRoom?(): void;
}

interface UserInputPlugin {
  signalCopyOccurred: Signal;
  signalPasteOccurred: Signal;
  signalCutOccurred: Signal;
  getJSON(key: string): EditorJSON | null;
}

interface ToolbarPlugin {
  getItem(name: string): ToolbarItem;
}

interface CatalogPlugin {}

interface ToolbarItem {
  add(config: ToolbarItemConfig): void;
}

interface ToolbarItemConfig {
  label: string;
  name: string;
  order: number;
  hotkey: {
    win: string;
    mac: string;
  };
  hotkeyOptions: {
    description: string;
  };
  logGroup: string;
  onclick(): void;
}

interface Signal {
  add(callback: Function): void;
}

interface Command {
  type: string;
  receive?(action: string): void;
}

interface ModelObject {
  isBackground?(): boolean;
}

interface EditorJSON {
  material?: MaterialJSON;
}

interface MaterialJSON {}

interface UserTrackLogger {
  push(event: string, data: TrackData): void;
}

interface TrackData {
  description: string;
  validOperation?: boolean;
  group: string;
}

interface TransactionEvent {
  data?: {
    request?: {
      subRequests?: SubRequest[];
    };
  };
}

interface SubRequest {
  type: string;
}

const MIX_DECORATION_COMMAND_TYPE = HSFPConstants.CommandType.MixDecoration;
const CUSTOMIZED_TILES_COMMAND_TYPE = HSFPConstants.CommandType.CustomizedTiles;

export default class EditPlugin {
  private _app!: Application;
  private _selectionManager!: SelectionManager;
  private _cmdMgr!: CommandManager;
  private _signalHook!: HSCore.Util.SignalHook;
  private _userinputPlugin!: UserInputPlugin;
  private _toolbarPlugin!: ToolbarPlugin;
  private _catalogPlugin!: CatalogPlugin;
  public isDeleteUnderlay: boolean = false;

  /**
   * Initialize the edit plugin
   */
  public init(config: InitConfig): void {
    const { dependencies } = config;
    this._app = config.app;
    this._selectionManager = this._app.selectionManager;
    this._cmdMgr = this._app.cmdManager;
    this._app.closeCabinetPage = true;
    this._signalHook = new HSCore.Util.SignalHook(this);
    this._userinputPlugin = dependencies[HSFPConstants.PluginType.UserInput];
    this._toolbarPlugin = dependencies[HSFPConstants.PluginType.Toolbar];
    this._catalogPlugin = dependencies[HSFPConstants.PluginType.Catalog];

    this._injectDefaultToolbar();

    this._signalHook
      .listen(this._userinputPlugin.signalCopyOccurred, this._onCopyOccurred)
      .listen(this._userinputPlugin.signalPasteOccurred, this._onPasteOccurred)
      .listen(this._userinputPlugin.signalCutOccurred, this._onCutOccurred)
      .listen(this._app.transManager.signalUndone, this.undoAndRedoRefreshStatusBar)
      .listen(this._app.transManager.signalRedone, this.undoAndRedoRefreshStatusBar);

    const commandType = HSFPConstants.CommandType;
    this._cmdMgr.register(commandType.Copy, CopyCommand);
    this._cmdMgr.register(commandType.Paste, PasteCommand);
    this._cmdMgr.register(commandType.Cut, CutCommand);
    this._cmdMgr.register(commandType.Duplicate, DuplicateCommand);
    this._cmdMgr.register(commandType.PasteSequence, commandType.Sequence, PasteSequenceCommand);
    this._cmdMgr.register(commandType.DuplicateSequence, commandType.Sequence, DuplicateSequenceCommand);
    this._app.transManager.register(HSFPConstants.RequestType.PasteContent, PasteContentRequest);

    this.isDeleteUnderlay = false;
  }

  /**
   * Inject default toolbar items
   */
  private _injectDefaultToolbar(): void {
    this._toolbarPlugin.getItem('toolBar_clear').add({
      label: ResourceManager.getString('toolBar_edit_emptyView'),
      name: 'toolBar_edit_emptyView',
      order: 100,
      hotkey: {
        win: 'shift+ctrl+delete',
        mac: 'shift+meta+backspace'
      },
      hotkeyOptions: {
        description: '工具栏-清空视图'
      },
      logGroup: HSFPConstants.LogGroupTypes.ViewOperation,
      onclick: () => {
        this._app.pluginManager.getPlugin(HSFPConstants.PluginType.SingleRoom).cancelSingleRoom?.();
        HSApp.Util.EventTrack.instance().track(HSApp.Util.EventGroupEnum.Edit, 'toolBar_edit_emptyView_event');
        this._app.userTrackLogger.push('clearView', {
          description: '工具栏-点击清空视图',
          group: HSFPConstants.LogGroupTypes.ViewOperation
        });
        this._deleteCurrentView();
      }
    });
  }

  /**
   * Show confirmation dialog and delete current view
   */
  private _deleteCurrentView(): void {
    const cancelLabel = ResourceManager.getString('toolBar_edit_cancel');
    const confirmLabel = ResourceManager.getString('toolBar_edit_emptyView');
    const title = ResourceManager.getString('toolBar_edit_clearContent');
    const message = ResourceManager.getString('toolBar_edit_clearContent_tip');

    MessageBox.create(message, [cancelLabel, confirmLabel], 1, {
      title,
      checkboxContent: ResourceManager.getString('toolBar_edit_deleteUnderlay'),
      isChecked: this.isDeleteUnderlay
    }).show((buttonIndex: number, _secondArg: unknown, isChecked: boolean) => {
      if (buttonIndex === -1) {
        this.isDeleteUnderlay = isChecked;
      } else if (buttonIndex === 0) {
        this._app.userTrackLogger.push('clearView', {
          description: '工具栏-取消清空视图操作',
          validOperation: false,
          group: HSFPConstants.LogGroupTypes.ViewOperation
        });
      } else {
        const deleteBackgroundValue = isChecked ? 'Yes' : 'No';
        HSApp.Util.EventTrack.instance().track(HSApp.Util.EventGroupEnum.DwgImport, 'dwgimport_clear_canvas_event', {
          deleteBackground: deleteBackgroundValue
        });
        this._clearView();
      }
    });
  }

  /**
   * Clear the current view
   */
  private _clearView(): void {
    const hasUnderlay = !!this._app.floorplan.scene.activeLayer.underlay;
    const shouldDeleteUnderlay = this.isDeleteUnderlay && hasUnderlay;
    const clearCommand = this._cmdMgr.createCommand(HSFPConstants.CommandType.CmdClearView, [shouldDeleteUnderlay]);
    
    this._cmdMgr.execute(clearCommand);
    this._cmdMgr.complete(clearCommand);

    const pixiContext = this._app.activeView?.pixiContext;
    if (pixiContext) {
      pixiContext.dirty = true;
    }

    this._refreshStatusBar();
    this._app.closeCabinetPage = false;

    this._app.userTrackLogger.push('clearView', {
      description: '清空视图',
      group: HSFPConstants.LogGroupTypes.WallOperation
    });
  }

  /**
   * Refresh status bar after undo/redo if underlay was updated
   */
  public undoAndRedoRefreshStatusBar = (event: TransactionEvent): void => {
    const subRequests = event.data?.request?.subRequests;
    const hasUnderlayUpdate = subRequests?.find((request) => 
      request.type === HSFPConstants.RequestType.UpdateUnderlay
    );

    if (hasUnderlayUpdate) {
      this._refreshStatusBar();
    }
  };

  /**
   * Refresh the status bar display
   */
  private _refreshStatusBar(): void {
    const app = HSApp.App.getApp();
    app.pluginManager.getPlugin(HSFPConstants.PluginType.StatusBar).show?.();
    app.pluginManager.getPlugin(HSFPConstants.PluginType.ContextualTools).refresh?.(undefined, {
      refreshStatusBar: true
    });
  }

  /**
   * Handle copy operation
   */
  private _onCopyOccurred = (): void => {
    if (this._app.activeEnvironmentId === HSFPConstants.Environment.MixPaint) {
      return;
    }

    const currentCommand = this._cmdMgr.current;
    if (currentCommand && (
      currentCommand.type === MIX_DECORATION_COMMAND_TYPE ||
      currentCommand.type === CUSTOMIZED_TILES_COMMAND_TYPE ||
      currentCommand.type === HSFPConstants.CommandType.PasteSequence
    )) {
      return;
    }

    const selections = this._selectionManager.selected();
    if (!selections || (Array.isArray(selections) && selections.length === 0)) {
      return;
    }

    const selectionArray = Array.isArray(selections) ? selections : [selections];
    const copyableSelections = selectionArray.filter((item) => isCopyable(item));

    const copyCommand = this._cmdMgr.createCommand(HSFPConstants.CommandType.Copy, [{
      selections: copyableSelections,
      floorplan: this._app.floorplan,
      userinputPlugin: this._userinputPlugin,
      catalogPlugin: this._catalogPlugin,
      app: this._app
    }]);

    this._cmdMgr.execute(copyCommand);

    if (selectionArray[0] instanceof HSCore.Model.Face2d && !selectionArray[0].isBackground?.()) {
      const copyFacesCommand = this._app.cmdManager.createCommand(
        HSFPConstants.CommandType.Sketch2d.CopyFaces,
        [selectionArray, 'hotkey']
      );
      this._app.cmdManager.execute(copyFacesCommand);
    } else if (selectionArray.every((item) => item instanceof HSCore.Model.CustomizedPMInstanceModel)) {
      const copyInstanceCommand = this._app.cmdManager.createCommand(
        HSFPConstants.CommandType.CopyCustomizedPMInstanceModel,
        [selectionArray, 'hotkey', this._userinputPlugin]
      );
      this._app.cmdManager.execute(copyInstanceCommand);
    } else {
      const editorJSON = this._userinputPlugin.getJSON('editor');
      console.assert(editorJSON, 'cannot get json from editor');

      if (editorJSON?.material) {
        const material = HSCore.Material.Material.create();
        const dumpData = material.jsonToDumpData(editorJSON.material);
        material.load(dumpData.dumps[0], dumpData.context);

        const copyMaterialCommand = this._app.cmdManager.createCommand(
          HSFPConstants.CommandType.MixPaint.CopyMaterialToFaces,
          [material, copyableSelections[0]]
        );
        this._app.cmdManager.execute(copyMaterialCommand);
      }
    }
  };

  /**
   * Handle paste operation
   */
  private _onPasteOccurred = (): void => {
    if (this._app.activeEnvironmentId === HSFPConstants.Environment.MixPaint) {
      return;
    }

    const currentCommand = this._cmdMgr.current;
    if (currentCommand && (
      currentCommand.type === HSFPConstants.CommandType.PasteSequence ||
      currentCommand.type === MIX_DECORATION_COMMAND_TYPE ||
      currentCommand.type === CUSTOMIZED_TILES_COMMAND_TYPE
    )) {
      return;
    }

    if (currentCommand && (
      currentCommand.type === HSFPConstants.CommandType.Sketch2d.CopyFaces ||
      currentCommand.type === HSFPConstants.CommandType.CopyCustomizedPMInstanceModel
    )) {
      currentCommand.receive?.('paste');
    } else {
      const pasteSequenceCommand = this._cmdMgr.createCommand(
        HSFPConstants.CommandType.PasteSequence,
        [
          this._userinputPlugin,
          this._catalogPlugin,
          this._app.floorplan,
          this._app,
          { ignoreSnapOffset: true }
        ]
      );
      this._cmdMgr.execute(pasteSequenceCommand);
    }
  };

  /**
   * Handle cut operation
   */
  private _onCutOccurred = (): void => {
    if (this._app.activeEnvironmentId === HSFPConstants.Environment.MixPaint) {
      return;
    }

    const currentCommand = this._cmdMgr.current;
    if (currentCommand && (
      currentCommand.type === MIX_DECORATION_COMMAND_TYPE ||
      currentCommand.type === CUSTOMIZED_TILES_COMMAND_TYPE ||
      currentCommand.type === HSFPConstants.CommandType.PasteSequence
    )) {
      return;
    }

    const selections = this._selectionManager.selected();
    if (!selections || (Array.isArray(selections) && selections.length === 0)) {
      return;
    }

    const selectionArray = Array.isArray(selections) ? selections : [selections];
    const cuttableSelections = selectionArray.filter((item) => isCuttable(item));

    const cutCommand = this._cmdMgr.createCommand(HSFPConstants.CommandType.Cut, [{
      selections: cuttableSelections,
      userinputPlugin: this._userinputPlugin,
      catalogPlugin: this._catalogPlugin,
      floorplan: this._app.floorplan,
      app: this._app
    }]);

    this._cmdMgr.execute(cutCommand);
  };

  /**
   * Clean up listeners
   */
  public uninit(): void {
    this._signalHook.unlistenAll();
  }
}