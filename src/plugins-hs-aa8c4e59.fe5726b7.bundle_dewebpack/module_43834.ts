interface PluginDependencies {
  [key: string]: unknown;
}

interface HandlerInitOptions {
  app: unknown;
  dependencies: PluginDependencies;
}

class BackgroundSettingHandler {
  private app?: unknown;
  private dependencies?: PluginDependencies;

  init(options: HandlerInitOptions): void {
    this.app = options.app;
    this.dependencies = options.dependencies;
  }

  toggle(value: unknown): unknown {
    return value;
  }
}

class BackgroundSettingPopupPlugin extends HSApp.Plugin.IPlugin {
  private _handler: BackgroundSettingHandler;

  constructor() {
    super({
      name: "BackgroundSettingPopup Plugin",
      description: "provide background set for canvas",
      dependencies: []
    });
    
    this._handler = new BackgroundSettingHandler();
  }

  onActive(app: unknown, dependencies: PluginDependencies): void {
    super.onActive?.(app);
    
    this._handler.init({
      app: (app as any).app,
      dependencies
    });
  }

  onDeactive(): void {
    // Cleanup logic can be added here if needed
  }

  toggle(value: unknown): unknown {
    return this._handler.toggle(value);
  }
}

HSApp.Plugin.registerPlugin(
  HSFPConstants.PluginType.BackgroundSetting,
  BackgroundSettingPopupPlugin
);