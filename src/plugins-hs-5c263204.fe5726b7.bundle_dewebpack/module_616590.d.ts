/**
 * Feedback Plugin - 用户反馈系统插件
 * 提供反馈入口、反馈列表、反馈统计等功能
 */

/**
 * 反馈样式配置
 */
export interface FeedbackStyleConfig {
  /** 是否为黑色主题 */
  isBlack: boolean;
  /** 反馈类型：normal-普通模式 */
  type: 'normal' | string;
}

/**
 * 模型信息
 */
export interface ModelInfo {
  /** 模型名称 */
  name?: string;
  /** 模型ID */
  id?: string;
}

/**
 * 组合模型配置
 */
export interface TpzzModelConfig {
  /** 是否需要更新 */
  tpzzModelNeedUpdate: boolean;
  /** 模型名称 */
  name?: string;
  /** 模型ID */
  id?: string;
}

/**
 * 反馈入口显示选项
 */
export interface ShowFeedbackEntryOptions {
  /** 样式配置 */
  style?: Partial<FeedbackStyleConfig>;
  /** 模块名称 */
  module?: string;
  /** 网站类型，默认'3d' */
  webSite?: string;
  /** 模型信息 */
  model?: ModelInfo;
  /** 产品类型 */
  productType?: string;
  /** 组合模型是否需要更新 */
  tpzzModelNeedUpdate?: boolean;
  /** 预设值列表 */
  valueList?: Array<{
    name: string;
    data: unknown;
  }>;
  /** 默认值列表 */
  defaultValueList?: Array<{
    type: string;
    value: unknown;
  }>;
  /** 是否记录日志 */
  isLog?: boolean;
}

/**
 * 插件初始化配置
 */
export interface FeedbackPluginInitConfig {
  /** 应用实例 */
  app: unknown;
  /** 反馈记录数信号 */
  signalFeedbackRecordCountNumber?: {
    dispatch(data: { countNumber: number }): void;
  };
  /** 插件依赖项 */
  dependencies: {
    [key: string]: unknown;
  };
}

/**
 * 反馈统计数据
 */
export interface FeedbackStatistics {
  /** 统计项名称 */
  name: string;
  /** 统计数量 */
  count: number;
}

/**
 * 反馈列表数据
 */
export interface FeedbackListData {
  /** 数据源 */
  dataSource: unknown[];
  /** 总数 */
  total: number;
}

/**
 * 反馈数据处理器接口
 */
export interface FeedbackDataHandler {
  /** 添加处理项 */
  addHandlingFeedbackEntryDataItem(item: unknown): void;
  /** 删除处理项 */
  deleteFeedbackEntryDataItem(name: string): void;
  /** 获取处理项 */
  getHandlingFeedbackEntryDataItem(): unknown;
}

/**
 * 提交数据处理器接口
 */
export interface SubmitDataHandler {
  /** 添加提交数据处理项 */
  addSubmitDataHandleItem(item: unknown): void;
  /** 删除提交数据处理项 */
  deleteSubmitDataHandleItem(name: string): void;
  /** 获取提交数据处理项 */
  getSubmitDataHandleItem(): unknown;
  /** 表单数据适配器 */
  formDataAdapter(params: {
    formData: unknown;
    webSite: string;
    module: string;
  }): Promise<unknown>;
}

/**
 * 查询数据处理器接口
 */
export interface QueryDataHandler extends FeedbackDataHandler {
  /** 获取查询参数数据 */
  getQueryParamsData(params: {
    module: string;
    productType?: string;
    model?: ModelInfo;
  }): {
    module: string;
    env: string;
    modelObj: { value?: string };
  };
}

/**
 * 反馈插件类
 * 负责管理用户反馈功能，包括反馈入口、列表展示、数据提交等
 */
export default class FeedbackPlugin {
  /** 页面头部插件实例 */
  pageHeaderPlugin: unknown;
  
  /** 指标插件实例 */
  metricsPlugin: unknown;
  
  /** 反馈入口弹窗是否可见 */
  feedbackEntryModalVisible: boolean;
  
  /** 通知处理器 */
  private _notificationHandler: unknown;
  
  /** 当前模块名称 */
  module: string;
  
  /** 网站类型，默认'3d' */
  webSite: string;
  
  /** 样式配置 */
  style: FeedbackStyleConfig;
  
  /** 应用实例 */
  app: unknown;
  
  /** 是否启用包含视频复选框 */
  enableIncludeVideoCheckbox: boolean;
  
  /** 反馈记录数信号 */
  private _signalFeedbackRecordCountNumber?: {
    dispatch(data: { countNumber: number }): void;
  };
  
  /** 反馈记录计数 */
  private _countNumber: number;
  
  /** 查询反馈数据处理器 */
  private _queryFeedbackDataHandler: QueryDataHandler;
  
  /** 提交反馈数据处理器 */
  private _submitFeedbackDataHandler: SubmitDataHandler;
  
  /** 语言映射表 */
  languageMap: Record<string, unknown> | null;

  /**
   * 初始化插件
   * @param config 初始化配置
   */
  init(config: FeedbackPluginInitConfig): void;

  /**
   * 初始化语言资源
   * 根据租户类型加载对应的语言包
   */
  initLanguage(): Promise<void>;

  /**
   * 初始化IPC事件监听
   * 监听Electron进程间通信，控制视频复选框显示
   */
  initIpcEvents(): void;

  /**
   * 反馈入口数据适配器
   * 将配置数据转换为UI所需的数据格式
   * @param entries 配置项数组
   * @param context 上下文信息
   * @returns 适配后的数据数组
   */
  entryDataAdapter(
    entries: Array<{
      show: boolean;
      type: string;
      name: string;
      displayName: string;
      required: boolean;
      options?: Array<{
        optionCode: string;
        optionName: string;
      }>;
    }>,
    context: { tpzzModel: TpzzModelConfig }
  ): unknown[];

  /**
   * 翻译语言
   * 根据语言映射表翻译数据标签
   * @param data 需要翻译的数据
   */
  translateLanguage(data: unknown[]): void;

  /**
   * 显示反馈入口弹窗
   * @param options 显示选项
   */
  showFeedbackEntry(options?: ShowFeedbackEntryOptions): void;

  /**
   * 显示反馈列表弹窗
   * @param style 样式配置
   */
  showFeedbackList(style?: Partial<FeedbackStyleConfig>): void;

  /**
   * 调整图片尺寸
   * 使用OSS处理参数生成缩略图URL
   * @param url 原始图片URL
   * @param width 目标宽度
   * @param height 目标高度
   * @returns 处理后的图片URL
   */
  resizeImage(url: string, width: number, height: number): string;

  /**
   * 显示图片轮播
   * @param images 图片URL数组
   */
  showCarousel(images: string[]): void;

  /**
   * 导航到反馈入口
   * 从列表页跳转到反馈入口页
   */
  handleNavToFeedbackEntry(): void;

  /**
   * 导航到反馈列表
   * 从入口页跳转到列表页
   */
  handleNavtoFeedbackList(): void;

  /**
   * 关闭反馈入口弹窗
   */
  closeFeedbackEntry(): void;

  /**
   * 关闭反馈列表弹窗
   */
  closeFeedbackList(): void;

  /**
   * 提交反馈数据
   * @param formData 表单数据
   * @returns 提交是否成功
   */
  submitFeedback(formData: unknown): Promise<boolean>;

  /**
   * 获取反馈统计数据
   * @returns 统计数据数组
   */
  getStatistics(): Promise<FeedbackStatistics[]>;

  /**
   * 获取反馈列表
   * @param page 页码
   * @param limit 每页数量，默认为配置的限制数
   * @returns 反馈列表数据
   */
  getFeedbackList(page: number, limit?: number): Promise<FeedbackListData>;

  /**
   * 标记回复为已读
   * @param feedbackId 反馈ID
   * @returns 操作结果
   */
  onReadReply(feedbackId: string): Promise<unknown>;

  /**
   * 注入工具栏按钮
   * 在页面头部工具栏添加反馈相关按钮
   */
  injectToolbar(): void;

  /**
   * 更新反馈记录数
   * 从服务器获取最新的未读反馈数
   */
  updateFeedbackRecordCountNumber(): void;

  /**
   * 设置帮助中心反馈记录数据
   * @param data 反馈记录数据
   */
  setHelpCenterFeedbackRecordData(data: { countNumber: number }): void;

  /**
   * 设置反馈记录数
   * 更新UI显示的反馈记录数量
   * @param count 记录数
   */
  setFeedbackRecordCountNumber(count: number): void;

  /**
   * 内部设置计数
   * @param count 计数值，默认0
   */
  private _setCountNumber(count?: number): void;

  /**
   * 获取当前反馈记录数
   * @returns 记录数
   */
  getCountNumber(): number;

  /**
   * 添加反馈入口数据处理项
   * @param item 处理项
   */
  addHandlingFeedbackEntryDataItem(item: unknown): void;

  /**
   * 删除反馈入口数据处理项
   * @param name 处理项名称
   */
  deleteFeedbackEntryDataItem(name: string): void;

  /**
   * 获取反馈入口数据处理项
   * @returns 处理项
   */
  getHandlingFeedbackEntryDataItem(): unknown;

  /**
   * 添加提交数据处理项
   * @param item 处理项
   */
  addSubmitDataHandleItem(item: unknown): void;

  /**
   * 删除提交数据处理项
   * @param name 处理项名称
   */
  deleteSubmitDataHandleItem(name: string): void;

  /**
   * 获取提交数据处理项
   * @returns 处理项
   */
  getSubmitDataHandleItem(): unknown;
}