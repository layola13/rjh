import { HSApp } from './HSApp';
import { Handler } from './Handler';

interface PluginConfig {
  name: string;
  description: string;
  dependencies: string[];
}

interface InitOptions {
  context: unknown;
  dependencies: unknown;
}

class SizeLimitPlugin extends HSApp.Plugin.IPlugin {
  private handler: Handler;

  constructor() {
    const config: PluginConfig = {
      name: "size limit",
      description: "size limit plugin",
      dependencies: [HSFPConstants.PluginType.ContextualTools]
    };

    super(config);
    this.handler = new Handler();
  }

  onActive(context: unknown, dependencies: unknown): void {
    this.handler.init({
      context,
      dependencies
    });
  }

  onDeactive(): void {
    // Cleanup logic if needed
  }
}

HSApp.App.getApp().pluginManager.registerPlugin(
  HSFPConstants.PluginType.SizeLimitPlugin,
  SizeLimitPlugin
);