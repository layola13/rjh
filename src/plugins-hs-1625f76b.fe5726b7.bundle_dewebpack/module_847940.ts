interface PluginConfig {
  name: string;
  description: string;
  dependencies: string[];
}

interface HandlerInitOptions {
  app: unknown;
  dependencies: unknown;
  context: PluginContext;
  signalContentMeshSelected: HSCore.Util.Signal<unknown>;
}

interface PluginContext {
  app: unknown;
}

class ResetMaterialHandler {
  init(options: HandlerInitOptions): void {
    // Implementation would be here
  }

  dispose(): void {
    // Implementation would be here
  }

  setSelectedEntity(entity: unknown): void {
    // Implementation would be here
  }

  startStyler(): void {
    // Implementation would be here
  }

  exitStyler(): void {
    // Implementation would be here
  }
}

class ContentMaterialReplacePlugin extends HSApp.Plugin.IPlugin {
  handler: ResetMaterialHandler;
  signalContentMeshSelected: HSCore.Util.Signal<unknown>;

  constructor() {
    const config: PluginConfig = {
      name: "reset material plugin",
      description: "support reset material",
      dependencies: [
        HSFPConstants.PluginType.ContextualTools,
        HSFPConstants.PluginType.Toolbar,
        HSFPConstants.PluginType.Catalog,
        HSFPConstants.PluginType.RightMenu,
        HSFPConstants.PluginType.LeftMenu,
        "hsw.plugin.viewswitch.Plugin",
        "hsw.plugin.resizewidget.Plugin",
        HSFPConstants.PluginType.PageHeader,
        HSFPConstants.PluginType.PropertyBar
      ]
    };

    super(config);

    this.handler = new ResetMaterialHandler();
    this.signalContentMeshSelected = new HSCore.Util.Signal(this);
  }

  onActive(context: PluginContext, dependencies: unknown): void {
    super.onActive?.(context);

    this.handler.init({
      app: context.app,
      dependencies,
      context,
      signalContentMeshSelected: this.signalContentMeshSelected
    });
  }

  onDeactive(context: PluginContext): void {
    super.onDeactive?.(context);
    this.handler.dispose();
  }

  startStyler(entity: unknown): void {
    this.handler.setSelectedEntity(entity);
    this.handler.startStyler();
  }

  exitStyler(): void {
    this.handler.exitStyler();
  }
}

HSApp.Plugin.registerPlugin(
  HSFPConstants.PluginType.ContentMaterialReplace,
  ContentMaterialReplacePlugin
);