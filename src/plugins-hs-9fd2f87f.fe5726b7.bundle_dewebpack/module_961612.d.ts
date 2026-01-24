/**
 * 目录管理器类型定义
 * 负责初始化和管理应用的目录结构，包括分类树、菜单数据和页面数据
 */

/**
 * 分类项接口
 */
interface Category {
  /** 分类唯一标识符 */
  id: string;
  /** 伪造的ID，用于插件扩展 */
  fake_id?: string;
  /** 子分类列表 */
  categories?: Category[];
  /** 分类名称 */
  name?: string;
}

/**
 * 目录插件接口
 */
interface CatalogPlugin {
  /** 基础API管理器 */
  BaseApiManager: BaseApiManager;
}

/**
 * 基础API管理器接口
 */
interface BaseApiManager {
  /**
   * 获取分类树
   * @param options - 包含树ID的配置对象
   * @returns 分类数组的Promise或null
   */
  getCategoryTree(options: { treeId: string }): Promise<Category[]> | null;
}

/**
 * 应用目录管理器接口
 */
interface AppCatalogManager {
  /**
   * 注册环境
   * @param envId - 环境ID
   * @returns 是否已注册
   */
  registerEnv(envId: string): boolean;
  
  /**
   * 设置菜单数据
   * @param data - 菜单条目数组
   */
  setMenuData(data: MenuEntry[]): void;
  
  /**
   * 注册页面映射
   * @param pageMap - 页面数据映射
   */
  registerPageMap(pageMap: Map<string, React.ReactElement>): void;
  
  /**
   * 显示目录
   * @param container - 容器元素
   */
  showCatalog(container: HTMLElement | null): void;
  
  /**
   * 设置目录页面显示状态
   * @param visible - 是否可见
   */
  setCatalogPageShow(visible: boolean): void;
}

/**
 * 分类树过滤器配置
 */
interface CategoryTreeFilter {
  /** 包含的分类类型 */
  include: string[];
  /** 排除的分类类型 */
  exclude: string;
}

/**
 * 模型搜索过滤器配置
 */
interface ModelSearchFilter {
  /** 过滤类型 */
  filterType: string;
  /** 排除的分类ID列表 */
  excludeCategoryIdList: string[];
}

/**
 * 商户搜索过滤器配置
 */
interface MerchantSearchFilter {
  /** 过滤类型 */
  filterType: string;
}

/**
 * 过滤器集合
 */
interface Filters {
  /** 分类树过滤器 */
  categoryTreeFilter: CategoryTreeFilter;
  /** 模型搜索过滤器 */
  modelSearchFilter: ModelSearchFilter;
  /** 商户搜索过滤器 */
  merchantSearchFilter: MerchantSearchFilter;
}

/**
 * 菜单数据项
 */
interface MenuDataItem {
  /** 菜单项ID */
  id: string;
  /** 菜单项名称 */
  name: string;
  /** 分类列表（可选） */
  categories?: Category[];
}

/**
 * 菜单条目配置
 */
interface MenuEntry {
  /** 图标名称 */
  icon: string;
  /** 显示文本 */
  text: string;
  /** 菜单数据项列表 */
  data: MenuDataItem[];
  /** 条目ID */
  id: string;
  /** 是否选中 */
  isSelected: boolean;
  /** 额外参数（可选） */
  params?: {
    /** 树ID */
    treeId: string;
  };
  /** 是否禁用分类面板（可选） */
  disableCategoryPanel?: boolean;
  /** 过滤器配置（可选） */
  filters?: Filters;
  /**
   * 检查菜单状态（可选）
   * @returns 菜单是否可用
   */
  checkMenuStatus?(): boolean;
}

/**
 * 页面数据项配置
 */
interface PageDataItem {
  /** 页面类型/标题 */
  type: string;
  /** 是否显示设置 */
  isSettingVisible: boolean;
  /** 页面值/按钮配置列表 */
  values: PageValue[];
}

/**
 * 页面值/按钮配置
 */
interface PageValue {
  /** 按钮标签 */
  label: string;
  /** 图标资源 */
  icon: string;
  /** 悬停时图标 */
  iconHover: string;
  /** 按钮类型 */
  type: string;
  /** 大图预览 */
  largeViewImg: string;
  /** 鼠标按下事件处理器 */
  onMouseDown(): void;
}

/**
 * 目录管理器类
 * 负责初始化和管理应用的目录结构
 */
export default class CatalogManager {
  /** 条目数据 */
  private entryData: MenuEntry[];
  
  /** 页面数据映射 */
  private pageData: Map<string, React.ReactElement>;
  
  /** 目录插件实例 */
  private catalogPlugin: CatalogPlugin;
  
  /** 应用目录管理器 */
  private appCatalogManager: AppCatalogManager;
  
  /** 树ID枚举 */
  private treeIdEnum: Record<string, string>;
  
  /** 菜单ID枚举 */
  private menuIdEnum: Record<string, string>;
  
  /** 檐口分类列表 */
  private corniceCategories: Category[];

  /**
   * 构造函数
   * @param catalogPlugin - 目录插件实例
   */
  constructor(catalogPlugin: CatalogPlugin);

  /**
   * 获取檐口分类的ID字符串（逗号分隔）
   * @returns 分类ID字符串
   */
  getCorniceCategoriesIds(): string;

  /**
   * 初始化目录
   * @returns 初始化完成的Promise
   */
  initCatalog(): Promise<void>;

  /**
   * 内部初始化方法
   * @returns 初始化完成的Promise
   */
  private _init(): Promise<void>;

  /**
   * 获取条目数据
   * @returns 菜单条目配置数组
   */
  getEntryData(): MenuEntry[];

  /**
   * 获取页面数据
   * @returns 页面数据映射
   */
  getPageData(): Map<string, React.ReactElement>;

  /**
   * 获取灯槽页面数据
   * @returns 灯槽页面配置数组
   */
  getLightSlotPageData(): PageDataItem[];

  /**
   * 获取3D文本页面数据
   * @returns 3D文本页面配置数组
   */
  get3DTextPageData(): PageDataItem[];

  /**
   * 获取参数化形状页面数据
   * @returns 参数化形状页面配置数组
   */
  getPMShapePageData(): PageDataItem[];

  /**
   * 根据ID查找分类路径
   * @param categoryId - 目标分类ID
   * @param categories - 分类数组
   * @param path - 路径数组（用于存储结果）
   * @returns 是否找到目标分类
   */
  private _getCategoryPathById(
    categoryId: string,
    categories: Category[],
    path: Category[]
  ): boolean;
}