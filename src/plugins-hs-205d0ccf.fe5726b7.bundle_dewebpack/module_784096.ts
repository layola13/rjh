import { HSApp } from './HSApp';
import { Handler } from './Handler';

interface PluginConfig {
  name: string;
  description: string;
  dependencies: string[];
}

interface PluginContext {
  [key: string]: unknown;
}

interface PluginDependencies {
  [key: string]: unknown;
}

interface HandlerInitOptions {
  context: PluginContext;
  dependencies: PluginDependencies;
}

class Sketch2dPlugin extends HSApp.Plugin.IPlugin {
  private handler: Handler;

  constructor() {
    const config: PluginConfig = {
      name: "sketch2d plugin",
      description: "sketch2d",
      dependencies: [
        HSFPConstants.PluginType.PropertyBar,
        HSFPConstants.PluginType.LeftMenu
      ]
    };

    super(config);
    this.handler = new Handler();
  }

  onActive(context: PluginContext, dependencies: PluginDependencies): void {
    super.onActive(context, {});
    
    this.handler.init({
      context,
      dependencies
    });
  }
}

HSApp.Plugin.registerPlugin(
  HSFPConstants.PluginType.Sketch2d,
  Sketch2dPlugin,
  undefined
);