import { HSCore } from './HSCore';
import { UI } from './UI';
import { CreatePropertyBarNode } from './CreatePropertyBarNode';
import { getComponentByType } from './ComponentRegistry';

interface Dependencies {
  app: Application;
  [key: string]: unknown;
}

interface InitConfig {
  dependencies: Dependencies;
  app: Application;
}

interface Application {
  selectionManager: SelectionManager;
  cmdManager: CommandManager;
  transManager: TransactionManager;
  signalPropertyBarRefresh: HSCore.Util.Signal;
  signalEnvironmentActivated: HSCore.Util.Signal;
  signalPrimaryViewModeChanged: HSCore.Util.Signal;
  signalOpenNewDocument: HSCore.Util.Signal;
  signalDocumentOpened: HSCore.Util.Signal;
}

interface SelectionManager {
  signalSelectionChanged: HSCore.Util.Signal;
  selected(): Entity[];
}

interface CommandManager {
  signalCommandStarted: HSCore.Util.Signal;
  signalCommandTerminated: HSCore.Util.Signal;
}

interface TransactionManager {
  signalUndone: HSCore.Util.Signal;
  signalRedone: HSCore.Util.Signal;
}

interface Entity {
  id?: string;
  signalHostChanged?: HSCore.Util.Signal;
}

interface SelectionChangedEventData {
  data?: {
    newEntities?: Entity[];
  };
}

interface CommandEventData {
  data?: {
    cmd?: Command;
  };
}

interface Command {
  type: string;
  subs?: Command[];
}

interface PropertyBarNode {
  type: string;
  id: string;
}

interface PropertyBarConfig {
  type: string;
  id: string;
}

interface SwitchTabParams {
  data: unknown[];
  tabId: string;
}

interface RunInUIThreadOptions {
  overridable: boolean;
  delayLimits: number;
  taskId: string;
}

declare const HSFPConstants: {
  CommandType: {
    MoveCamera3D: string;
    MoveContent: string;
    PlaceProduct: string;
    PointSelect: string;
    ResizeContents: string;
    ResizeWalls: string;
    MixPaint: { MoveWaterJetTile: string };
    TileProcess: { ChangeChamfer: string };
    MoveContents: string;
    RotateContents: string;
    CreateTgWall: string;
    CreateRectTgWall: string;
    CreatePolygonTgWall: string;
    CreateFreeformNGWall: string;
    Composite: string;
  };
  PropertyBarType: {
    PropertyBar: string;
  };
};

declare function runInUIThread(
  callback: () => void,
  options: RunInUIThreadOptions
): void;

const COMMANDS_SKIP_UPDATE_ON_TERMINATE: ReadonlyArray<string> = [
  HSFPConstants.CommandType.MoveCamera3D,
  HSFPConstants.CommandType.MoveContent,
  HSFPConstants.CommandType.PlaceProduct,
  HSFPConstants.CommandType.PointSelect,
  HSFPConstants.CommandType.ResizeContents,
  HSFPConstants.CommandType.ResizeWalls,
  HSFPConstants.CommandType.MixPaint.MoveWaterJetTile,
  HSFPConstants.CommandType.TileProcess.ChangeChamfer,
  HSFPConstants.CommandType.MoveContents,
  HSFPConstants.CommandType.RotateContents
];

const COMMANDS_UPDATE_ON_START: ReadonlyArray<string> = [
  HSFPConstants.CommandType.CreateTgWall,
  HSFPConstants.CommandType.CreateRectTgWall,
  HSFPConstants.CommandType.CreatePolygonTgWall,
  HSFPConstants.CommandType.CreateFreeformNGWall
];

const UI_THREAD_DELAY_MS = 40;
const PROPERTYBAR_REFRESH_TASK_ID = 'propertybar.refresh';
const SELECT_ENTITY_HOST_CHANGE_GROUP = 'selectEntityHostChange';

export class Handler {
  public ui: UI;
  public signalPopulatePropertyBar: HSCore.Util.Signal;
  public signalSwitchPropertyBarTab: HSCore.Util.Signal;
  public signalPopulatePropertyBarTeminated: HSCore.Util.Signal;

  private _app?: Application;
  private _enableShow: boolean;
  private _cacheEntityID?: string;
  private _signalHook: HSCore.Util.SignalHook;
  private _enableAutoUpdate?: boolean;
  private _isReadonly: boolean;

  constructor() {
    this.ui = new UI(this);
    this._enableShow = true;
    this.signalPopulatePropertyBar = new HSCore.Util.Signal(this);
    this.signalPopulatePropertyBarTeminated = new HSCore.Util.Signal(this);
    this.signalSwitchPropertyBarTab = new HSCore.Util.Signal(this);
    this._signalHook = new HSCore.Util.SignalHook(this);
    this._isReadonly = false;
  }

  public init(config: InitConfig): void {
    this._app = config.app;
    this._cacheEntityID = undefined;
    this.ui.init();
    this._addSignalHooks();
  }

  private _addSignalHooks(): void {
    if (!this._app) return;

    const { selectionManager, cmdManager, transManager } = this._app;

    this._signalHook
      .listen(this._app.signalPropertyBarRefresh, this.update)
      .listen(selectionManager.signalSelectionChanged, this._onSelectionChanged)
      .listen(cmdManager.signalCommandStarted, this._onCommandStarted)
      .listen(cmdManager.signalCommandTerminated, this._onCommandTerminated)
      .listen(transManager.signalUndone, this.update)
      .listen(transManager.signalRedone, this.update)
      .listen(this._app.signalEnvironmentActivated, this.update)
      .listen(this._app.signalPrimaryViewModeChanged, this.update)
      .listen(this._app.signalOpenNewDocument, this._onOpenDocument)
      .listen(this._app.signalDocumentOpened, this._onOpenDocument);
  }

  public update = (): void => {
    if (!this._enableShow || !this._enableAutoUpdate) return;

    if (typeof runInUIThread !== 'undefined') {
      runInUIThread(
        () => {
          this._updateImmediate();
        },
        {
          overridable: true,
          delayLimits: UI_THREAD_DELAY_MS,
          taskId: PROPERTYBAR_REFRESH_TASK_ID
        }
      );
    } else {
      this._updateImmediate();
    }
  };

  public switchPropertyBarTab(tabId: string): void {
    if (!this._enableShow || !this._enableAutoUpdate) return;

    if (typeof runInUIThread !== 'undefined') {
      runInUIThread(
        () => {
          this._updateTabImmediate(tabId);
        },
        {
          overridable: true,
          delayLimits: UI_THREAD_DELAY_MS,
          taskId: PROPERTYBAR_REFRESH_TASK_ID
        }
      );
    } else {
      this._updateTabImmediate(tabId);
    }
  }

  private _updateImmediate(): void {
    if (!this._checkBeforeUpdate()) return;

    const data: unknown[] = [];
    this.signalPopulatePropertyBar.dispatch(data);
    this.ui.show(data, this._isReadonly);
  }

  private _updateTabImmediate(tabId: string): void {
    if (!this._checkBeforeUpdate()) return;

    const data: unknown[] = [];
    this.signalSwitchPropertyBarTab.dispatch({ data, tabId });
    this.ui.show(data);
  }

  private _checkBeforeUpdate(): boolean {
    return this._enableShow;
  }

  public show(): void {
    this._enableShow = true;
    this.update();
  }

  public hide(): void {
    this._enableShow = false;
    this.ui.hide();
  }

  public showProperty(config: PropertyBarConfig): void {
    this._enableShow = true;
    const propertyBarNode = CreatePropertyBarNode(config);
    this.ui.show(propertyBarNode);
  }

  public enableAutoUpdate(): void {
    this._enableAutoUpdate = true;
  }

  public disableAutoUpate(): void {
    this._enableAutoUpdate = false;
  }

  public createDefaultPropertyBarNode(): PropertyBarNode {
    if (!this._app) {
      return CreatePropertyBarNode({
        type: HSFPConstants.PropertyBarType.PropertyBar,
        id: 'propertybar'
      });
    }

    const selectedEntities = this._app.selectionManager.selected();
    let nodeId = 'propertybar';

    if (selectedEntities.length === 1 && selectedEntities[0].id) {
      nodeId += selectedEntities[0].id;
    }

    return CreatePropertyBarNode({
      type: HSFPConstants.PropertyBarType.PropertyBar,
      id: nodeId
    });
  }

  private _onSelectionChanged = (event: SelectionChangedEventData): void => {
    const newEntities = event.data?.newEntities;
    const newEntity = newEntities?.[0];

    if (newEntity && newEntity.id !== this._cacheEntityID) {
      this.update();
      this._cacheEntityID = newEntity.id;
    } else if (!newEntity) {
      this.update();
      this._cacheEntityID = undefined;
    }

    this._signalHook.unlistenGroup(SELECT_ENTITY_HOST_CHANGE_GROUP);

    if (newEntity && HSCore.Util.Content.isSlabNiche(newEntity)) {
      this._signalHook.listen(
        newEntity.signalHostChanged!,
        () => {
          this.update();
        },
        SELECT_ENTITY_HOST_CHANGE_GROUP
      );
    }
  };

  private _onCommandStarted = (event: CommandEventData): void => {
    const command = event?.data?.cmd;
    if (command && COMMANDS_UPDATE_ON_START.includes(command.type)) {
      this.update();
    }
  };

  private _onCommandTerminated = (event: CommandEventData): void => {
    const command = event?.data?.cmd;
    if (!command) return;

    const commandType = command.type;
    const shouldUpdateOnStart = COMMANDS_UPDATE_ON_START.includes(commandType);
    let shouldSkipUpdate = COMMANDS_SKIP_UPDATE_ON_TERMINATE.includes(commandType);

    if (
      !shouldSkipUpdate &&
      commandType === HSFPConstants.CommandType.Composite &&
      Array.isArray(command.subs)
    ) {
      shouldSkipUpdate = command.subs.some(subCmd =>
        COMMANDS_SKIP_UPDATE_ON_TERMINATE.includes(subCmd.type)
      );
    }

    if (!shouldSkipUpdate || shouldUpdateOnStart) {
      this.update();
    }
  };

  private _onOpenDocument = (): void => {
    this.enableAutoUpdate();
    this.update();
  };

  public getWidgetsByType(type: string): unknown {
    return getComponentByType(type);
  }

  public setPropertyBarReadonlyMode(): void {
    this._isReadonly = true;
    this.update();
  }

  public setPropertyBarEditMode(): void {
    this._isReadonly = false;
    this.update();
  }

  public foldPropertybar(): void {
    this.ui.foldPropertybar();
  }
}