import { HSCore } from './HSCore';
import { HSApp } from './HSApp';

interface Plugin {
  update(): void;
  disableItem(itemId: string): void;
  enableItem(itemId: string): void;
}

interface App {
  appSettings: AppSettings;
  environmentManager: EnvironmentManager;
}

interface AppSettings {
  layoutDesignMode: boolean;
  renderingMode: RenderingMode;
}

interface EnvironmentManager {
  signalEnvironmentActivating: unknown;
}

interface InitConfig {
  app: App;
  dependencies: {
    [HSFPConstants.PluginType.Toolbar]: Plugin;
    [HSFPConstants.PluginType.PropertyBar]: Plugin;
  };
}

interface MenuItemClickEvent {
  data: {
    subMenu?: {
      id: string;
    };
  };
}

enum RenderingMode {
  ShadingWithEdges = 'ShadingWithEdges'
}

declare const HSFPConstants: {
  PluginType: {
    Toolbar: string;
    PropertyBar: string;
  };
};

export class Handler {
  private signalHook: HSCore.Util.SignalHook<Handler>;
  private app?: App;
  private toolbarPlugin?: Plugin;
  private propertybarPlugin?: Plugin;
  private currentRenderingMode?: RenderingMode;

  constructor() {
    this.signalHook = new HSCore.Util.SignalHook(this);
  }

  init(config: InitConfig): void {
    this.app = config.app;
    this.toolbarPlugin = config.dependencies[HSFPConstants.PluginType.Toolbar];
    this.propertybarPlugin = config.dependencies[HSFPConstants.PluginType.PropertyBar];

    const catalogSignalManager = HSApp.Catalog.CatalogSignalManager.getInstance();
    
    this.signalHook
      .listen(catalogSignalManager.signalMenuItemClick, this.handleClick)
      .listen(this.app.environmentManager.signalEnvironmentActivating, this.handleEnvironmentActivating);
  }

  handleClick(event: MenuItemClickEvent): void {
    const subMenuId = event.data.subMenu?.id;
    
    if (!subMenuId || !this.app || !this.toolbarPlugin || !this.propertybarPlugin) {
      return;
    }

    const isLayoutDesignMode = subMenuId === HSApp.Catalog.DataConfig.MenuIdEnum.layoutDesign;
    
    if (this.app.appSettings.layoutDesignMode !== isLayoutDesignMode) {
      this.app.appSettings.layoutDesignMode = isLayoutDesignMode;
      this.propertybarPlugin.update();
      
      if (isLayoutDesignMode) {
        this.toolbarPlugin.disableItem('toolBar_assistant/toolBar_material_brush');
        this.currentRenderingMode = this.app.appSettings.renderingMode;
        this.app.appSettings.renderingMode = HSApp.App.RenderingMode.ShadingWithEdges;
      } else {
        this.toolbarPlugin.enableItem('toolBar_assistant/toolBar_material_brush');
        if (this.currentRenderingMode !== undefined) {
          this.app.appSettings.renderingMode = this.currentRenderingMode;
        }
      }
    }
  }

  handleEnvironmentActivating(): void {
    if (this.app?.appSettings.layoutDesignMode) {
      HSApp.Catalog.Manager.showPageByCategoryId({
        categoryId: HSApp.Catalog.DataConfig.MenuIdEnum.draw,
        menuId: HSApp.Catalog.DataConfig.MenuIdEnum.draw
      });
    }
  }
}