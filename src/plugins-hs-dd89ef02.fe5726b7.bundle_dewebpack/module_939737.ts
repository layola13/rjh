interface PluginConfig {
  name: string;
  description: string;
  dependencies: string[];
}

interface PluginContext {
  // Define properties based on usage context
  [key: string]: unknown;
}

interface PluginOptions {
  // Define options structure based on usage
  [key: string]: unknown;
}

class WallPropertyHandler {
  private context: PluginContext;
  private options: PluginOptions;

  constructor(context: PluginContext, options: PluginOptions) {
    this.context = context;
    this.options = options;
  }

  init(): void {
    // Handler initialization logic
  }
}

class WallPropertyPlugin extends HSApp.Plugin.IPlugin {
  private _handler?: WallPropertyHandler;

  constructor() {
    const config: PluginConfig = {
      name: "Wall Property plugin",
      description: "change wall properties",
      dependencies: [
        HSFPConstants.PluginType.ContextualTools,
        HSFPConstants.PluginType.LeftMenu,
        HSFPConstants.PluginType.RightMenu,
        HSFPConstants.PluginType.Ngmmixpaint,
        HSFPConstants.PluginType.PropertyBar
      ]
    };

    super(config);
  }

  onActive(context: PluginContext, options: PluginOptions): void {
    this._handler = new WallPropertyHandler(context, options);
    this._handler.init();
  }

  onDeactive(): void {
    // Cleanup logic when plugin is deactivated
  }
}

HSApp.Plugin.registerPlugin("hsw.plugin.wallproperty.Plugin", WallPropertyPlugin);