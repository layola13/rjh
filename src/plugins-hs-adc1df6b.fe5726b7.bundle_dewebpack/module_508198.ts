class PerformanceManager {
  private _app: any;
  private _localStorage: any;
  private _is2dViewActivated: boolean = false;
  private _is3dViewActivated: boolean = false;
  private _watchingCmds: any[] = [];
  private _watchingCmdTypes: number[] = [
    HSFPConstants.CommandType.MoveNGWall,
    HSFPConstants.CommandType.MoveNGWallPoint
  ];
  private _statsMonitor?: StatsMonitor;
  
  public signal3dPerformanceChanged: HSCore.Util.Signal;
  public lowFpsThreshold: number = 20;
  public showPerformanceLowHint: boolean = true;
  public showPerformanceStartupHint: boolean = true;
  private static _firstCreated: boolean = true;

  constructor() {
    this.signal3dPerformanceChanged = new HSCore.Util.Signal(this);
  }

  private get _webgl2dView(): any {
    return this._app.getActive2DView();
  }

  private get _webgl3dView(): any {
    return this._app.getActive3DView();
  }

  public init(app: any, _t: any, localStorage: any): void {
    this._app = app;
    this._localStorage = localStorage;
    this._is2dViewActivated = app.is2DViewActive();
    this._is3dViewActivated = app.is3DViewActive();

    const cmdManager = this._app.cmdManager;
    this._app.signalViewActivated.listen(this.onViewActive, this);
    cmdManager.signalCommandStarted.listen(this.onCommandRunning, this);
    cmdManager.signalCommandResumed.listen(this.onCommandRunning, this);
    cmdManager.signalCommandSuspending.listen(this.onCommandStopped, this);
    cmdManager.signalCommandTerminating.listen(this.onCommandStopped, this);

    this._statsMonitor = new StatsMonitor(this._app, 30);
    this._statsMonitor.signalFpsCounted.listen(this._onFpsCounted, this);
  }

  public onViewActive(_event: any): void {
    this._is2dViewActivated = this._app.is2DViewActive();
    this._is3dViewActivated = this._app.is3DViewActive();
  }

  public onCommandRunning(event: any): void {
    this._freezeView(event, true);
  }

  public onCommandStopped(event: any): void {
    this._freezeView(event, false);
  }

  private _freezeView(event: any, freeze: boolean = true): void {
    if (this._is2dViewActivated && this._webgl3dView) {
      if (!this._isWatchingCommand(event.data.cmd)) return;
      freeze ? this._webgl3dView.freeze() : this._webgl3dView.unfreeze();
    } else if (this._is3dViewActivated && this._webgl2dView) {
      if (!this._isWatchingCommand(event.data.cmd)) return;
      freeze ? this._webgl2dView.freeze() : this._webgl2dView.unfreeze();
    }
  }

  private _isWatchingCommand(cmd: any): boolean {
    let isWatching = false;

    this._watchingCmds.forEach((watchedCmd) => {
      if (!isWatching && cmd instanceof watchedCmd) {
        isWatching = true;
      }
    });

    this._watchingCmdTypes.forEach((cmdType) => {
      if (cmdType === cmd.type) {
        isWatching = true;
      }
    });

    if (
      (cmd.type === HSFPConstants.CommandType.MoveContent &&
        cmd.content &&
        cmd.content.instanceOf(HSConstants.ModelClass.NgCornerWindow)) ||
      (cmd.type === HSFPConstants.CommandType.PlaceProduct &&
        cmd.output &&
        cmd.output.instanceOf(HSConstants.ModelClass.NgCornerWindow)) ||
      (cmd.type === HSFPConstants.CommandType.ResizeContent &&
        cmd.output &&
        cmd.output.instanceOf(HSConstants.ModelClass.NgOpening)) ||
      (cmd.type === HSFPConstants.CommandType.ResizeContents &&
        cmd.output &&
        cmd.output.some((item: any) =>
          item.instanceOf(HSConstants.ModelClass.NgOpening)
        ))
    ) {
      isWatching = true;
    }

    return isWatching;
  }

  private _isWatchingCommandType(cmdType: number): boolean {
    return this._watchingCmdTypes.some((type) => type === cmdType);
  }

  private _onPopulateStatusBar(event: any): void {
    if (this._app.activeEnvironmentId !== HSFPConstants.Environment.FaceMaterial) {
      const rightItems = event.data.rightItems;
      this._initStatusBarItems().forEach((item) => rightItems.push(item));
    }
  }

  private _initStatusBarItems(): any[] {
    const items: any[] = [];

    if (this._app.is3DViewActive() && HSApp.Config.RENDER_SPEED_SWITCH_ENABLED) {
      const performanceWidget = {
        id: "performance3dWidget",
        type: StatusBarItemTypeEnum.Performance3dWidget,
        order: 1000,
        data: {
          level: HSApp.App.getApp().appSettings.renderSpeedLevel,
          onLevelSelected: (level: number) => {
            appSettingsUtil.renderSpeedLevel = level;
            appSettingsUtil.save();
          },
          onNoMoreShowStartupHint: () => {
            this.showPerformanceStartupHint = false;
            this._setShowStartupPerformanceHint(false);
          },
          onSessionlyNomoreShowStartupHint: () => {
            this.showPerformanceStartupHint = false;
          },
          onNoMoreShowFpsLowHint: () => {
            this.showPerformanceLowHint = false;
            this._setShowPerformanceLowHint(false);
            this._statsMonitor?.stop();
          },
          signal3dPerformanceChanged: this.signal3dPerformanceChanged
        }
      };

      items.push(performanceWidget);

      if (PerformanceManager._firstCreated) {
        this.showPerformanceStartupHint = this._showStartupPerformanceHint();
        this.showPerformanceLowHint = this._showPerformanceLowHint();
      }

      if (this.showPerformanceStartupHint) {
        setTimeout(() => {
          this.signal3dPerformanceChanged.dispatch({
            status: "low",
            startup: "true"
          });
        }, 100);
      }

      if (PerformanceManager._firstCreated && this.showPerformanceLowHint) {
        setTimeout(() => {
          this._statsMonitor?.start();
        }, 100);
      }

      PerformanceManager._firstCreated = false;
    }

    return items;
  }

  private _showStartupPerformanceHint(): boolean {
    return this._showPerformanceHintImpl("startup_performance_hint");
  }

  private _setShowStartupPerformanceHint(show: boolean): void {
    this._localStorage.set("startup_performance_hint", show);
  }

  private _showPerformanceLowHint(): boolean {
    return this._showPerformanceHintImpl("low_performance_hint");
  }

  private _setShowPerformanceLowHint(show: boolean): void {
    this._localStorage.set("low_performance_hint", show);
  }

  private _showPerformanceHintImpl(key: string): boolean {
    const value = this._localStorage.get(key);
    return value !== false && value !== "false";
  }

  private _onFpsCounted(event: any): void {
    if (!this.showPerformanceLowHint) return;

    const fpsArray: number[] = event.data.fpsArray;
    if (fpsArray.length <= 0) return;

    let lowFpsCount = 0;
    for (let i = 0, len = fpsArray.length; i < len; i++) {
      if (fpsArray[i] < this.lowFpsThreshold) {
        lowFpsCount++;
      }
    }

    const lowFpsRatio = lowFpsCount / fpsArray.length;
    if (lowFpsRatio > 0.5) {
      this.signal3dPerformanceChanged.dispatch({
        status: "low"
      });
    }
  }
}

export default PerformanceManager;