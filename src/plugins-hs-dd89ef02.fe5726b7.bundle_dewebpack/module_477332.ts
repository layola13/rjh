interface PluginConfig {
  name: string;
  description: string;
  dependencies: string[];
}

interface PluginContext {
  // Define based on actual usage
  [key: string]: unknown;
}

class WindowPlugin extends HSApp.Plugin.IPlugin {
  private handler: Handler | null = null;

  constructor() {
    super({
      name: "WindowPlugin",
      description: "window plugin",
      dependencies: [
        HSFPConstants.PluginType.ContextualTools,
        HSFPConstants.PluginType.PropertyBar,
        HSFPConstants.PluginType.Catalog,
        HSFPConstants.PluginType.ContentStyler,
        HSFPConstants.PluginType.Ngmmixpaint
      ]
    });
  }

  onActive(context: PluginContext, options: unknown): void {
    this.handler = new Handler();
    this.handler.init(context, options);
  }

  onDeactive(): void {
    this.handler?.uninit();
    this.handler = null;
  }
}

HSApp.Plugin.registerPlugin("hsw.plugin.Window.Plugin", WindowPlugin);