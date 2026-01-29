import { HSApp } from './HSApp';
import { HSCatalog } from './HSCatalog';
import { AIResultPage } from './AIResultPage';

declare const ResourceManager: {
  getString(key: string): string;
};

declare const adskUser: {
  isEnterprise: boolean;
  hideTeamModelLibrary: boolean;
};

declare const React: {
  createElement(component: any, props: any): any;
};

interface MenuParams {
  treeId: string;
}

interface FilterConfig {
  exclude?: string;
}

interface CategoryTreeFilter {
  include?: string;
  exclude?: string;
}

interface SearchFilter {
  filterType: string;
  excludeCategoryIdList?: string[];
}

interface MyFilterConfig {
  categoryTreeFilter?: CategoryTreeFilter;
  modelSearchFilter?: SearchFilter;
  merchantSearchFilter?: SearchFilter;
}

interface MenuFilters {
  sceneType?: string;
  exclude?: string;
}

interface MenuDataItem {
  icon?: string;
  text: string;
  data: Array<{ id: string; name?: string }>;
  id: string;
  params?: MenuParams;
  filters?: MenuFilters | MyFilterConfig;
  isSelected?: boolean;
  disableCategoryPanel?: boolean;
  disable?: boolean;
}

interface AppCatalogManager {
  registerEnv(environmentId: string): void;
  registerPageMap(pageMap: Map<string, any>): void;
  setMenuData(menuData: MenuDataItem[]): void;
  showCatalog(container: Element | null): void;
}

interface FilterResult {
  filter: FilterConfig;
  myFilter: MyFilterConfig;
}

export class ContentMaterialReplaceCatalog {
  private appCatalogManager: AppCatalogManager;
  private menuData?: MenuDataItem[];
  private rootContainer: Element | null;
  private readonly menuIdEnum: typeof HSApp.Catalog.DataConfig.MenuIdEnum;
  private readonly treeIdEnum: typeof HSApp.Catalog.DataConfig.TreeIdEnum;

  constructor() {
    this.menuIdEnum = HSApp.Catalog.DataConfig.MenuIdEnum;
    this.treeIdEnum = HSApp.Catalog.DataConfig.TreeIdEnum;
    this.appCatalogManager = HSApp.Catalog.Manager;
    this.rootContainer = document.querySelector('.catalogLibContainer');
  }

  public init(): void {
    this.appCatalogManager.registerEnv(HSApp.App.getApp().activeEnvironmentId);
    const pageMap = this.getPageMap();
    this.appCatalogManager.registerPageMap(pageMap);
    this.buildMenuData();
    this.appCatalogManager.setMenuData(this.menuData!);
    this.appCatalogManager.showCatalog(this.rootContainer);
  }

  private buildMenuData(): void {
    const { filter, myFilter } = this.buildFilters();
    
    this.menuData = [
      {
        icon: 'hs_catalog_cebianlan_jingpinku',
        text: ResourceManager.getString('plugin_catalog_replace_premium_model_library'),
        data: [],
        id: this.menuIdEnum.premiumModelLibrary,
        params: {
          treeId: this.treeIdEnum.PremiumModelLibraryRoot
        },
        filters: filter,
        isSelected: true
      },
      {
        icon: 'hs_catalog_cebianlan_jiucaizhiku',
        text: ResourceManager.getString('plugin_catalog_replace_old_model_library'),
        data: [],
        id: this.menuIdEnum.MaterialReplaceCategoryRoot,
        params: {
          treeId: this.treeIdEnum.MaterialReplaceCategoryRoot
        },
        filters: filter,
        isSelected: false
      },
      {
        icon: 'hs_catalog_cebianlan_qiyesucai',
        text: ResourceManager.getString('catalog_enterprise_model_library'),
        data: [
          {
            id: this.menuIdEnum.enterpriseModelLibrary,
            name: ''
          }
        ],
        id: this.menuIdEnum.enterpriseModelLibrary,
        isSelected: false,
        filters: {
          sceneType: HSApp.Catalog.DataConfig.SceneType.Material
        },
        disable: !adskUser.isEnterprise || adskUser.hideTeamModelLibrary
      },
      {
        icon: 'hs_catalog_cebianlan_wode1',
        text: ResourceManager.getString('catalog_my'),
        data: [
          {
            id: this.menuIdEnum.myModelLibrary
          }
        ],
        disableCategoryPanel: true,
        params: {
          treeId: this.treeIdEnum.MyCategoryRoot
        },
        filters: myFilter,
        id: this.menuIdEnum.myModelLibrary,
        isSelected: false
      }
    ];
  }

  private getPageMap(): Map<string, any> {
    const pageMap = new Map<string, any>();
    
    if (HSApp.Config.TENANT === 'fp') {
      pageMap.set('airesult', React.createElement(AIResultPage, null));
    }
    
    return pageMap;
  }

  private buildFilters(): FilterResult {
    return {
      filter: {
        exclude: HSCatalog.CategoryTypeEnum.ext_mixpaint_material_exclude
      },
      myFilter: {
        categoryTreeFilter: {
          include: HSCatalog.CategoryTypeEnum.ext_diy_material,
          exclude: HSCatalog.CategoryTypeEnum.MyTile
        },
        modelSearchFilter: {
          filterType: 'material',
          excludeCategoryIdList: ['67b6c605-9789-4bf3-99df-daaa349c86e1']
        },
        merchantSearchFilter: {
          filterType: 'material'
        }
      }
    };
  }
}