interface PluginDependencies {
  [key: string]: any;
}

interface AppContext {
  app: {
    appParams: {
      env: string;
    };
  };
}

interface InitOptions {
  dependencies: PluginDependencies;
  context: AppContext;
}

interface MaterialEntity {
  id: string;
  name: string;
  [key: string]: any;
}

class ContentPartMaterialHandler {
  private dependencies?: PluginDependencies;
  private context?: AppContext;

  init(options: InitOptions): void {
    this.dependencies = options.dependencies;
    this.context = options.context;
  }

  startStyler(entity: MaterialEntity): void {
    // Implementation for starting material styler
  }

  getPartMaterialList(entityId: string, partId: string): any[] {
    // Implementation for getting part material list
    return [];
  }

  getSelectedEntity(): MaterialEntity | null {
    // Implementation for getting selected entity
    return null;
  }

  getSelectMeshName(): string {
    // Implementation for getting selected mesh name
    return '';
  }

  getContentPartIds(): string[] {
    // Implementation for getting content part IDs
    return [];
  }
}

class ContentPartMaterialPlugin extends HSApp.Plugin.IPlugin {
  private handler: ContentPartMaterialHandler;
  private signalHook?: any;

  constructor() {
    super({
      name: 'content part material plugin',
      description: 'support content part reset material',
      dependencies: [
        HSFPConstants.PluginType.ContextualTools,
        HSFPConstants.PluginType.Toolbar,
        HSFPConstants.PluginType.LeftMenu,
        HSFPConstants.PluginType.ViewSwitch,
        HSFPConstants.PluginType.PageHeader,
        HSFPConstants.PluginType.PropertyBar,
        HSFPConstants.PluginType.ResizeWidget,
        HSFPConstants.PluginType.Catalog,
        HSFPConstants.PluginType.SingleRoom
      ]
    });

    this.handler = new ContentPartMaterialHandler();
  }

  onActive(context: AppContext, dependencies: PluginDependencies): void {
    super.onActive?.(context);

    if (context.app.appParams.env === 'ihomexmerchant') {
      this.handler.init({
        dependencies,
        context
      });
    }
  }

  startPartMaterialReplace(entity: MaterialEntity): void {
    this.handler.startStyler(entity);
  }

  getContentPartMaterial(entityId: string, partId: string): any[] {
    return this.handler.getPartMaterialList(entityId, partId);
  }

  getSelectedEntity(): MaterialEntity | null {
    return this.handler.getSelectedEntity();
  }

  getSelectedMeshName(): string {
    return this.handler.getSelectMeshName();
  }

  getContentPartIds(): string[] {
    return this.handler.getContentPartIds();
  }

  onDeactive(): void {
    this.handler = undefined as any;
  }
}

HSApp.Plugin.registerPlugin(
  HSFPConstants.PluginType.CustomizedProductPlugin,
  ContentPartMaterialPlugin
);