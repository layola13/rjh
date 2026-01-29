import { App } from './app';
import { SelectionManager } from './selection-manager';
import { IPlugin } from './plugin';
import { PluginType } from './constants';

interface PluginDependencies {
  [key: string]: unknown;
}

interface PluginActivationContext {
  app: App;
}

interface PluginInitOptions {
  app: App;
  dependencies: PluginDependencies;
}

interface Entity {
  id: string;
  [key: string]: unknown;
}

class ContentStylerHandler {
  private app?: App;
  private dependencies?: PluginDependencies;
  private templateEntity?: Entity;

  init(options: PluginInitOptions): void {
    this.app = options.app;
    this.dependencies = options.dependencies;
  }

  setTemplateEntity(entity: Entity): void {
    this.templateEntity = entity;
  }

  applyStyle(target: Entity): void {
    // Implementation for applying style from template entity to target
  }

  startStyler(): void {
    // Implementation for starting the styler mode
  }

  exitStyler(): void {
    // Implementation for exiting the styler mode
  }
}

class ContentStylerPlugin extends IPlugin {
  private handler: ContentStylerHandler;

  constructor() {
    super({
      name: 'Content Styler Plugin',
      description: 'quick reuse content style to others',
      dependencies: [
        PluginType.ContextualTools,
        PluginType.PropertyBar,
        PluginType.Toolbar,
        PluginType.Catalog,
        PluginType.RightMenu,
        PluginType.LeftMenu,
        'hsw.plugin.resizewidget.Plugin',
        PluginType.PageHeader,
        PluginType.ViewSwitch
      ]
    });
    this.handler = new ContentStylerHandler();
  }

  onActive(context: PluginActivationContext, dependencies: PluginDependencies): void {
    super.onActive?.(context, dependencies);
    
    this.handler.init({
      app: context.app,
      dependencies
    });
  }

  applyStyle(templateEntity: Entity, targetEntity: Entity): void {
    this.handler.setTemplateEntity(templateEntity);
    this.handler.applyStyle(targetEntity);
  }

  startStyler(entity: Entity): void {
    const app = App.getApp();
    app.selectionManager.unselect(entity);
    this.handler.setTemplateEntity(entity);
    this.handler.startStyler();
  }

  exitStyler(): void {
    this.handler.exitStyler();
  }
}

export { ContentStylerPlugin };

// Register plugin
declare const HSApp: {
  Plugin: {
    registerPlugin(type: string, plugin: typeof ContentStylerPlugin): void;
  };
  App: {
    getApp(): App;
  };
};

declare const HSFPConstants: {
  PluginType: typeof PluginType;
};

HSApp.Plugin.registerPlugin(HSFPConstants.PluginType.ContentStyler, ContentStylerPlugin);