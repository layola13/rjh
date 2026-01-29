import { HSCore } from './HSCore';
import { HSApp } from './HSApp';
import { UIConfig } from './UIConfig';

interface PluginMap {
  [HSFPConstants.PluginType.Toolbar]: ToolbarPlugin;
  [HSFPConstants.PluginType.Catalog]: CatalogPlugin;
  [HSFPConstants.PluginType.PageHeader]: PageHeaderPlugin;
  [HSFPConstants.PluginType.ResizeWidget]: ResizeWidget;
  [HSFPConstants.PluginType.PropertyBar]: PropertyBar;
  'hsw.brand.ezhome.firstlogin.Plugin': FirstLoginPlugin;
}

interface ToolbarPlugin {
  removeItem(itemId: string, group: string): void;
}

interface CatalogPlugin {
  showCatalog(visible: boolean): void;
}

interface PageHeaderPlugin {
  removeItemById(itemId: string): void;
}

interface ResizeWidget {
  foldResizeWidget(): void;
}

interface PropertyBar {
  foldPropertybar(): void;
}

interface FirstLoginPlugin {
  signalCheckPermissionsCompleted: unknown;
}

interface CheckPermissionsData {
  data: {
    hasChecked: boolean;
  };
}

interface LayoutModeConfig {
  plugin?: {
    exclude: string[];
  };
  toolbar?: {
    item?: {
      exclude?: string[];
    };
  };
  pageheader?: {
    item: {
      exclude: string[];
    };
  };
  autoSave?: {
    time: number;
  };
  resizeWidget?: {
    isFold: boolean;
  };
  propertyBar?: {
    isFold: boolean;
  };
}

declare const adskUser: {
  apartmentCustomizedUI: boolean;
  kanfangCustomizedUI: boolean;
  storeSmartLayout: boolean;
};

declare const HSFPConstants: {
  PluginType: {
    Toolbar: string;
    Catalog: string;
    PageHeader: string;
    ResizeWidget: string;
    PropertyBar: string;
  };
};

export class Handler {
  public signalHook: HSCore.Util.SignalHook<this>;
  public toolbarPlugin?: ToolbarPlugin;
  public catalogPlugin?: CatalogPlugin;
  public pageHeaderPlugin?: PageHeaderPlugin;
  public app?: HSApp.App;
  public layoutModeMgr?: HSApp.LayoutMode.LayoutModeManager;
  public resizeWidget?: ResizeWidget;
  public propertyBar?: PropertyBar;

  constructor() {
    this.signalHook = new HSCore.Util.SignalHook(this);
  }

  public init(plugins: PluginMap): void {
    this.toolbarPlugin = plugins[HSFPConstants.PluginType.Toolbar];
    this.catalogPlugin = plugins[HSFPConstants.PluginType.Catalog];
    this.pageHeaderPlugin = plugins[HSFPConstants.PluginType.PageHeader];
    this.resizeWidget = plugins[HSFPConstants.PluginType.ResizeWidget];
    this.propertyBar = plugins[HSFPConstants.PluginType.PropertyBar];

    const firstLoginPlugin = plugins['hsw.brand.ezhome.firstlogin.Plugin'];

    this.app = HSApp.App.getApp();
    this.layoutModeMgr = HSApp.LayoutMode.LayoutModeManager.getInstance();

    this.signalHook.listen(
      firstLoginPlugin.signalCheckPermissionsCompleted,
      (eventData: CheckPermissionsData) => {
        this.handleLayoutModeChanged(eventData);
      }
    );
  }

  public handleLayoutModeChanged(eventData: CheckPermissionsData): void {
    if (!eventData.data.hasChecked) {
      return;
    }

    switch (true) {
      case adskUser.apartmentCustomizedUI:
        this.layoutModeMgr!.mode = 'tianmaohaofang';
        if (HSApp.Config.TENANT === 'fp') {
          this.layoutModeMgr!.mode = 'houseme';
        }
        break;
      case adskUser.kanfangCustomizedUI:
        this.layoutModeMgr!.mode = 'kanfang';
        break;
      case adskUser.storeSmartLayout:
        this.layoutModeMgr!.mode = 'apple';
        break;
    }

    const config = UIConfig[this.layoutModeMgr!.mode];
    if (config) {
      this.layoutModeMgr!.config = config;
      this.handleAutoSave();
      this.handlePluginChanged();
      this.handleToolbarChanged();
      this.handlePageHeaderChanged();
      this.catalogPlugin?.showCatalog(true);
      this.handleResizeWidget();
      this.handlePropertyBar();
    }
  }

  public handlePluginChanged(): void {
    const pluginConfig = this.layoutModeMgr?.config?.[HSApp.LayoutMode.ConfigKey.plugin];
    if (!pluginConfig) {
      return;
    }

    const excludeList = pluginConfig.exclude;
    if (excludeList?.length) {
      excludeList.forEach((pluginId: string) => {
        return HSApp.App.getApp().pluginManager.unload(pluginId);
      });
    }
  }

  public handleToolbarChanged(): void {
    const toolbarConfig = this.layoutModeMgr?.config?.[HSApp.LayoutMode.ConfigKey.toolbar];
    if (!toolbarConfig) {
      return;
    }

    const itemConfig = toolbarConfig.item;
    const excludeList = itemConfig?.exclude;
    if (itemConfig != null && excludeList != null && excludeList.length) {
      excludeList.forEach((itemId: string) => {
        this.toolbarPlugin?.removeItem(itemId, 'default');
      });
    }
  }

  public handlePageHeaderChanged(): void {
    const pageHeaderConfig = this.layoutModeMgr?.config?.pageheader;
    if (!pageHeaderConfig) {
      return;
    }

    const itemConfig = pageHeaderConfig.item;
    if (itemConfig.exclude.length) {
      itemConfig.exclude.forEach((itemId: string) => {
        this.pageHeaderPlugin?.removeItemById(itemId);
      });
    }
  }

  public handleAutoSave(): void {
    const autoSaveConfig = this.layoutModeMgr?.config?.autoSave;
    if (!autoSaveConfig) {
      return;
    }

    const autoSaveTimeMs = autoSaveConfig.time;
    const autoSaveTimeMinutes = autoSaveTimeMs / 60;

    this.app?.appSettings.signalValueChanged.dispatch({
      fieldName: 'autoSaveInterval',
      value: autoSaveTimeMinutes
    });
  }

  public handleResizeWidget(): void {
    const resizeWidgetConfig = this.layoutModeMgr?.config?.resizeWidget;
    if (resizeWidgetConfig?.isFold) {
      this.resizeWidget?.foldResizeWidget();
    }
  }

  public handlePropertyBar(): void {
    const propertyBarConfig = this.layoutModeMgr?.config?.propertyBar;
    if (propertyBarConfig?.isFold) {
      this.propertyBar?.foldPropertybar();
    }
  }
}