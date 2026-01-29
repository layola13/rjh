interface MoldingBrushPluginDependencies {
  [key: string]: any;
}

interface MoldingBrushPluginInitOptions {
  dependencies: MoldingBrushPluginDependencies;
  app: any;
}

interface CommandEvent {
  data: {
    cmd: any;
  };
}

interface SuckedMoldingChangedEvent {
  data: any;
}

interface MoldingBrushStrategy {
  // Define strategy interface properties as needed
}

export default class MoldingBrushPlugin {
  private _suckedMoldingData: any;
  private _dependencies!: MoldingBrushPluginDependencies;
  private _app!: any;
  private _cmdMgr!: any;
  private _transMgr!: any;
  private _toolbarPlugin!: any;
  private _contextualToolsPlugin!: any;
  private _leftMenuPlugin!: any;
  private _signalHook!: any;
  private _strategies: MoldingBrushStrategy[] = [];

  /**
   * Initialize the molding brush plugin
   */
  init(options: MoldingBrushPluginInitOptions): void {
    this._suckedMoldingData = undefined;
    this._dependencies = options.dependencies;
    this._app = options.app;
    this._cmdMgr = this._app.cmdManager;
    this._transMgr = this._app.transManager;
    this._toolbarPlugin = this._dependencies[HSFPConstants.PluginType.Toolbar];
    this._contextualToolsPlugin = this._dependencies[HSFPConstants.PluginType.ContextualTools];
    this._leftMenuPlugin = this._dependencies[HSFPConstants.PluginType.LeftMenu];
    this._signalHook = new HSCore.Util.SignalHook(this);

    this._cmdMgr.register(HSFPConstants.CommandType.MoldingBrush, i.default);
    this._app.transManager.register(HSFPConstants.RequestType.MoldingBrush, s.default);

    this._signalHook
      .listen(this._cmdMgr.signalCommandStarted, this._onCmdStart)
      .listen(this._cmdMgr.signalCommandTerminating, this._onCmdEnd)
      .listen(this._transMgr.signalUndoing, this._cancelMoldingBrushCmd)
      .listen(this._transMgr.signalRedoing, this._cancelMoldingBrushCmd)
      .listen(this._contextualToolsPlugin.signalPopulateCommandStatusBar, this._onPopulateStatusBarByCmd);

    this._strategies = [];
  }

  /**
   * Uninitialize the plugin and clean up listeners
   */
  uninit(): void {
    this._signalHook.unlistenAll();
  }

  /**
   * Enter molding brush mode
   */
  enterMoldingBrush(): void {
    if (this._cmdMgr.current instanceof i.default) {
      this._cmdMgr.complete();
    } else {
      const conflictingCommands = [
        HSFPConstants.CommandType.AddCatalogMolding,
        HSFPConstants.CommandType.AddCustomizedLightSlot,
        "hsw.cmd.customizemodel.CmdChangeMoldingTexture",
        "hsw.cmd.customizemodel.CmdChangeSmartMoldingTexture",
        "hsw.cmd.customizemodel.CmdChangeMoldingType",
        "hsw.cmd.customizemodel.CmdChangeSmartMoldingType",
        HSFPConstants.CommandType.CmdCopyMolding,
        HSFPConstants.CommandType.CmdDuplicateCustomizedLightSlot
      ];

      if (this._cmdMgr.current && conflictingCommands.includes(this._cmdMgr.current.type)) {
        this._cmdMgr.cancel();
      }

      this._app.switchTo3DView();
      this._leftMenuPlugin.hideLeftMenu();

      const eventTracker = HSApp.Util.EventTrack.instance();
      const activeEnvironmentId = this._app.activeEnvironmentId;
      eventTracker.track(HSApp.Util.EventGroupEnum.Toolbar, "customizedmodel_molding_brush_event", {
        IF_env: activeEnvironmentId
      });

      const command = this._cmdMgr.createCommand(HSFPConstants.CommandType.MoldingBrush, [this._dependencies, this]);
      this._cmdMgr.execute(command);
    }
  }

  private _onCmdStart(event: CommandEvent): void {
    const command = event.data.cmd;
    if (command instanceof i.default) {
      this._signalHook.listen(command.signalSuckedMoldingChanged, this._onSuckedMoldingChanged);
    }
  }

  private _onCmdEnd(event: CommandEvent): void {
    const command = event.data.cmd;
    if (command instanceof i.default) {
      this._signalHook.unlisten(command.signalSuckedMoldingChanged, this._onSuckedMoldingChanged);
    }
  }

  private _onSuckedMoldingChanged(event: SuckedMoldingChangedEvent): void {
    if (this._contextualToolsPlugin && this._cmdMgr.current instanceof i.default) {
      const propertyBarItems = this._initPropertyBarMoldingItems(event.data);
      this._contextualToolsPlugin.update(propertyBarItems);
      this._contextualToolsPlugin.refresh();
    }
  }

  private _initPropertyBarMoldingItems(data: any): any[] {
    return [];
  }

  private _cancelMoldingBrushCmd(): void {
    if (this._cmdMgr.current instanceof i.default) {
      this._cmdMgr.cancel();
    }
  }

  private _onPopulateStatusBarByCmd(): void {
    // Implementation for populating status bar
  }

  setSuckedMoldingData(data: any): void {
    this._suckedMoldingData = data;
  }

  getSuckedMoldingData(): any {
    return this._suckedMoldingData;
  }

  clearSuckedMoldingData(): void {
    this._suckedMoldingData = undefined;
  }

  registerStrategy(strategy: MoldingBrushStrategy): void {
    this._strategies.push(strategy);
  }

  unregisterStrategy(strategy: MoldingBrushStrategy): void {
    const index = this._strategies.indexOf(strategy);
    if (index !== -1) {
      this._strategies.splice(index, 1);
    }
  }

  getStrategies(): MoldingBrushStrategy[] {
    return this._strategies;
  }
}