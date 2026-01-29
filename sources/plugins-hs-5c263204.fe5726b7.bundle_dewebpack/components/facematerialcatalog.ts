import { HSCatalog } from './HSCatalog';

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

interface ModelSearchFilter {
  filterType: string;
  excludeCategoryIdList?: string[];
}

interface MerchantSearchFilter {
  filterType: string;
}

interface MyFilter {
  categoryTreeFilter?: CategoryTreeFilter;
  modelSearchFilter?: ModelSearchFilter;
  merchantSearchFilter?: MerchantSearchFilter;
}

interface MenuFilters {
  sceneType?: string;
  exclude?: string;
  categoryTreeFilter?: CategoryTreeFilter;
  modelSearchFilter?: ModelSearchFilter;
  merchantSearchFilter?: MerchantSearchFilter;
}

interface MenuDataItem {
  icon: string;
  text: string;
  data: Array<{ id: string; name?: string }>;
  id: string;
  params?: MenuParams;
  filters?: MenuFilters;
  isSelected: boolean;
  disable?: boolean;
  disableCategoryPanel?: boolean;
}

interface CatalogManager {
  registerEnv(environmentId: string): void;
  setMenuData(menuData: MenuDataItem[]): void;
  showCatalog(container: HTMLElement | null): void;
}

interface MenuIdEnum {
  premiumModelLibrary: string;
  MaterialReplaceCategoryRoot: string;
  enterpriseModelLibrary: string;
  myModelLibrary: string;
}

interface TreeIdEnum {
  PremiumModelLibraryRoot: string;
  MaterialReplaceCategoryRoot: string;
  MyCategoryRoot: string;
}

interface DataConfig {
  MenuIdEnum: MenuIdEnum;
  TreeIdEnum: TreeIdEnum;
  SceneType: {
    Material: string;
  };
}

declare global {
  const HSApp: {
    Catalog: {
      DataConfig: DataConfig;
      Manager: CatalogManager;
    };
    App: {
      getApp(): {
        activeEnvironmentId: string;
      };
    };
  };
  const ResourceManager: {
    getString(key: string): string;
  };
  const adskUser: {
    isEnterprise: boolean;
    hideTeamModelLibrary: boolean;
  };
}

export class FaceMaterialCatalog {
  private appCatalogManager: CatalogManager;
  private menuData: MenuDataItem[] | undefined;
  private rootContainer: HTMLElement | null;
  private menuIdEnum: MenuIdEnum;
  private treeIdEnum: TreeIdEnum;

  constructor() {
    this.menuIdEnum = HSApp.Catalog.DataConfig.MenuIdEnum;
    this.treeIdEnum = HSApp.Catalog.DataConfig.TreeIdEnum;
    this.appCatalogManager = HSApp.Catalog.Manager;
    this.rootContainer = document.querySelector<HTMLElement>('.catalogLibContainer');
  }

  init(): void {
    this.appCatalogManager.registerEnv(HSApp.App.getApp().activeEnvironmentId);
    this.buildMenuData();
    if (this.menuData) {
      this.appCatalogManager.setMenuData(this.menuData);
    }
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
        filters: {
          sceneType: HSApp.Catalog.DataConfig.SceneType.Material
        },
        isSelected: false,
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

  private buildFilters(): { filter: FilterConfig; myFilter: MyFilter } {
    return {
      filter: {
        exclude: HSCatalog.CategoryTypeEnum.ext_mixpaint_replace_material_exclude
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