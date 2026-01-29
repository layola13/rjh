import { HSCore } from './core-types';
import { HSApp } from './app-types';

interface Plugin {
  signalRetiringStatusBar: unknown;
  signalPopulatePropertyBar: unknown;
}

interface App {
  cmdManager: CommandManager;
  transManager: TransactionManager;
  keyboardManager: KeyboardManager;
  selectionManager: SelectionManager;
  signalContextualtoolRefresh: Signal;
  getMain2DView(): View;
  getAux2DView(): View;
  getMain3DView(): View3D;
  getActive3DView(): View3D;
}

interface CommandManager {
  current?: Command;
  register(commands: Array<[string, any]>): void;
}

interface TransactionManager {
  register(requests: Array<[string, any]>): void;
}

interface KeyboardManager {
  signalKeyDown: unknown;
}

interface SelectionManager {
  signalSelectionChanged: unknown;
  selected(): Entity[];
}

interface Signal {
  dispatch(): void;
}

interface View {
  registerGizmoFactory(factory: GizmoFactory): void;
  unregisterGizmoFactory(factory: GizmoFactory): void;
}

interface View3D extends View {
  gizmoManager: GizmoManager;
}

interface GizmoManager {
  getSelectionType(): number;
  setSelectionType(type: number): void;
}

interface Command {
  type: string;
}

interface Entity {
  // Base entity interface
}

interface EventData {
  data: {
    newEntities?: Entity[];
    flag?: string;
    notRefresh?: boolean;
  };
}

interface GizmoFactory {
  // Gizmo factory interface
}

export default class ContentManipulationPlugin {
  private _propertyBarV2Handler: PropertyBarV2Handler;
  private _app!: App;
  private _contextualToolsPlugin!: Plugin;
  private _cmdMgr!: CommandManager;
  private _signalHook!: HSCore.Util.SignalHook;
  private _contentSignalHook!: HSCore.Util.SignalHook;
  private _entities?: Entity[];
  public sizecardIsHidden: boolean;

  constructor() {
    this._propertyBarV2Handler = new PropertyBarV2Handler();
    this.sizecardIsHidden = true;
  }

  init_(app: { app: App }, plugins: Record<string, Plugin>): void {
    this._app = app.app;

    const contextualToolsPlugin = plugins[HSFPConstants.PluginType.ContextualTools];
    this._contextualToolsPlugin = contextualToolsPlugin;

    const propertyBarPlugin = plugins[HSFPConstants.PluginType.PropertyBar];
    const commandManager = this._app.cmdManager;
    this._cmdMgr = commandManager;

    this._initDomRoot();
    this._registerCommands(commandManager);
    this._registerRequests(this._app.transManager);
    this._registerGizmo(this._app.getMain2DView());
    this._registerGizmo(this._app.getAux2DView());
    this.sizecardIsHidden = true;

    const signalHook = new HSCore.Util.SignalHook(this);
    this._signalHook = signalHook;
    signalHook
      .listen(contextualToolsPlugin.signalRetiringStatusBar, this._onRetiringStatusBar)
      .listen(propertyBarPlugin.signalPopulatePropertyBar, this._onPopulatePropertyBar)
      .listen(this._app.keyboardManager.signalKeyDown, this._onKeyDown)
      .listen(this._app.selectionManager.signalSelectionChanged, (event: EventData) =>
        this.resetSelectionType(event.data.newEntities)
      );

    this._contentSignalHook = new HSCore.Util.SignalHook(this);
  }

  resetSelectionType(entities?: Entity[]): void {
    if (!entities?.[0]) {
      return;
    }

    const gizmoManager = this._app.getMain3DView().gizmoManager;
    const selectionType = gizmoManager.getSelectionType();
    const { Reset, Scale } = HSApp.View.GizmoSelectionType;
    let newSelectionType = selectionType;

    const currentCommand = this._app.cmdManager.current;
    if (currentCommand?.type === HSFPConstants.CommandType.CreateWallFaceAssembly) {
      return;
    }

    const firstEntity = entities[0];
    if (firstEntity instanceof HSCore.Model.Entity) {
      const wallFaceDecorator = new HSCore.Model.WallFaceAssemblyDecorator();
      const hasWallFaceParent = wallFaceDecorator.getWallFaceAssemblyParent(firstEntity);
      if (hasWallFaceParent || firstEntity instanceof HSCore.Model.WallFaceAssembly) {
        return;
      }
    }

    if (HSApp.Util.Entity.includeCustomization(firstEntity)) {
      newSelectionType &= ~Reset;
    } else {
      newSelectionType |= Reset;
    }

    if (firstEntity instanceof HSCore.Model.NCPBackgroundWallUnit) {
      newSelectionType = Scale;
    }

    this._app.getActive3DView().gizmoManager.setSelectionType(newSelectionType);
  }

  private _onPopulateEnvironmentBar(event: EventData): void {
    const selectedEntities = this._app.selectionManager.selected();
    if (selectedEntities.length === 0) {
      return;
    }

    if (HSApp.Util.Entity.isTypeOf(HSCore.Model.Content, selectedEntities)) {
      this._entities = selectedEntities.slice(0);
    }
  }

  private _onPopulatePropertyBar(event: EventData): void {
    this._propertyBarV2Handler.onPopulatePropertyBar(event);
  }

  hidesizecard_(): void {
    this.sizecardIsHidden = true;
  }

  showsizecard_(): void {
    this.sizecardIsHidden = false;
  }

  private _buildRightProperCard(items: unknown[]): Array<{ id: string; label: string; items: unknown[] }> {
    return [
      {
        id: 'sizecard',
        label: '',
        items
      }
    ];
  }

  private _buildEnterCabinet(label: string): { id: string; label: string; items: Array<{ type: string; data: { label: string } }> } {
    return {
      id: 'cabinetapp',
      label: '',
      items: [
        {
          type: 'cabinetapp',
          data: { label }
        }
      ]
    };
  }

  private _onContentFlagChanged(event: EventData): void {
    const eventData = event.data;
    if (eventData?.flag === HSCore.Model.EntityFlagEnum.selected || eventData.notRefresh) {
      return;
    }
    this._app.signalContextualtoolRefresh.dispatch();
  }

  private _initDomRoot(): void {
    const pluginContainer = document.querySelector('#plugin-container');
    if (!pluginContainer) {
      return;
    }

    const container = document.createElement('div');
    container.className = 'contentmanipulation';
    pluginContainer.appendChild(container);
  }

  private _registerCommands(commandManager: CommandManager): void {
    const commandType = HSFPConstants.CommandType;
    commandManager.register([
      [commandType.NudgeContent, NudgeContentCommand],
      [commandType.ResizeContent, ResizeContentCommand],
      [commandType.ResizeContents, ResizeContentsCommand],
      [commandType.Resize3DContent, Resize3DContentCommand],
      [commandType.ChangeNCPBackgroundWallBase, HSFPConstants.CommandType.OpenIndependentPanel, ChangeNCPBackgroundWallBaseAdapter],
      [commandType.ChangeParametricContentBase, HSFPConstants.CommandType.OpenIndependentPanel, ChangeParametricContentBaseAdapter]
    ]);
  }

  private _registerRequests(transactionManager: TransactionManager): void {
    const requestType = HSFPConstants.RequestType;
    transactionManager.register([
      [requestType.MoveContent, MoveContentRequest],
      [requestType.RenameContent, RenameContentRequest],
      [requestType.ResizeContent, ResizeContentRequest],
      [requestType.ResizeOpeningProfile, ResizeOpeningProfileRequest],
      [requestType.ChangeComponentMaterial, ChangeComponentMaterialRequest]
    ]);
  }

  private _registerGizmo(view: View | null): GizmoFactory | null {
    if (!view) {
      return null;
    }

    const gizmoFactory = new ContentGizmoFactory(view, this._app);
    view.registerGizmoFactory(gizmoFactory);
    return gizmoFactory;
  }

  private _unregisterGizmo(view: View | null, factory: GizmoFactory): void {
    view?.unregisterGizmoFactory(factory);
  }

  getPropertyBarV2Handlers(): PropertyBarV2Handler {
    return this._propertyBarV2Handler;
  }

  private _onRetiringStatusBar?: () => void;
  private _onKeyDown?: () => void;
}