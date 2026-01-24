/**
 * 内容材质替换目录管理器
 * 负责管理材质库的目录结构、菜单数据和页面映射
 */
export declare class ContentMaterialReplaceCatalog {
  /**
   * 应用目录管理器实例
   */
  private appCatalogManager: typeof HSApp.Catalog.Manager;

  /**
   * 菜单数据配置
   */
  private menuData: MenuDataItem[];

  /**
   * 根容器DOM元素
   */
  private rootContainer: HTMLElement | null;

  /**
   * 菜单ID枚举
   */
  private readonly menuIdEnum: typeof HSApp.Catalog.DataConfig.MenuIdEnum;

  /**
   * 树形结构ID枚举
   */
  private readonly treeIdEnum: typeof HSApp.Catalog.DataConfig.TreeIdEnum;

  /**
   * 构造函数
   * 初始化目录管理器、枚举和根容器
   */
  constructor();

  /**
   * 初始化目录系统
   * 注册环境、页面映射、构建菜单数据并显示目录
   */
  init(): void;

  /**
   * 构建菜单数据结构
   * 包含精品库、旧材质库、企业素材库和我的模型库
   */
  private buildMenuData(): void;

  /**
   * 获取页面映射配置
   * @returns 页面路由与React组件的映射关系
   */
  private getPageMap(): Map<string, React.ReactElement>;

  /**
   * 构建过滤器配置
   * @returns 包含通用过滤器和个人库过滤器的配置对象
   */
  private buildFilters(): FilterConfig;
}

/**
 * 菜单数据项配置
 */
interface MenuDataItem {
  /**
   * 菜单图标类名
   */
  icon: string;

  /**
   * 菜单显示文本
   */
  text: string;

  /**
   * 子菜单数据
   */
  data: SubMenuItem[];

  /**
   * 菜单唯一标识
   */
  id: string;

  /**
   * 菜单参数配置
   */
  params?: {
    /**
     * 关联的树形结构ID
     */
    treeId: string;
  };

  /**
   * 过滤器配置
   */
  filters?: FilterOptions | MyFilterOptions;

  /**
   * 是否为选中状态
   */
  isSelected: boolean;

  /**
   * 是否禁用分类面板
   */
  disableCategoryPanel?: boolean;

  /**
   * 是否禁用该菜单项
   */
  disable?: boolean;
}

/**
 * 子菜单项
 */
interface SubMenuItem {
  /**
   * 子菜单ID
   */
  id: string;

  /**
   * 子菜单名称（可选）
   */
  name?: string;
}

/**
 * 过滤器配置
 */
interface FilterConfig {
  /**
   * 通用过滤器
   */
  filter: FilterOptions;

  /**
   * 个人库专用过滤器
   */
  myFilter: MyFilterOptions;
}

/**
 * 通用过滤器选项
 */
interface FilterOptions {
  /**
   * 排除的分类类型
   */
  exclude?: string;

  /**
   * 场景类型
   */
  sceneType?: string;
}

/**
 * 个人库过滤器选项
 */
interface MyFilterOptions {
  /**
   * 分类树过滤器
   */
  categoryTreeFilter: {
    /**
     * 包含的分类类型
     */
    include: string;

    /**
     * 排除的分类类型
     */
    exclude: string;
  };

  /**
   * 模型搜索过滤器
   */
  modelSearchFilter: {
    /**
     * 过滤类型
     */
    filterType: 'material';

    /**
     * 排除的分类ID列表
     */
    excludeCategoryIdList: string[];
  };

  /**
   * 商家搜索过滤器
   */
  merchantSearchFilter: {
    /**
     * 过滤类型
     */
    filterType: 'material';
  };
}

/**
 * HSApp 全局命名空间声明
 */
declare global {
  const HSApp: {
    Catalog: {
      Manager: any;
      DataConfig: {
        MenuIdEnum: Record<string, string>;
        TreeIdEnum: Record<string, string>;
        SceneType: {
          Material: string;
        };
      };
    };
    App: {
      getApp(): {
        activeEnvironmentId: string;
      };
    };
    Config: {
      TENANT: string;
    };
  };

  const HSCatalog: {
    CategoryTypeEnum: {
      ext_mixpaint_material_exclude: string;
      ext_diy_material: string;
      MyTile: string;
    };
  };

  const ResourceManager: {
    getString(key: string): string;
  };

  const adskUser: {
    isEnterprise: boolean;
    hideTeamModelLibrary: boolean;
  };

  namespace React {
    function createElement(
      component: any,
      props: any,
      ...children: any[]
    ): ReactElement;

    interface ReactElement {}
  }
}

export {};