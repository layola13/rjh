/**
 * Catalog API Manager - 商品目录管理核心模块
 * 提供商品分类、目录树、颜色映射、产品变体等数据管理功能
 */

import { CategoryTree, CategoryMapping, ReversedCategoryMapping, CategoryColorMapping } from './types/CategoryTypes';
import { Product, ProductVariation } from './types/ProductTypes';
import { EventsManager } from './managers/EventsManager';
import { DataManager } from './managers/DataManager';
import { Utils } from './utils/Utils';
import { CatalogSignalManager } from './managers/CatalogSignalManager';
import { HSCatalog, HSCore } from './types/HSTypes';

/**
 * 树节点标识枚举
 */
declare enum TreeIdEnum {
  GeneralCategoryRoot = 'GeneralCategoryRoot'
}

/**
 * 不显示迷你文本信息卡的分类类型枚举
 */
declare enum NotShowMiniTextInfoCardCategoryTypeEnum {
  [key: string]: string;
}

/**
 * 功能更新提示配置
 */
interface FunctionUpdateTipConfig {
  keyList: string[];
}

/**
 * 独立模式面板位置
 */
interface IndependentPosition {
  x: number;
  y: number;
}

/**
 * 获取分类树的参数选项
 */
interface GetCategoryTreeOptions {
  /** 树ID */
  treeId?: string;
  /** 分类ID */
  categoryId?: string;
  /** 是否需要刷新 */
  needRefresh?: boolean;
  /** 分支标识 */
  branch?: string;
}

/**
 * 分类过滤器配置
 */
interface CategoryFilter {
  /** 排除的分类类型 */
  exclude?: string | string[];
}

/**
 * 布局设计图片参数
 */
interface LayoutDesignImageParams {
  modelJids: string[];
}

/**
 * 布局设计图片响应结果
 */
interface LayoutDesignImageResult {
  result: Array<{
    legendImageUrl: string;
    configType: 'MODEL' | 'CATEGORY';
  }>;
}

/**
 * 搜索产品参数
 */
interface SearchProductsParams {
  categoriesIds: string;
  [key: string]: unknown;
}

/**
 * 搜索产品结果
 */
interface SearchProductsResult {
  items: unknown[];
  total: number;
}

/**
 * 墙漆数据结果
 */
interface WallPaintDataResult {
  products: Product[];
  total?: number;
}

/**
 * 房间信息
 */
interface RoomInfo {
  /** 房间ID */
  roomId: string;
  /** 房间名称 */
  roomName: string;
  /** 模型ID列表 */
  modelIds: string[];
}

/**
 * 商品配置结果
 */
interface GoodsConfigResult {
  result: unknown;
}

/**
 * 分类树范围响应
 */
interface CategoryTreeScopeResponse {
  categoryTree?: CategoryTree;
}

/**
 * 过滤分类参数
 */
interface FilteredCategoryParams {
  [key: string]: unknown;
}

/**
 * 过滤分类结果
 */
interface FilteredCategoryResult {
  result?: Array<{ id?: string }>;
}

/**
 * 信号载荷 - 页码变化
 */
interface SignalPageNumChangePayload {
  pageNum: number;
  rootContainer: HTMLElement;
}

/**
 * 信号载荷 - 独立面板显示
 */
interface SignalIndependentPanelShowPayload {
  isShowIndependent: boolean;
}

/**
 * 自定义组件函数类型
 */
type CustomizedComponentFunc = (param1: unknown, param2: unknown) => React.ComponentType | undefined;

/**
 * 搜索模式类型
 */
type SearchMode = 'keyword' | 'image' | 'ai';

/**
 * 商品目录API管理器
 * 单例模式，负责管理商品分类、目录树、产品数据等核心功能
 */
export default class CatalogApiManager {
  private static baseApiManager?: CatalogApiManager;

  /** 分类映射表 (treeId -> CategoryMapping) */
  private categoryMapping: Map<string, CategoryMapping>;

  /** 反向分类映射表 (treeId -> ReversedCategoryMapping) */
  private reversedCategoryMapping: Map<string, ReversedCategoryMapping>;

  /** 目录树缓存 (treeId -> Promise<CategoryTree>) */
  private catalogTrees: Map<string, Promise<{ categoryTree: CategoryTree; categoryMapping: CategoryMapping; reversedCategoryMapping: ReversedCategoryMapping; categoryColorMapping: CategoryColorMapping }>>;

  /** 过滤后的目录树缓存 */
  private filteredCatalogTrees: Map<string, CategoryTree>;

  /** 分类颜色映射表 */
  private categoryColorMapping: Map<string, CategoryColorMapping>;

  /** 相关产品缓存 (seekId -> Promise<ProductVariation>) */
  private relatedProductsBySeekId: Map<string, Promise<ProductVariation>>;

  /** 颜色分类数据缓存 */
  private colorCategoryMap: Map<string, WallPaintDataResult>;

  /** 事件管理器 */
  private baseEventsManager: EventsManager;

  /** 数据管理器 */
  private baseDataManager: DataManager;

  /** 模型ID搜索列表 */
  private modelIdsSearch: string[];

  /** 是否为独立模式 */
  private independentMode: boolean;

  /** 独立面板位置 */
  private independentPosition: IndependentPosition;

  /** 是否使用默认位置 */
  private useDefaultPos: boolean;

  /** 子菜单项数量限制 */
  private submenuItemsLimit: number;

  /** 自定义组件函数映射 (environmentId -> ComponentFunc) */
  private customizedComFuncMap: Map<string, CustomizedComponentFunc>;

  /** 目录信号管理器 */
  private catalogSignalManager: CatalogSignalManager;

  /** 搜索模式 */
  private searchMode: SearchMode;

  /** 布局设计图片缓存 (seekId -> imageUrl) */
  private layoutDesignImageSeekIdMap: Map<string, string>;

  /** 布局设计图片分类缓存 (categoryId -> imageUrl) */
  private layoutDesignImageCategoryIdMap: Map<string, string>;

  private constructor();

  /**
   * 获取单例实例
   */
  static getInstance(): CatalogApiManager;

  /**
   * 获取事件管理器
   */
  get eventsManager(): EventsManager;

  /**
   * 获取数据管理器
   */
  get dataManager(): DataManager;

  /**
   * 获取工具类
   */
  get Utils(): typeof Utils;

  /**
   * 获取子菜单项数量限制
   */
  get SubmenuItemsLimit(): number;

  /**
   * 设置子菜单项数量限制
   * @param limit - 限制数量，默认10
   */
  setSubmenuItemsLimit(limit?: number): void;

  /**
   * 设置自定义事件管理器
   * @param eventsManager - 自定义事件管理器实例
   */
  setCustomEventsManager(eventsManager: EventsManager): void;

  /**
   * 设置自定义数据管理器
   * @param dataManager - 自定义数据管理器实例
   */
  setCustomDataManager(dataManager: DataManager): void;

  /**
   * 根据商品ID获取相关产品变体
   * @param seekId - 商品唯一标识
   * @param additionalParam - 额外参数
   * @returns 产品变体Promise
   */
  getRelatedProductsById(seekId: string, additionalParam: unknown): Promise<ProductVariation>;

  /**
   * 获取分类树范围
   * @param params - 查询参数
   * @returns 分类树Promise
   */
  getCategoryTreeScope(params: unknown): Promise<CategoryTree | undefined>;

  /**
   * 获取分类树
   * @param options - 获取选项
   * @param filter - 过滤器配置
   * @returns 分类树Promise
   */
  getCategoryTree(options?: GetCategoryTreeOptions, filter?: CategoryFilter): Promise<CategoryTree>;

  /**
   * 扩展分类树（添加自定义属性）
   * @param categoryTree - 原始分类树
   * @returns 扩展后的分类树
   */
  private extraCatalogTree(categoryTree: CategoryTree): CategoryTree;

  /**
   * 获取过滤后的目录树
   * @param treeId - 树ID
   * @returns 过滤后的分类树
   */
  getFilteredCatalogTrees(treeId?: string): CategoryTree | undefined;

  /**
   * 获取反向分类映射
   * @param treeId - 树ID
   * @returns 反向分类映射
   */
  getReversedCategoryMapping(treeId: string): ReversedCategoryMapping | undefined;

  /**
   * 获取CDN规范化URL
   * @param url - 原始URL
   * @returns 规范化后的URL
   */
  getCNameUrl(url: string): string;

  /**
   * 按颜色编号排序颜色列表
   * @param colors - 颜色产品列表
   * @returns 排序后的颜色列表
   */
  private _sortColorByColorNumber(colors: Product[]): Product[];

  /**
   * 判断分类类型是否为颜色类型
   * @param category - 分类对象
   * @returns 是否为颜色类型
   */
  categoryTypesIsColor(category: { categoryTypes?: string[] }): boolean;

  /**
   * 添加自定义视图到布局管理器
   * @param pageNum - 页码
   * @param rootContainer - 根容器元素
   */
  addCustomView(pageNum: number, rootContainer: HTMLElement): void;

  /**
   * 更新收藏ID列表
   */
  updateFavIdList(): void;

  /**
   * 目录头部点击事件处理
   * @param event - 点击事件数据
   */
  onHeaderClick(event: unknown): void;

  /**
   * 获取布局管理器容器类名
   * @returns CSS类名
   */
  getLayoutMgrClass(): string;

  /**
   * 获取墙漆数据
   * @param params - 搜索参数
   * @returns 墙漆数据Promise
   */
  getWallPaintData(params: SearchProductsParams): Promise<WallPaintDataResult>;

  /**
   * 设置独立模式状态
   * @param isIndependent - 是否为独立模式
   */
  isIndependentMode(isIndependent: boolean): void;

  /**
   * 获取独立模式状态
   * @returns 是否为独立模式
   */
  getIndependentMode(): boolean;

  /**
   * 独立模式渲染完成回调
   * @param componentRef - React组件引用
   */
  renderEndIndependent(componentRef?: { current: React.ComponentType }): void;

  /**
   * 目录渲染完成回调
   */
  renderEndCatalog(): void;

  /**
   * 设置独立面板初始位置
   * @param position - 位置坐标
   */
  setIndependentPanelInitialPos(position: IndependentPosition): void;

  /**
   * 激活独立模态面板
   */
  activeModalIndependent(): void;

  /**
   * 取消激活独立模态面板
   * @param immediate - 是否立即关闭
   */
  deactiveModalIndependent(immediate?: boolean): void;

  /**
   * 保存独立面板位置
   * @param position - 位置坐标
   */
  saveIndependentPosition(position?: IndependentPosition): void;

  /**
   * 获取独立面板位置
   * @returns 位置坐标
   */
  getIndependentPosition(): IndependentPosition;

  /**
   * 判断是否需要渲染文本信息
   * @param category - 分类对象
   * @returns 是否需要渲染
   */
  isNeedRenderTextInfo(category: { contentType?: { isTypeOf: (type: string) => boolean } }): boolean;

  /**
   * 判断当前是否为默认环境
   * @returns 是否为默认环境
   */
  currentIsDefaultEnvironment(): boolean;

  /**
   * 判断应用是否为默认环境
   * @returns 是否为默认环境
   */
  isAppDefaultEnv(): boolean;

  /**
   * 判断材质入口是否可访问
   * @param params - 访问参数
   * @returns 是否可访问
   */
  isMaterialEntryAccessible(params: unknown): boolean;

  /**
   * 判断是否可以显示浮动视图
   * @returns 是否可显示
   */
  canShowFloatView(): boolean;

  /**
   * 关闭独立面板
   */
  closeIndependentPanel(): void;

  /**
   * 收集房间信息（包含的模型列表）
   * @returns 房间信息，无房间则返回undefined
   */
  collectRoomInfo(): RoomInfo | undefined;

  /**
   * 收集场景中所有模型ID
   * @returns 逗号分隔的模型ID字符串
   */
  collectModelIds(): string | undefined;

  /**
   * 清空模型ID搜索列表
   */
  clearModelIdsSearch(): void;

  /**
   * 添加模型ID到搜索列表
   * @param modelId - 模型ID
   */
  setModelIdsSearch(modelId: string): void;

  /**
   * 获取模型ID搜索列表
   * @returns 模型ID数组
   */
  getModelIdsSearch(): string[];

  /**
   * 获取收藏插件实例
   * @returns 收藏插件
   */
  getFavPlugin(): unknown;

  /**
   * 获取商品配置
   * @returns 商品配置Promise
   */
  getGoodsConfig(): Promise<unknown>;

  /**
   * 注册列表页头部自定义组件
   * @param func - 组件生成函数
   * @param environmentId - 环境ID，默认为当前激活环境
   */
  registerComOnListPageHeader(func: CustomizedComponentFunc, environmentId?: string): void;

  /**
   * 注销列表页头部自定义组件
   * @param environmentId - 环境ID，默认为当前激活环境
   */
  unregisterComOnListPageHeader(environmentId?: string): void;

  /**
   * 获取自定义组件
   * @param param1 - 参数1
   * @param param2 - 参数2
   * @returns 自定义组件或undefined
   */
  getCustomizedCom(param1: unknown, param2: unknown): React.ComponentType | undefined;

  /**
   * 获取过滤后的分类ID列表
   * @param params - 过滤参数
   * @returns 分类ID数组Promise
   */
  getFilteredCategory(params: FilteredCategoryParams): Promise<string[]>;

  /**
   * 设置搜索模式
   * @param mode - 搜索模式（keyword/image/ai）
   */
  setSearchMode(mode: SearchMode): void;

  /**
   * 获取当前搜索模式
   * @returns 搜索模式
   */
  getSearchMode(): SearchMode;

  /**
   * 获取布局设计图片
   * @param seekId - 商品ID
   * @param categoryId - 分类ID
   * @returns 图片URL Promise
   */
  getLayoutDesignImage: (seekId: string, categoryId: string) => Promise<string>;

  /**
   * 获取功能更新提示
   * @param config - 提示配置
   * @returns 提示数据Promise
   */
  getFunctionUpdateTip: (config: unknown) => Promise<unknown>;
}