/**
 * Catalog Library Tracking Module
 * 目录库追踪模块 - 用于追踪产品目录相关的用户行为事件
 */

/**
 * 目录事件类型枚举
 * Catalog event type enumeration
 */
export enum CatalogEventEnum {
  /** 点击更多佣金按钮 - Click more commission button */
  eClickCommiss = "click_more_commission_button",
  
  /** 悬停佣金标签 - Hover commission tag */
  eHoverCommiss = "hover_commission_tag",
  
  /** 使用模型事件 - Use model event */
  eUseModel = "catalog_darg_product_event",
  
  /** 搜索事件 - Search event */
  eSearch = "catalog_search_event",
  
  /** 筛选事件 - Filter event */
  eFilter = "catalog_filter_event",
  
  /** 搜索框搜索事件 - Search box search event */
  eSearchBox = "leftPanel_searchBtn_search_event",
  
  /** 搜索提示事件 - Search suggestion hint event */
  eHint = "search_suggestion_hint_event",
  
  /** 图片搜索事件 - Image search event */
  imageSearch = "catalog_search_by_image_event",
  
  /** 图片重新框选事件 - Image reframe event */
  imageReframe = "image_search_reframe_event",
  
  /** 图片分类搜索事件 - Image category search event */
  imageCateSearch = "image_search_event",
  
  /** 按创建时间排序 - Sort by creation time */
  sortNew = "catalog_sort_name_create_event",
  
  /** 默认排序 - Default sort */
  sortDefault = "catalog_sort_name_default_event",
  
  /** 大图视图 - Large view */
  catalogLargeView = "catalog_large_view_event"
}

/**
 * 销售信息接口
 * Sale information interface
 */
export interface SaleInfo {
  [key: string]: unknown;
}

/**
 * 追踪使用模型时的参数
 * Parameters for tracking model usage
 */
export interface TrackUseModelParams {
  /** 模型ID - Model ID */
  id: string;
  
  /** 页码 - Page number */
  page: number;
  
  /** 索引位置 - Index position */
  index: number;
  
  /** 内容类型 - Content type */
  contentType?: {
    isTypeOf(type: string): boolean;
  };
  
  /** 请求ID - Request ID */
  requestId?: string;
  
  /** 追踪ID列表 - Trace IDs */
  traceIds?: string[];
  
  /** 付费索引标识 - Pay index flag */
  payIndexFlag?: boolean;
  
  /** 销售信息 - Sale information */
  saleInfo?: SaleInfo;
}

/**
 * 追踪使用模型的选项
 * Options for tracking model usage
 */
export interface TrackUseModelOptions {
  /** 搜索文本 - Search text */
  text?: string;
  
  /** 是否图片搜索 - Is image search */
  imageSearch?: boolean;
  
  /** 树节点ID - Tree node ID */
  treeId?: string;
  
  /** 模型ID - Model ID */
  modelId?: string;
  
  /** 搜索状态 - Search status */
  searchStatus?: string;
}

/**
 * 目录日志数据缓存接口
 * Catalog log data cache interface
 */
export interface CatalogLogData {
  /** 子菜单数据 - Sub menu data */
  subMenuData?: unknown;
  
  /** 分类ID - Category ID */
  categoryId?: string;
  
  /** 名称 - Name */
  name?: string;
  
  /** 选中路径 - Selected path */
  selectedPath?: string;
  
  /** 搜索类型 - Search type */
  searchType?: string;
  
  /** 日志类型 - Log type */
  logType?: string;
  
  /** 目标类型 - Target type */
  targetType?: string;
  
  /** ID */
  id?: string;
  
  /** 页码 - Page number */
  pageNum?: number;
  
  /** 位置 - Position */
  pos?: number;
  
  /** 搜索状态 - Search status */
  searchStatus?: string;
  
  /** 追踪ID列表 - Trace IDs */
  traceIds?: string[];
  
  /** 付费索引标识 - Pay index flag */
  payIndexFlag?: boolean;
  
  /** 销售信息 - Sale information */
  saleInfo?: SaleInfo;
  
  /** 其他额外参数 - Additional parameters */
  [key: string]: unknown;
}

/**
 * 基础追踪参数
 * Base tracking parameters
 */
export interface BaseTrackParams {
  /** 设计ID - Design ID */
  designID?: string;
  
  /** 环境 - Environment */
  env?: string;
  
  /** 界面环境ID - Interface environment ID */
  IF_env?: string;
  
  /** 用户ID - User ID */
  uid?: string;
  
  /** 时间戳 - Timestamp */
  timestamp?: number;
  
  /** 其他自定义参数 - Other custom parameters */
  [key: string]: unknown;
}

/**
 * 用户追踪日志参数
 * User track logger parameters
 */
export interface UserTrackLoggerParams {
  /** 参数信息 - Argument information */
  argInfo?: CatalogLogData;
  
  /** 其他参数 - Other parameters */
  [key: string]: unknown;
}

/**
 * 目录库追踪类
 * Catalog library tracking class - Singleton pattern for tracking catalog-related user events
 */
export default class CatalogLibTrack {
  /** 单例实例 - Singleton instance */
  private static instance?: CatalogLibTrack;
  
  /** 事件枚举 - Event enumeration */
  static readonly eventEnum: typeof CatalogEventEnum;
  
  /** 缓存的日志数据 - Cached log data */
  private cacheLogData: CatalogLogData;
  
  /**
   * 构造函数 (私有)
   * Private constructor
   */
  private constructor();
  
  /**
   * 获取单例实例
   * Get singleton instance
   * @returns CatalogLibTrack 实例 - CatalogLibTrack instance
   */
  static getInstance(): CatalogLibTrack;
  
  /**
   * 目录库事件追踪
   * Catalog library event tracking
   * @param eventName - 事件名称 - Event name
   * @param params - 追踪参数 - Tracking parameters
   * @param eventGroup - 事件组 (可选) - Event group (optional)
   */
  catalogLibTrack(
    eventName: string,
    params?: BaseTrackParams,
    eventGroup?: string
  ): void;
  
  /**
   * 追踪使用模型事件
   * Track model usage event
   * @param params - 模型参数 - Model parameters
   * @param options - 追踪选项 - Tracking options
   */
  trackUseModel(
    params: TrackUseModelParams,
    options: TrackUseModelOptions
  ): void;
  
  /**
   * 发送目录信号到日志
   * Send catalog signal to log
   * @param data - 日志数据 - Log data
   */
  signalCatalogToLog(data: CatalogLogData): void;
  
  /**
   * 设置缓存键值
   * Set cache key-value pair
   * @param key - 键名 - Key name
   * @param value - 值 - Value
   */
  setKey(key: string, value: unknown): void;
  
  /**
   * 缓存目录日志数据
   * Cache catalog log data
   * @param data - 原始数据 - Original data
   * @param keys - 需要缓存的键数组 - Keys to cache
   * @returns 合并后的日志数据 - Merged log data
   */
  cacheCatalogLogData(
    data: CatalogLogData,
    keys: string[]
  ): CatalogLogData;
  
  /**
   * 发送目录信号到用户追踪日志器
   * Send catalog signal to user track logger
   * @param params - 用户追踪参数 - User tracking parameters
   */
  signalCatalogToUserTrackLogger(params: UserTrackLoggerParams): void;
}

/**
 * 导出事件枚举
 * Export event enumeration
 */
export { CatalogEventEnum as eventEnum };