interface PluginDependency {
  name: string;
  instance: unknown;
}

interface PluginConfig {
  name: string;
  description: string;
  dependencies: string[];
}

interface PluginActivationContext {
  app: HSApp.Application;
}

interface HandlerInitOptions {
  app: HSApp.Application;
  dependencies: PluginDependency[];
}

interface IPlugin {
  onActive(context: PluginActivationContext, dependencies: PluginDependency[]): void;
  onDeactive(): void;
}

class MyGroupHandler {
  init(options: HandlerInitOptions): void {
    // Implementation
  }

  uninit(): void {
    // Implementation
  }

  showEditGroupPanel(groupId: string, options: unknown): void {
    // Implementation
  }

  showSaveGroupPanel(groupId: string, data: unknown, callback: unknown): unknown {
    // Implementation
    return undefined;
  }

  showProductRename(productId: string): void {
    // Implementation
  }

  uploadGroup(groupData: unknown): void {
    // Implementation
  }
}

class MyGroupService {
  addToMyGroup(groupData: unknown): void {
    // Implementation
  }
}

/**
 * MyGroup Plugin
 * Provides functions to save and reuse customized groups
 */
class MyGroupPlugin extends HSApp.Plugin.IPlugin {
  private _handler: MyGroupHandler;

  constructor() {
    super({
      name: "mygroup Plugin",
      description: "provide functions to save/reuse customized group",
      dependencies: [
        HSFPConstants.PluginType.ContextualTools,
        HSFPConstants.PluginType.Catalog,
        HSFPConstants.PluginType.PropertyBar
      ]
    });

    this._handler = new MyGroupHandler();
  }

  onActive(context: PluginActivationContext, dependencies: PluginDependency[]): void {
    super.onActive?.(context, dependencies);

    this._handler.init({
      app: context.app,
      dependencies
    });
  }

  showEditGroupPanel(groupId: string, options: unknown): void {
    this._handler.showEditGroupPanel(groupId, options);
  }

  showSaveGroupPanel(groupId: string, data: unknown, callback: unknown): unknown {
    return this._handler.showSaveGroupPanel(groupId, data, callback);
  }

  showProductRename(productId: string): void {
    this._handler.showProductRename(productId);
  }

  uploadGroup(groupData: unknown): void {
    this._handler.uploadGroup(groupData);
  }

  onDeactive(): void {
    this._handler.uninit();
  }

  addToMyGroup(groupData: unknown): void {
    new MyGroupService().addToMyGroup(groupData);
  }
}

HSApp.Plugin.registerPlugin("hsw.plugin.mygroup.Plugin", MyGroupPlugin);