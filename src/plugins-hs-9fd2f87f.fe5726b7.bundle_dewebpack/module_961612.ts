interface Category {
  id: string;
  fake_id?: string;
  categories?: Category[];
}

interface MenuEntry {
  icon: string;
  text: string;
  data: MenuEntryData[];
  id: string;
  isSelected: boolean;
  params?: {
    treeId: string;
  };
  disableCategoryPanel?: boolean;
  filters?: FilterConfig;
  checkMenuStatus?: () => boolean;
}

interface MenuEntryData {
  name?: string;
  categories?: Category[];
  id: string;
}

interface FilterConfig {
  categoryTreeFilter: {
    include: string[];
    exclude: string;
  };
  modelSearchFilter: {
    filterType: string;
    excludeCategoryIdList: string[];
  };
  merchantSearchFilter: {
    filterType: string;
  };
}

interface PageDataItem {
  type: string;
  isSettingVisible: boolean;
  values: PageDataValue[];
}

interface PageDataValue {
  label: string;
  icon: string;
  iconHover: string;
  type: string;
  largeViewImg: string;
  onMouseDown: () => void;
}

interface CatalogPlugin {
  BaseApiManager: BaseApiManager;
}

interface BaseApiManager {
  getCategoryTree(params: { treeId: string }): Promise<Category[]> | null;
}

interface AppCatalogManager {
  registerEnv(envId: string): boolean;
  setMenuData(data: MenuEntry[]): void;
  registerPageMap(data: Map<string, React.ReactElement>): void;
  showCatalog(container: Element | null): void;
  setCatalogPageShow(show: boolean): void;
}

interface TreeIdEnum {
  PremiumModelLibraryRoot: string;
  MaterialReplaceCategoryRoot: string;
  MyCategoryRoot: string;
}

interface MenuIdEnum {
  enterpriseModelLibrary: string;
  myModelLibrary: string;
}

const CORNICE_CATEGORY_ID_EZHOME = "fbc947a6-0b75-374f-a915-20c2bd0073d1";
const CORNICE_CATEGORY_ID_DEFAULT = "6975c960-17a8-492c-a283-4e46966dd611";

const FP_ALLOWED_CATEGORIES = [
  "95311609-2561-4880-8c84-d455797afa04",
  "23b9e96d-bd96-403e-888c-04aaca9cf08d",
  "b1ca3908-87eb-4fce-ae64-3db07f80f341"
];

const EXCLUDED_CATEGORIES_DEFAULT = [
  "3c3b6443-82a7-3439-92d8-dc77f41a2644",
  "5fa21405-9bc8-4bfc-ae78-b7c0a20233cc",
  "dc590f05-41c4-3e04-ba99-2e5eb17a38e6"
];

const EXCLUDED_MATERIAL_CATEGORY = "67b6c605-9789-4bf3-99df-daaa349c86e1";

export default class CatalogManager {
  private entryData: MenuEntry[] = [];
  private pageData: Map<string, React.ReactElement> = new Map();
  private catalogPlugin: CatalogPlugin;
  private appCatalogManager: AppCatalogManager;
  private treeIdEnum: TreeIdEnum;
  private menuIdEnum: MenuIdEnum;
  private corniceCategories: Category[] = [];

  constructor(catalogPlugin: CatalogPlugin) {
    this.catalogPlugin = catalogPlugin;
    this.appCatalogManager = HSApp.Catalog.Manager;
    this.treeIdEnum = HSApp.Catalog.DataConfig.TreeIdEnum;
    this.menuIdEnum = HSApp.Catalog.DataConfig.MenuIdEnum;
  }

  getCorniceCategoriesIds = (): string => {
    return this.corniceCategories.map(category => category.id).join(", ");
  };

  async initCatalog(): Promise<void> {
    await this._init();

    const activeEnvironmentId = HSApp.App.getApp().activeEnvironmentId;
    
    if (!this.appCatalogManager.registerEnv(activeEnvironmentId)) {
      this.appCatalogManager.setMenuData(this.entryData);
      this.appCatalogManager.registerPageMap(this.pageData);
    }

    const catalogContainer = document.querySelector(".catalogLibContainer");
    this.appCatalogManager.showCatalog(catalogContainer);
    this.appCatalogManager.setCatalogPageShow(false);
  }

  private async _init(): Promise<void> {
    const baseApiManager = this.catalogPlugin.BaseApiManager;
    const promises: Promise<Category[]>[] = [];

    let categoryTreePromise = baseApiManager.getCategoryTree({
      treeId: HSApp.Config.DEFAULT_CATEGORY_TREE_ID
    });

    if (!categoryTreePromise) {
      const params = { treeId: HSApp.Config.DEFAULT_CATEGORY_TREE_ID };
      categoryTreePromise = baseApiManager.getCategoryTree(params);
    }

    if (categoryTreePromise) {
      promises.push(categoryTreePromise);
    }

    try {
      const results = await Promise.all(promises);
      
      const corniceCategoryId = HSApp.Config.TENANT === "ezhome" 
        ? CORNICE_CATEGORY_ID_EZHOME 
        : CORNICE_CATEGORY_ID_DEFAULT;

      const categoryPath: Category[] = [];
      this.corniceCategories = [];

      if (this._getCategoryPathById(corniceCategoryId, results[0], categoryPath)) {
        this.corniceCategories = [...categoryPath[categoryPath.length - 1].categories!];
        this.corniceCategories.forEach(category => {
          category.fake_id = `plugin_ceiling_add_${category.id}`;
        });
      }

      if (HSApp.Config.TENANT === "fp") {
        this.corniceCategories = this.corniceCategories.filter(category =>
          FP_ALLOWED_CATEGORIES.includes(category.id)
        );
      } else {
        this.corniceCategories = this.corniceCategories.filter(category =>
          !EXCLUDED_CATEGORIES_DEFAULT.includes(category.id)
        );
      }

      this.entryData = this.getEntryData();
      this.pageData = this.getPageData();
    } catch (error) {
      // Error handling
    }
  }

  private getEntryData(): MenuEntry[] {
    const filters: FilterConfig = {
      categoryTreeFilter: {
        include: [...HSCatalog.CategoryTypeEnum.ext_diy_material, HSCatalog.CategoryTypeEnum.MyDIY],
        exclude: HSCatalog.CategoryTypeEnum.MyTile
      },
      modelSearchFilter: {
        filterType: "material",
        excludeCategoryIdList: [EXCLUDED_MATERIAL_CATEGORY]
      },
      merchantSearchFilter: {
        filterType: "material"
      }
    };

    return [
      {
        icon: "hs_catalog_cebianlan_zujian",
        text: ResourceManager.getString("plugin_catalog_diy_component"),
        data: [
          {
            name: ResourceManager.getString("plugin_cusomized_feature_modeling_catalog_add_lines"),
            categories: this.corniceCategories,
            id: this.getCorniceCategoriesIds()
          },
          {
            name: ResourceManager.getString("plugin_cusomized_feature_modeling_catalog_light_slot_strip"),
            id: "customized_feature_model_lightslot"
          },
          {
            name: ResourceManager.getString("plugin_cusomized_feature_modeling_catalog_3d_text"),
            id: "customized_feature_model_3d_text"
          },
          {
            name: ResourceManager.getString("plugin_cusomized_feature_modeling_catalog_pm_shape"),
            id: "plugin_cusomized_feature_modeling_catalog_pm_shape"
          }
        ],
        id: "diy_component",
        isSelected: true
      },
      {
        icon: "hs_catalog_cebianlan_jingpinku",
        text: ResourceManager.getString("plugin_catalog_replace_premium_model_library"),
        data: [],
        params: {
          treeId: this.treeIdEnum.PremiumModelLibraryRoot
        },
        id: "customized_feature_model_material",
        isSelected: false
      },
      {
        icon: "hs_catalog_cebianlan_jiucaizhiku",
        text: ResourceManager.getString("plugin_catalog_replace_old_model_library"),
        data: [],
        params: {
          treeId: this.treeIdEnum.MaterialReplaceCategoryRoot
        },
        id: "customized_feature_model_old_material",
        isSelected: false
      },
      {
        icon: "hs_catalog_cebianlan_qiyesucai",
        text: ResourceManager.getString("catalog_enterprise_model_library"),
        data: [
          {
            id: this.menuIdEnum.enterpriseModelLibrary,
            name: ""
          }
        ],
        id: this.menuIdEnum.enterpriseModelLibrary,
        isSelected: false,
        checkMenuStatus: (): boolean => {
          return !adskUser.isEnterprise || adskUser.isEnterpriseMember;
        }
      },
      {
        icon: "hs_catalog_cebianlan_wode1",
        text: ResourceManager.getString("new_catalog_mycategory_name"),
        data: [
          {
            id: this.menuIdEnum.myModelLibrary,
            name: ""
          }
        ],
        disableCategoryPanel: true,
        params: {
          treeId: this.treeIdEnum.MyCategoryRoot
        },
        filters: filters,
        isSelected: false,
        id: this.menuIdEnum.myModelLibrary
      }
    ];
  }

  private getPageData(): Map<string, React.ReactElement> {
    const lightSlotPageData = this.getLightSlotPageData();
    const textPageData = this.get3DTextPageData();
    const pmShapePageData = this.getPMShapePageData();

    const pageMap = new Map<string, React.ReactElement>();
    
    pageMap.set("customized_feature_model_lightslot", React.createElement(CatalogPage, {
      pageData: lightSlotPageData
    }));
    
    pageMap.set("customized_feature_model_3d_text", React.createElement(CatalogPage, {
      pageData: textPageData
    }));
    
    pageMap.set("plugin_cusomized_feature_modeling_catalog_pm_shape", React.createElement(CatalogPage, {
      pageData: pmShapePageData
    }));

    return pageMap;
  }

  private getLightSlotPageData(): PageDataItem[] {
    return [
      {
        type: ResourceManager.getString("plugin_ceiling_add_light_slot_light_band"),
        isSettingVisible: false,
        values: [
          {
            label: ResourceManager.getString("plugin_ceiling_add_light_slot"),
            icon: LightSlotIcon,
            iconHover: LightSlotIcon,
            type: "ceiling-imagebutton",
            largeViewImg: LightSlotIcon,
            onMouseDown: (): void => {
              MessageHandler.instance().sendCmd(DiyCmdIds.CMD_ADD_LIGHT_SLOT);
            }
          },
          {
            label: ResourceManager.getString("plugin_ceiling_add_light_band"),
            icon: LightBandIcon,
            iconHover: LightBandIcon,
            type: "ceiling-imagebutton",
            largeViewImg: LightBandIcon,
            onMouseDown: (): void => {
              MessageHandler.instance().sendCmd(DiyCmdIds.CMD_ADD_LIGHT_BAND);
            }
          }
        ]
      }
    ];
  }

  private get3DTextPageData(): PageDataItem[] {
    return [
      {
        type: ResourceManager.getString("plugin_cusomized_feature_modeling_catalog_3d_text"),
        isSettingVisible: false,
        values: [
          {
            label: ResourceManager.getString("plugin_cusomized_feature_modeling_catalog_3d_text"),
            icon: TextIcon,
            iconHover: TextIcon,
            type: "ceiling-imagebutton",
            largeViewImg: TextIcon,
            onMouseDown: (): void => {
              MessageHandler.instance().sendCmd(DiyCmdIds.CMD_CREATE_TEXT);
            }
          }
        ]
      }
    ];
  }

  private getPMShapePageData(): PageDataItem[] {
    return [
      {
        type: ResourceManager.getString("plugin_cusomized_feature_modeling_catalog_pm_shape"),
        isSettingVisible: false,
        values: [
          {
            label: ResourceManager.getString("plugin_cusomized_feature_modeling_catalog_cone_shape"),
            icon: ConeIcon,
            iconHover: ConeIcon,
            type: "ceiling-imagebutton",
            largeViewImg: ConeIcon,
            onMouseDown: (): void => {
              MessageHandler.instance().sendCmd(DiyCmdIds.CMD_CREATE_PM_SHAPE, "cone");
            }
          },
          {
            label: ResourceManager.getString("plugin_cusomized_feature_modeling_catalog_sphere_shape"),
            icon: SphereIcon,
            iconHover: SphereIcon,
            type: "ceiling-imagebutton",
            largeViewImg: SphereIcon,
            onMouseDown: (): void => {
              MessageHandler.instance().sendCmd(DiyCmdIds.CMD_CREATE_PM_SHAPE, "sphere");
            }
          },
          {
            label: ResourceManager.getString("plugin_cusomized_feature_modeling_catalog_torus_shape"),
            icon: TorusIcon,
            iconHover: TorusIcon,
            type: "ceiling-imagebutton",
            largeViewImg: TorusIcon,
            onMouseDown: (): void => {
              MessageHandler.instance().sendCmd(DiyCmdIds.CMD_CREATE_PM_SHAPE, "torus");
            }
          }
        ]
      }
    ];
  }

  private _getCategoryPathById(
    targetId: string,
    categories: Category[],
    path: Category[]
  ): boolean {
    if (!targetId) {
      return false;
    }

    const categoryCount = categories.length;

    for (let i = 0; i < categoryCount; i++) {
      const category = categories[i];

      if (category?.id === targetId) {
        path.push(category);
        return true;
      }

      if (category?.categories && category.categories.length > 0) {
        path.push(category);
        
        if (this._getCategoryPathById(targetId, category.categories, path)) {
          return true;
        }
        
        path.pop();
      }
    }

    return false;
  }
}