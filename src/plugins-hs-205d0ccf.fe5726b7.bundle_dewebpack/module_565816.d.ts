/**
 * 产品推荐请求参数接口
 */
interface RecommendRequestParams {
  /** 设计ID */
  designId: string;
  /** 其他模型ID列表 */
  otherModelIds: string[];
  /** 房间属性 */
  roomsAttribute: string;
  /** 当前选中的模型ID */
  selectedModelId: string;
  /** 分页偏移量 */
  offset: number;
  /** 每页数量限制 */
  limit: number;
  /** 请求唯一标识 */
  requestId?: string;
}

/**
 * 分面搜索结果接口
 */
interface FacetResults {
  /** 增强的二级分类数据 */
  CategoryLevelTwoEnhance?: unknown[];
}

/**
 * 产品项接口
 */
interface ProductItem {
  /** 产品ID */
  id: string;
  [key: string]: unknown;
}

/**
 * 推荐数据响应接口
 */
interface RecommendData {
  /** 产品项列表 */
  items: ProductItem[];
  /** 分面搜索结果 */
  facetResults?: FacetResults;
  /** 是否已获取所有数据 */
  hasGetAllItems?: boolean;
  /** 当前偏移量 */
  offset: number;
  /** 当前限制数量 */
  limit: number;
}

/**
 * 存储键配置接口
 */
interface StorageKeyConfig {
  designId: string;
  otherModelIds: string[];
  roomsAttribute: string;
  selectedModelId: string;
}

/**
 * 搜索请求数据接口
 */
interface SearchRequestData {
  data: RecommendRequestParams;
}

/**
 * 搜索响应接口
 */
interface SearchResponse {
  data?: RecommendData;
}

/**
 * 事件追踪参数接口
 */
interface EventTrackParams {
  /** 用户ID */
  uid: string;
  /** 页面大小 */
  pageSize: number;
  /** 请求ID */
  requestId: string;
  /** 模型ID */
  modelId: string;
  /** 产品ID列表 */
  productList: string[];
  /** 当前环境 */
  env: string;
  /** 时间戳 */
  timestamp: number;
}

/**
 * 产品推荐管理器类
 * 负责管理产品推荐数据的获取、缓存和事件追踪
 */
declare class ProductRecommendationManager {
  /**
   * 推荐数据存储缓存
   * @private
   */
  private storage: Map<number, RecommendData>;

  /**
   * 产品构建器实例
   * @private
   */
  private builder: unknown;

  /**
   * 默认分页限制
   * @private
   */
  private defaultLimit: number;

  /**
   * 请求挂起状态标志
   * @private
   */
  private pending: boolean;

  /**
   * 当前运行环境
   * @private
   */
  private currentEnv: string;

  /**
   * 构造函数
   * 初始化存储、构建器和默认配置
   */
  constructor();

  /**
   * 处理分面过滤结果
   * @param data - 包含分面结果的数据对象
   * @returns 二级分类增强数据数组
   * @private
   */
  private processFilters(data: { facetResults?: FacetResults }): unknown[];

  /**
   * 从缓存中获取推荐数据
   * @param params - 推荐请求参数
   * @returns 缓存的推荐数据，不存在则返回undefined
   */
  getRecommendStorage(params: RecommendRequestParams): RecommendData | undefined;

  /**
   * 设置推荐数据到缓存
   * @param params - 推荐请求参数
   * @param data - 推荐响应数据
   */
  setRecommendStorage(params: RecommendRequestParams, data: RecommendData): void;

  /**
   * 根据请求参数生成缓存键
   * 使用简单哈希算法生成唯一数字键
   * @param params - 推荐请求参数
   * @returns 生成的哈希键
   * @private
   */
  private getKey(params: RecommendRequestParams): number;

  /**
   * 获取当前运行环境
   * 从URL查询参数中获取环境标识，默认为"shejijia"
   * @returns 当前环境字符串
   * @private
   */
  private getCurrentEnv(): string;

  /**
   * 调用搜索API获取模型推荐列表
   * @param params - 推荐请求参数
   * @returns Promise，解析为推荐数据
   * @private
   */
  private getList(params: RecommendRequestParams): Promise<RecommendData | undefined>;

  /**
   * 获取产品推荐数据（包含数据库处理）
   * @param params - 推荐请求参数
   * @returns Promise，解析为处理后的推荐数据
   * @private
   */
  private getData(params: RecommendRequestParams): Promise<RecommendData>;

  /**
   * 获取产品推荐数据（公共方法）
   * 优先从缓存获取，缓存不存在则从API获取并触发事件追踪
   * @param params - 推荐请求参数
   * @returns Promise，解析为推荐数据
   */
  getProductData(params: RecommendRequestParams): Promise<RecommendData>;
}

export default ProductRecommendationManager;