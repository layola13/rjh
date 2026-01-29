import { HSApp } from './HSApp';
import { Handler } from './Handler';

interface PluginMetadata {
  name: string;
  description: string;
  dependencies: string[];
}

interface PluginActivationContext {
  app: any;
}

interface PluginDependencies {
  [key: string]: any;
}

interface HandlerInitOptions {
  app: any;
  dependencies: PluginDependencies;
}

class LayoutDesignPlugin extends HSApp.Plugin.IPlugin {
  private handler: Handler;

  constructor() {
    super({
      name: "LayoutDesign Plugin",
      description: "provide layoutDesign Mode",
      dependencies: [
        HSFPConstants.PluginType.Toolbar,
        HSFPConstants.PluginType.PropertyBar
      ]
    });

    this.handler = new Handler();
  }

  onActive(context: PluginActivationContext, dependencies: PluginDependencies): void {
    super.onActive?.(context, dependencies);

    this.handler.init({
      app: context.app,
      dependencies
    });
  }
}

HSApp.Plugin.registerPlugin(
  HSFPConstants.PluginType.LayoutDesign,
  LayoutDesignPlugin
);