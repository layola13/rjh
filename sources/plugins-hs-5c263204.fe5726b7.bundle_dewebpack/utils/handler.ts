// @ts-nocheck
interface HandlerDependencies {
  [HSFPConstants.PluginType.Toolbar]: ToolbarPlugin;
  [key: string]: any;
}

interface HandlerInitParams {
  dependencies: HandlerDependencies;
  app: Application;
}

interface MirrorCommandParams {
  floorplan: Floorplan;
  direction: HSCore.Model.MirrorType;
  dependencies: HandlerDependencies;
  handler: Handler;
}

interface ToolbarItem {
  add(config: ToolbarItemConfig): void;
  enable(): void;
  disable(): void;
}

interface ToolbarItemConfig {
  name: string;
  type: string;
  label: string;
  order: number;
  icon: string;
  onclick: () => void;
}

interface ToolbarPlugin {
  getItem(name: string): ToolbarItem;
}

interface CommandManager {
  register(commandType: string, commandClass: any): void;
  createCommand(commandType: string, params: any[]): Command;
  execute(command: Command): void;
}

interface TransactionManager {
  register(requestType: string, requestClass: any): void;
}

interface Application {
  cmdManager: CommandManager;
  transManager: TransactionManager;
  floorplan: Floorplan;
  switchTo2DView(): void;
  getActive2DView(): View2D;
}

interface View2D {
  fit(): void;
}

interface Floorplan {}

interface Command {}

interface SignalHook {
  unlistenAll(): void;
}

class Handler {
  private _dependencies!: HandlerDependencies;
  private _app!: Application;
  private _cmdMgr!: CommandManager;
  private _toolbarPlugin!: ToolbarPlugin;
  private _signalHook!: SignalHook;

  /**
   * Initialize the handler with dependencies and application instance
   */
  init(params: HandlerInitParams): void {
    this._dependencies = params.dependencies;
    this._app = params.app;
    this._cmdMgr = this._app.cmdManager;
    this._toolbarPlugin = this._dependencies[HSFPConstants.PluginType.Toolbar];
    this._signalHook = new HSCore.Util.SignalHook(this);

    const commandType = HSFPConstants.CommandType;
    this._cmdMgr.register(commandType.FloorplanMirror, CmdMirror);
    this._app.transManager.register(
      HSFPConstants.RequestType.FloorplanMirror,
      MirrorRequest
    );
  }

  /**
   * Mirror the floorplan in the specified direction
   */
  private _mirrorfloorplan(
    direction: HSCore.Model.MirrorType,
    eventName: string
  ): void {
    this._app.switchTo2DView();
    HSApp.Util.EventTrack.instance().track(
      HSApp.Util.EventGroupEnum.Toolbar,
      eventName
    );

    const commandParams: MirrorCommandParams = {
      floorplan: this._app.floorplan,
      direction,
      dependencies: this._dependencies,
      handler: this,
    };

    const command = this._cmdMgr.createCommand(
      HSFPConstants.CommandType.FloorplanMirror,
      [commandParams]
    );

    this._cmdMgr.execute(command);
    this._app.getActive2DView().fit();
  }

  /**
   * Inject default toolbar items for floorplan mirroring
   */
  private _injectDefaultToolbar(): void {
    const constructionToolbar = this._toolbarPlugin.getItem("toolBar_construction");

    constructionToolbar.add({
      name: "toolBar_floorplan_mirrorHorizontal",
      type: "image",
      label: ResourceManager.getString("toolBar_floorplan_mirrorHorizontal"),
      order: 600,
      icon: "plugin/toolbar/res/ImgToolBar/fp_mirror_horizontal.svg",
      onclick: () => {
        this._mirrorfloorplan(
          HSCore.Model.MirrorType.Horizontal,
          "toolBar_floorplan_mirrorHorizontal_event"
        );
      },
    });

    constructionToolbar.add({
      name: "toolBar_floorplan_mirrorVertical",
      type: "image",
      label: ResourceManager.getString("toolBar_floorplan_mirrorVertical"),
      order: 700,
      icon: "plugin/toolbar/res/ImgToolBar/fp_mirror_vertical.svg",
      onclick: () => {
        this._mirrorfloorplan(
          HSCore.Model.MirrorType.Vertical,
          "toolBar_floorplan_mirrorVertical_event"
        );
      },
    });
  }

  /**
   * Enable or disable a toolbar item
   */
  private _enableToolbarItem(itemName: string, enabled: boolean): void {
    const toolbarItem = this._toolbarPlugin.getItem(itemName);
    if (toolbarItem) {
      enabled ? toolbarItem.enable() : toolbarItem.disable();
    }
  }

  /**
   * Handle environment change event
   */
  private _onEnvironmentChange(event: any): void {
    const toolbarItems: string[] = [
      "toolBar_assistant/toolBar_floorplan_mirrorHorizontal",
      "toolBar_assistant/toolBar_floorplan_mirrorVertical",
    ];

    toolbarItems.forEach((itemName) => {
      this._enableToolbarItem(itemName, true);
    });
  }

  /**
   * Clean up and uninitialize the handler
   */
  uninit(): void {
    this._signalHook.unlistenAll();
  }
}

export { Handler };