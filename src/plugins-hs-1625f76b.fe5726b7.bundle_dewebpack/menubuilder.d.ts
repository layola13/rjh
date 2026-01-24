/**
 * MenuBuilder - 目录菜单构建器
 * 负责构建不同环境下的目录菜单数据，包括模型库、材质库、企业库等
 */

/**
 * 自定义标签页对象配置
 */
interface CustomizedTabObject {
  /** 标签页显示文本 */
  label?: string;
  /** 自定义类型标识 */
  customziedType?: string;
}

/**
 * 分类树过滤器配置
 */
interface CategoryTreeFilter {
  /** 包含的分类类型列表 */
  include?: string | string[];
  /** 排除的分类类型列表 */
  exclude?: string | string[];
}

/**
 * 模型搜索过滤器配置
 */
interface ModelSearchFilter {
  /** 过滤类型：'model' | 'material' */
  filterType?: string;
  /** 场景类型：'2d' | '3d' */
  sceneType?: string;
  /** 排除的分类ID列表 */
  excludeCategoryIdList?: string[];
}

/**
 * 我的页面数据配置
 */
interface MyPageDataConfig {
  /** 分类类型 */
  types?: string | string[];
  /** 排除的分类类型 */
  excludeType?: string | string[];
  /** 模型搜索过滤器 */
  modelSearchFilter?: ModelSearchFilter;
  /** 最近产品页面配置 */
  recentProductPage?: unknown;
}

/**
 * UI控制配置
 */
interface UIControl {
  /** 标题 */
  title?: string;
  /** 类型：'pickMaterial' 等 */
  type?: string;
}

/**
 * 查询参数配置
 */
interface QueryConfig {
  /** 分类ID */
  categoryId?: string;
  /** 查找ID */
  seekId?: string;
}

/**
 * 元数据配置
 */
interface MetadataConfig {
  /** 是否来自企业库 */
  isFromEnterprise?: boolean;
}

/**
 * 菜单配置选项
 */
interface MenuConfigOptions {
  /** 包含的分类类型 */
  types?: string | string[];
  /** 排除的分类类型 */
  excludeType?: string | string[];
  /** 我的数据配置 */
  mydata?: MyPageDataConfig;
  /** UI控制配置 */
  uiControl?: UIControl;
  /** 查询参数 */
  query?: QueryConfig;
  /** 替换场景标识 */
  replaceScene?: string;
  /** 是否为踢脚线场景 */
  isWainScot?: boolean;
  /** 是否为自定义模型 */
  customizedmodel?: boolean;
  /** 自定义标签页对象列表 */
  customziedTabObj?: CustomizedTabObject[];
  /** 元数据 */
  metadata?: MetadataConfig;
}

/**
 * 树参数配置
 */
interface TreeParams {
  /** 树ID */
  treeId: string;
  /** 选项配置 */
  options?: unknown;
  /** 是否需要刷新 */
  needRefresh?: boolean;
  /** 过滤器标识 */
  filter?: string;
}

/**
 * 标签页数据配置
 */
interface TabData {
  /** 标签页类型 */
  tabType: string;
  /** 标签页值（唯一标识） */
  value: string;
  /** 标签页显示文本 */
  label: string;
  /** 分类树过滤器 */
  categoryTreeFilters?: CategoryTreeFilter;
  /** 树参数 */
  params?: TreeParams;
  /** 是否禁用 */
  disable?: boolean;
  /** 过滤器配置 */
  filters?: {
    categoryTreeFilter?: CategoryTreeFilter;
    modelSearchFilter?: ModelSearchFilter;
    recentProductPage?: unknown;
  };
  /** 自定义类型 */
  customziedType?: string;
}

/**
 * 角标图标配置
 */
interface CornerIconConfig {
  /** 图标源路径 */
  src: string;
  /** 样式配置 */
  style: {
    right?: string;
    top?: string;
    width?: string;
    height?: string;
  };
  /** 检查菜单状态的回调 */
  checkMenuStatus?: () => boolean;
}

/**
 * 菜单数据项配置
 */
interface MenuDataItem {
  /** 菜单项ID */
  id: string;
  /** 显示名称 */
  name: string;
  /** 父级ID */
  parentId?: string;
  /** 子分类列表 */
  categories?: unknown[];
  /** 点击前的回调 */
  beforeClickActive?: ((callback: () => void) => void) | null;
  /** 角标图标配置 */
  cornerIcon?: CornerIconConfig;
}

/**
 * 菜单项配置
 */
interface MenuItem {
  /** 菜单项ID */
  id: string;
  /** 图标类名 */
  icon: string;
  /** 显示文本 */
  text: string;
  /** 菜单数据列表 */
  data: MenuDataItem[];
  /** 是否选中 */
  isSelected?: boolean;
  /** 是否禁用分类面板 */
  disableCategoryPanel?: boolean;
  /** 选中的分类ID */
  selectCategoryId?: string;
  /** 选中的分类索引 */
  selectCategoryIndex?: number;
  /** 树参数 */
  params?: TreeParams;
  /** 过滤器配置 */
  filters?: {
    categoryTreeFilter?: CategoryTreeFilter;
  };
  /** 隐藏的标签页列表 */
  hiddenTabs?: string[];
  /** 检查菜单状态的回调 */
  checkMenuStatus?: () => boolean;
  /** 是否禁用埋点追踪 */
  disableUtrack?: boolean;
  /** 是否显示新红点 */
  newRedDot?: boolean;
  /** 配置控制红点的键 */
  configControlRedDot?: string;
}

/**
 * 库数据配置
 */
interface LibraryData {
  /** 库名称 */
  libraryName: string;
  /** 检查是否禁用的回调 */
  checkDisabled: () => boolean;
  /** 数据列表 */
  data: Array<{ id: string; name: string }>;
}

/**
 * 独立面板菜单数据结果
 */
interface IndependentPanelMenuData {
  /** 菜单标签页列表 */
  menuTabs: TabData[];
  /** 获取分类树的Promise列表 */
  getCategoryTrees: Array<Promise<unknown>>;
}

/**
 * 标签页结果数据
 */
interface TabResult {
  /** 标签页数据 */
  tabData: TabData;
  /** 获取分类树的Promise */
  getCategoryTrees: Promise<unknown>;
}

/**
 * 本地化文本配置
 */
interface LocalizedTextConfig {
  /** 目录绘制房间文本 */
  catalogDrawRoom?: string;
  /** 目录模型库文本 */
  catalogModelLibrary?: string;
}

/**
 * MenuBuilder类 - 目录菜单构建器
 * 单例模式，负责构建和管理各种环境下的目录菜单结构
 */
export declare class MenuBuilder {
  /** 单例实例 */
  private static instance: MenuBuilder | undefined;

  /** 菜单ID枚举 */
  private readonly menuIdEnum: typeof HSApp.Catalog.DataConfig.MenuIdEnum;

  /** 自定义属性ID枚举 */
  private readonly customAttributeIdEnum: typeof HSApp.Catalog.DataConfig.CustomAttributeIdEnum;

  /** 树ID枚举 */
  private readonly treeIdEnum: typeof HSApp.Catalog.DataConfig.TreeIdEnum;

  /** 基础API管理器实例 */
  private readonly baseApiManager: typeof HSApp.Catalog.BaseApiManager;

  /**
   * 获取MenuBuilder单例实例
   * @returns MenuBuilder实例
   */
  static getInstance(): MenuBuilder;

  /**
   * 构建默认环境的分类树过滤器
   * @param options - 菜单配置选项
   * @returns 分类树过滤器配置
   */
  buildDefaultEnvFilter(options: MenuConfigOptions): CategoryTreeFilter;

  /**
   * 构建独立面板的分类树过滤器
   * @param options - 菜单配置选项
   * @returns 分类树过滤器配置
   */
  buildIndependentPanelCategoryTreeFilter(options: MenuConfigOptions): CategoryTreeFilter;

  /**
   * 构建"我的"页面数据配置
   * @param options - 菜单配置选项
   * @param fallbackFilter - 回退的过滤器配置
   * @returns 包含分类树过滤器、模型搜索过滤器和最近产品页面的配置对象
   */
  buildIndependentMyPageData(
    options: MenuConfigOptions,
    fallbackFilter?: CategoryTreeFilter
  ): {
    categoryTreeFilter: CategoryTreeFilter;
    modelSearchFilter: ModelSearchFilter;
    recentProductPage?: unknown;
  };

  /**
   * 获取模型库标签页配置
   * @param options - 菜单配置选项
   * @param treeId - 树ID
   * @param treeOptions - 树选项配置
   * @returns 包含标签页数据和分类树获取Promise的对象
   */
  getTabModelLibrary(
    options: MenuConfigOptions,
    treeId?: string,
    treeOptions?: unknown
  ): TabResult;

  /**
   * 获取高级材质库标签页配置
   * @param options - 菜单配置选项
   * @returns 包含标签页数据和分类树获取Promise的对象
   */
  getTabMaterialPremiumLibrary(options: MenuConfigOptions): TabResult;

  /**
   * 获取分类树数据
   * @param treeId - 树ID
   * @param options - 菜单配置选项
   * @param params - 树参数
   * @param filter - 分类树过滤器
   * @returns 获取分类树的Promise
   */
  getCagegoryTree(
    treeId: string,
    options: MenuConfigOptions,
    params: TreeParams,
    filter: CategoryTreeFilter
  ): Promise<unknown>;

  /**
   * 获取自定义库标签页配置
   * @param customizedConfig - 自定义标签页配置
   * @param options - 菜单配置选项
   * @param treeId - 树ID
   * @param treeOptions - 树选项配置
   * @returns 包含标签页数据和分类树获取Promise的对象
   */
  getTabCustomziedLibrary(
    customizedConfig: CustomizedTabObject,
    options: MenuConfigOptions,
    treeId?: string,
    treeOptions?: unknown
  ): TabResult;

  /**
   * 获取库数据配置（企业库或代理商企业库）
   * @param libraryType - 库类型：'enterprise' | 'agentEnterprise'
   * @returns 库数据配置
   */
  getLibraryData(libraryType: 'enterprise' | 'agentEnterprise'): LibraryData;

  /**
   * 获取模型库菜单数据项
   * @param libraryType - 库类型：'enterprise' | 'agentEnterprise'
   * @returns 菜单数据项
   */
  getModelLibraryData(libraryType: 'enterprise' | 'agentEnterprise'): MenuItem;

  /**
   * 获取库标签页配置（通用方法）
   * @param libraryType - 库类型：'enterprise' | 'agentEnterprise'
   * @param treeId - 树ID
   * @param treeOptions - 树选项配置
   * @returns 包含标签页数据和分类树获取Promise的对象
   */
  getTabLibrary(
    libraryType: 'enterprise' | 'agentEnterprise',
    treeId?: string,
    treeOptions?: unknown
  ): TabResult;

  /**
   * 获取代理商企业库标签页配置
   * @param treeId - 树ID
   * @param treeOptions - 树选项配置
   * @returns 包含标签页数据和分类树获取Promise的对象
   */
  getAgentTabEnterpriseLibrary(treeId?: string, treeOptions?: unknown): TabResult;

  /**
   * 获取企业库标签页配置
   * @param treeId - 树ID
   * @param treeOptions - 树选项配置
   * @returns 包含标签页数据和分类树获取Promise的对象
   */
  getTabEnterpriseLibrary(treeId?: string, treeOptions?: unknown): TabResult;

  /**
   * 获取"我的模型库"标签页配置
   * @param options - 菜单配置选项
   * @returns 包含标签页数据和分类树获取Promise的对象
   */
  getTabMyModelLibrary(options: MenuConfigOptions): TabResult;

  /**
   * 获取企业库相关的标签页数据数组
   * @param options - 菜单配置选项
   * @returns 企业库标签页数据数组
   */
  getEnterpriseTabData(options: MenuConfigOptions): TabResult[];

  /**
   * 获取独立面板菜单数据
   * @param options - 菜单配置选项
   * @param treeId - 树ID
   * @param treeOptions - 树选项配置
   * @returns 包含菜单标签页列表和分类树获取Promise列表的对象
   */
  getIndependentPanelMenuData(
    options: MenuConfigOptions,
    treeId?: string,
    treeOptions?: unknown
  ): IndependentPanelMenuData;

  /**
   * 根据上下文获取入口UI文本
   * @param options - 菜单配置选项
   * @param treeId - 树ID
   * @returns UI显示文本
   */
  getContextEntryUI(options: MenuConfigOptions, treeId?: string): string;

  /**
   * 获取默认环境的菜单数据列表
   * @param options - 菜单配置选项
   * @param needRefresh - 是否需要刷新
   * @param localizedText - 本地化文本配置
   * @returns 菜单项配置数组
   */
  getDefaultEnvMenuData(
    options: MenuConfigOptions,
    needRefresh?: boolean,
    localizedText?: LocalizedTextConfig
  ): MenuItem[];
}