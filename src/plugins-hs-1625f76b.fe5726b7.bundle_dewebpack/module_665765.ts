interface PluginConfig {
  name: string;
  description: string;
  dependencies: string[];
}

interface RefreshOptions {
  refreshStatusBar: boolean;
  updateHeight: boolean;
}

interface RefreshEventData {
  data?: {
    forceUpdate?: boolean;
    refreshStatusBar?: boolean;
  };
}

class ContextualToolsHandler {
  init_(app: any, plugin: any, config: any): void;
  uninit_(): void;
  show_(): void;
  hide_(param: any): void;
  getStatusBarControlById_(id: string): any;
  update_(data: any): void;
  debugGetStatusBarShowingItems_(): any;
  _refresh(target: any, options: RefreshOptions): void;
  willShowPropertyBarItemsForWeb_(): any;
  showStatusBarItemsForWeb_(): void;
  hideStatusBarItemsForWeb_(): void;
  willShowStatusBarItemsForWeb_(): any;
  disableAllHookups(): any;
  enableAllHookups(): any;
  onCustomizedModelingEnvironmentChanged(event: any): void;
}

class ContextualToolsPlugin extends HSApp.Plugin.IPlugin {
  public signalPopulateStatusBar: HSCore.Util.Signal;
  public signalPopulateCommandStatusBar: HSCore.Util.Signal;
  public signalRetiringStatusBar: HSCore.Util.Signal;
  public signalCanvasChanging: HSCore.Util.Signal;
  public signalContralPopup: HSCore.Util.Signal;
  private _handler: ContextualToolsHandler;

  constructor() {
    const config: PluginConfig = {
      name: "contextual tools plugin",
      description: "show contextual tools UI for floorplan",
      dependencies: [
        HSFPConstants.PluginType.Catalog,
        HSFPConstants.PluginType.UserInput,
        HSFPConstants.PluginType.StatusBar
      ]
    };

    super(config);

    this.signalPopulateStatusBar = new HSCore.Util.Signal(this);
    this.signalPopulateCommandStatusBar = new HSCore.Util.Signal(this);
    this.signalRetiringStatusBar = new HSCore.Util.Signal(this);
    this.signalCanvasChanging = new HSCore.Util.Signal(this);
    this.signalContralPopup = new HSCore.Util.Signal(this);
    this._handler = new ContextualToolsHandler();
  }

  public onActive(context: any, config: any): void {
    const app = context.app;
    this._handler.init_(app, this, config);
    app.signalContextualtoolRefresh.listen(this.onRefresh, this);
  }

  public onDeactive(): void {
    this._handler.uninit_();
  }

  public showStatusBar(): void {
    this._handler.show_();
  }

  public hideStatusBar(param: any): void {
    this._handler.hide_(param);
  }

  public getStatusBarControlById(id: string): any {
    return this._handler.getStatusBarControlById_(id);
  }

  public update(data: any): void {
    this._handler.update_(data);
  }

  public debugGetStatusBarShowingItems(): any {
    return this._handler.debugGetStatusBarShowingItems_();
  }

  public refresh(target: any, options: RefreshOptions): void {
    this._handler._refresh(target, options);
  }

  public onRefresh(event: RefreshEventData): void {
    const app = HSApp.App.getApp();
    const eventData = event.data;

    if (app.selectionManager.count > 0 || (eventData?.forceUpdate)) {
      const shouldRefreshStatusBar = eventData?.refreshStatusBar ?? true;
      const refreshOptions: RefreshOptions = {
        refreshStatusBar: shouldRefreshStatusBar,
        updateHeight: false
      };
      this.refresh(undefined, refreshOptions);
    }
  }

  public willShowPropertyBarItemsForWeb(): any {
    return this._handler.willShowPropertyBarItemsForWeb_();
  }

  public showStatusBarItemsForWeb(): void {
    this._handler.showStatusBarItemsForWeb_();
  }

  public hideStatusBarItemsForWeb(): void {
    this._handler.hideStatusBarItemsForWeb_();
  }

  public willShowStatusBarItemsForWeb(): any {
    return this._handler.willShowStatusBarItemsForWeb_();
  }

  public disableAllHookups(): any {
    return this._handler.disableAllHookups();
  }

  public enableAllHookups(): any {
    return this._handler.enableAllHookups();
  }

  public onCustomizedModelingEnvironmentChanged(event: any): void {
    this._handler.onCustomizedModelingEnvironmentChanged(event);
  }
}

HSApp.Plugin.registerPlugin(HSFPConstants.PluginType.ContextualTools, ContextualToolsPlugin);