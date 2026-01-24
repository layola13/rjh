/**
 * 收藏夹插件类型声明
 * 负责管理用户收藏的模型、主题、模板和商家等内容
 */

/**
 * 收藏夹插件依赖配置
 */
export interface FavoritesPluginDependencies {
  'hsw.plugin.signin.Plugin': SigninPlugin;
}

/**
 * 插件初始化配置
 */
export interface PluginInitConfig {
  dependencies: FavoritesPluginDependencies;
}

/**
 * 收藏项配置
 */
export interface FavoriteItemConfig {
  /** 收藏项唯一标识 */
  seekId: string;
  /** 分类ID */
  categoryId?: string;
  /** 项目ID */
  itemId?: string;
  /** 收藏夹ID */
  fid?: string;
  /** 收藏类型 */
  type?: string;
}

/**
 * 自定义收藏数据
 */
export interface CustomFavoriteData {
  [key: string]: unknown;
}

/**
 * 收藏ID列表响应
 */
export interface FavoriteIdsResponse {
  /** 收藏项ID数组 */
  items: string[];
  /** 其他响应数据 */
  [key: string]: unknown;
}

/**
 * 收藏主题文件夹ID响应
 */
export interface FavoriteTopicFolderIdResponse {
  data?: {
    result?: Array<{
      favoritesId: string;
    }>;
  };
  [key: string]: unknown;
}

/**
 * 收藏主题ID列表响应
 */
export interface FavoriteTopicIdsResponse {
  data?: {
    items?: string[];
  };
  [key: string]: unknown;
}

/**
 * 主题收藏操作参数
 */
export interface TopicFavoriteParams {
  /** 来源ID */
  sourceId: string;
  /** 收藏类型 */
  favoritesType?: number;
  /** 收藏夹ID */
  favoritesId?: string;
}

/**
 * 批量移动主题收藏参数
 */
export interface TopicFavBatchMoveParams {
  /** 来源ID列表 */
  sourceIdList?: string[];
  [key: string]: unknown;
}

/**
 * 弹窗回调结果
 */
export interface PopupCallbackResult {
  status: 'success' | 'error';
  data?: unknown;
}

/**
 * 弹窗组件属性
 */
export interface PopupGroupPanelProps {
  className: string;
  showPopup: boolean;
  seekId: string;
  entityName?: string;
  showEditName?: boolean;
  type?: string;
  onSubmitCallback: (data: unknown) => void;
  onCancelCallback: (error: unknown) => void;
}

/**
 * 模板收藏参数
 */
export interface TemplateFavoriteParams {
  /** 来源ID */
  sourceId: string;
  /** 收藏类型 */
  favoritesType: number;
  /** 是否已收藏 */
  isFavorite?: boolean;
  /** 收藏夹ID */
  favoritesId?: string;
}

/**
 * 模板收藏操作结果
 */
export interface TemplateFavoriteResult {
  /** 操作是否成功 */
  isSucceed: boolean;
  /** 收藏夹ID */
  favoritesId?: string;
  /** 其他响应数据 */
  [key: string]: unknown;
}

/**
 * 模板收藏映射数据
 */
export interface TemplateFavoriteMapValue {
  favoritesId: string;
}

/**
 * 商家收藏夹ID参数
 */
export interface MerchantFolderIdParams {
  data: {
    whetherDefault: number;
  };
}

/**
 * 商家收藏ID获取参数
 */
export interface FetchFavMerchantIdsParams {
  data: {
    favoritesId: string;
    pageNum: number;
    limit: number;
  };
}

/**
 * 商家收藏ID响应
 */
export interface FetchFavMerchantIdsResponse {
  model?: {
    items: string[];
    total: number;
  };
}

/**
 * 商家收藏操作参数
 */
export interface MerchantFavoriteParams {
  /** 商家ID */
  shopId: string;
  /** 收藏夹ID */
  favoritesId?: string;
}

/**
 * 上传模型配置
 */
export interface UploaderModelConfig {
  [key: string]: unknown;
}

/**
 * 收藏夹插件默认导出类
 */
export default class FavoritesPlugin {
  /** 登录插件实例 */
  private signinPlugin: SigninPlugin;

  /** 收藏的模型ID集合 */
  private favoritesData: Set<string>;

  /** 收藏的主题ID集合 */
  private favoritesTopicData: Set<string>;

  /** 收藏主题文件夹ID */
  private favoritesTopicFolderId: string;

  /** 获取收藏ID列表的Promise */
  private _promiseGetFavoriteIds?: Promise<FavoriteIdsResponse>;

  /** 获取用户收藏的Promise */
  private _promiseGetFavoritesByUser?: Promise<unknown>;

  /** 获取收藏主题ID列表的Promise */
  private _promiseGetFavoriteTopicIds?: Promise<FavoriteTopicIdsResponse>;

  /** 获取收藏主题文件夹ID的Promise */
  private _promiseGetFavoritesTopicFolderId?: Promise<string>;

  /** 旧配置缓存 */
  private _oldConfig: Record<string, unknown>;

  /** 信号钩子 */
  private signalHook: HSCore.Util.SignalHook;

  /** 收藏容器组件 */
  private favContainer: unknown;

  /** 收藏主题容器组件 */
  private favTopicContainer: unknown;

  /** 收藏分组容器组件 */
  private favGroupContainer: unknown;

  /** 应用目录API管理器 */
  private appCatalogApiManager: HSApp.Catalog.BaseApiManager;

  /** 所有商家收藏ID列表 */
  private allMerchantFavIds: string[];

  /** 商家收藏ID是否已初始化 */
  private isMerchantFavIdsInitialized: boolean;

  /** 自定义收藏数据 */
  private customFavData: CustomFavoriteData;

  /** 上传器实例 */
  private uploader: _.Uploader;

  /** 模板收藏映射表 */
  private _templateFavoriteMap: Map<string, TemplateFavoriteMapValue>;

  /**
   * 初始化插件
   * @param config - 插件配置
   */
  init(config: PluginInitConfig): void;

  /**
   * 获取原始分组数据
   */
  getOriginGroupData(): void;

  /**
   * 初始化收藏夹功能
   * 监听登录、登出事件，更新收藏数据
   */
  private _favoriteInit(): void;

  /**
   * 获取Redux Store
   */
  getStore(): unknown;

  /**
   * 获取分组面板
   */
  getGroupPanel(): unknown;

  /**
   * 获取分组列表面板
   */
  getGroupListPanel(): unknown;

  /**
   * 获取收藏ID列表
   * @param event - 事件对象
   * @param forceRefresh - 是否强制刷新
   * @returns 收藏ID列表Promise
   */
  getFavoriteIds(event?: { data: CustomFavoriteData }, forceRefresh?: boolean): Promise<FavoriteIdsResponse | string>;

  /**
   * 获取收藏主题ID列表
   * @returns Promise
   */
  getFavoriteTopicIds(): Promise<string | void>;

  /**
   * 获取收藏主题ID列表（内部方法）
   * @param folderId - 文件夹ID
   * @returns Promise
   */
  getFavTopidIds(folderId: string): Promise<FavoriteTopicIdsResponse | unknown>;

  /**
   * 获取收藏主题文件夹ID
   * @returns 文件夹ID Promise
   */
  getFavoriteTopicFolderId(): Promise<string>;

  /**
   * 获取用户收藏的产品
   * @returns 收藏产品列表Promise
   */
  getFavoritesByUser(): Promise<unknown>;

  /**
   * 添加收藏
   * @param seekId - 模型唯一标识
   * @param categoryId - 分类ID
   * @param folderId - 文件夹ID
   * @param type - 收藏类型
   * @returns 收藏数据集合Promise
   */
  addFavorite(seekId: string, categoryId?: string, folderId?: string, type?: string): Promise<Set<string> | string>;

  /**
   * 添加收藏主题
   * @param sourceId - 来源ID
   * @returns Promise
   */
  addFavoritesTopic(sourceId: number): Promise<unknown>;

  /**
   * 删除收藏主题
   * @param params - 删除参数
   * @returns Promise
   */
  deleteFavoritesTopic(params: TopicFavoriteParams): Promise<unknown>;

  /**
   * 请求所有分组项
   * @param params - 请求参数
   * @returns Promise
   */
  requestAllGroupItems(params: unknown): Promise<unknown>;

  /**
   * 移除收藏
   * @param seekId - 模型唯一标识
   * @returns Promise
   */
  removeFavorite(seekId: string): Promise<Set<string> | string>;

  /**
   * 更新收藏信息
   * @param params - 更新参数
   * @returns Promise
   */
  updateFavorite(params: unknown): Promise<unknown>;

  /**
   * 批量移动主题收藏
   * @param params - 批量移动参数
   * @returns Promise
   */
  topicFavBatchMove(params: TopicFavBatchMoveParams): Promise<unknown>;

  /**
   * 显示收藏分组弹窗
   * @param seekId - 模型唯一标识
   * @param showEditName - 是否显示编辑名称
   * @param entityName - 实体名称
   * @param type - 类型
   * @returns Promise
   */
  showPopupGroupPanel(seekId: string, showEditName?: boolean, entityName?: string, type?: string): Promise<PopupCallbackResult>;

  /**
   * 隐藏收藏分组弹窗
   */
  hiddenPopupGroupPanel(): void;

  /**
   * 检查配置是否重复
   * @param config - 配置对象
   * @returns 是否重复
   */
  checkIfRepeatConfig(config: Record<string, unknown>): boolean;

  /**
   * 清理资源
   */
  cleanup(): void;

  /**
   * 监听分组面板隐藏事件
   */
  private _listenGroupPanelHide(): void;

  /**
   * 添加模板收藏
   * @param params - 模板收藏参数
   * @returns 操作结果Promise
   */
  addTemplateFavorite(params: TemplateFavoriteParams): Promise<TemplateFavoriteResult>;

  /**
   * 移除模板收藏
   * @param params - 模板收藏参数
   * @returns 操作结果Promise
   */
  removeTemplateFavorite(params: TemplateFavoriteParams): Promise<TemplateFavoriteResult>;

  /**
   * 重置模板收藏映射表
   */
  resetTemplateFavoriteMap(): void;

  /**
   * 改变模板收藏状态
   * @param params - 模板收藏参数
   * @returns 操作结果Promise
   */
  changeTemplateFavoriteStatus(params: TemplateFavoriteParams): Promise<TemplateFavoriteResult>;

  /**
   * 获取模板收藏ID
   * @param sourceId - 来源ID
   * @returns 收藏夹ID或undefined
   */
  getTemplateFavoriteId(sourceId: string): string | undefined;

  /**
   * 初始化商家收藏ID列表
   */
  initMerchantFavIds(): void;

  /**
   * 获取收藏ID列表
   * @returns 收藏ID数组Promise
   */
  getFavIds(): Promise<string[]>;

  /**
   * 获取所有收藏ID
   * @param folderId - 文件夹ID
   * @returns 收藏ID数组Promise
   */
  fetchAllFavIds(folderId: string): Promise<string[]>;

  /**
   * 处理商家收藏
   * @param shopId - 商家ID
   * @param isFavorited - 是否已收藏
   * @param area - 区域标识
   */
  handleMerchantFav(shopId: string, isFavorited: boolean, area: string): void;

  /**
   * 设置自定义收藏数据
   * @param data - 自定义数据
   */
  setCustomFavData(data: CustomFavoriteData): void;

  /**
   * 获取自定义收藏数据
   * @returns 自定义数据
   */
  getCustomFavData(): CustomFavoriteData | undefined;

  /**
   * 上传带材质的模型
   * @param config - 上传配置
   */
  uploaderModelWithMaterial(config: UploaderModelConfig): void;
}