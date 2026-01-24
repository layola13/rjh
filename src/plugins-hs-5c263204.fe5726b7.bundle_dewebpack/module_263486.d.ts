/**
 * 反馈查询数据管理器
 * 用于处理和管理反馈相关的查询参数数据
 */

/**
 * 查询参数输入配置
 */
export interface QueryParamsInput {
  /** 模块标识 */
  module?: string;
  /** 产品类型 */
  productType?: string;
  /** 模型标识 */
  model?: string;
}

/**
 * 模型对象结构
 */
export interface ModelObject {
  /** 模型文本描述 */
  text: string;
  /** 模型值 */
  value: string;
}

/**
 * 查询参数返回数据
 */
export interface QueryParamsData {
  /** 环境ID */
  env: string;
  /** 模块标识 */
  module?: string;
  /** 模型对象 */
  modelObj: ModelObject;
}

/**
 * 内部处理上下文
 */
interface ProcessingContext {
  /** 环境ID */
  env: string;
  /** 模块标识 */
  module?: string;
  /** 模型对象 */
  modelObj: ModelObject;
  /** 当前选中的项 */
  selected?: unknown;
  /** 产品类型 */
  productType?: string;
  /** 模型标识 */
  model?: string;
}

/**
 * 反馈数据处理函数
 */
export type FeedbackDataHandler = (context: ProcessingContext) => Partial<QueryParamsData> | void;

/**
 * 反馈数据回调函数
 */
export type FeedbackDataCallback = (context: ProcessingContext) => void;

/**
 * 反馈数据处理项
 */
export interface FeedbackDataItem {
  /** 唯一标识符 */
  id: string | number;
  /** 处理函数 */
  fn: FeedbackDataHandler;
  /** 可选的回调函数 */
  callback?: FeedbackDataCallback;
  /** 排序优先级（用于insertSort） */
  priority?: number;
}

/**
 * 反馈查询数据管理器类
 * 负责管理和处理反馈查询相关的数据项
 */
export default class FeedbackQueryDataManager {
  /** 内部数据处理项数组 */
  private _arr: FeedbackDataItem[];

  /**
   * 构造函数
   * 初始化数据处理项数组
   */
  constructor();

  /**
   * 获取查询参数数据
   * 遍历所有处理项，依次执行处理函数并合并结果
   * 
   * @param input - 查询参数输入配置
   * @returns 处理后的查询参数数据
   */
  getQueryParamsData(input: QueryParamsInput): QueryParamsData;

  /**
   * 添加反馈数据处理项
   * 如果ID已存在则不重复添加，添加后自动排序
   * 
   * @param item - 要添加的反馈数据处理项
   */
  addHandlingFeedbackEntryDataItem(item: FeedbackDataItem): void;

  /**
   * 删除反馈数据处理项
   * 根据ID删除对应的处理项
   * 
   * @param id - 要删除的处理项ID
   */
  deleteFeedbackEntryDataItem(id: string | number): void;

  /**
   * 获取所有反馈数据处理项
   * 
   * @returns 当前所有的数据处理项数组
   */
  getHandlingFeedbackEntryDataItem(): FeedbackDataItem[];
}