import { Handler } from './Handler';

interface PluginConfig {
  dependencies: unknown[];
}

interface PluginActivationEvent {
  app: unknown;
}

class StoreSmartLayoutPlugin extends HSApp.Plugin.IPlugin {
  private _handler?: Handler;

  constructor() {
    const config: PluginConfig = {
      dependencies: []
    };
    super(config);
  }

  onActive(event: PluginActivationEvent): void {
    const { app } = event;
    this._handler = new Handler(app);
    this._handler.init();
  }

  onDeactive(): void {
    // Cleanup logic can be added here if needed
  }

  getHandler(): Handler | undefined {
    return this._handler;
  }
}

HSApp.Plugin.registerPlugin(
  HSFPConstants.PluginType.StoreSmartLayout,
  StoreSmartLayoutPlugin
);