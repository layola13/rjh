/**
 * 反馈查询数据处理器配置
 */

/**
 * 模型对象接口
 */
interface ModelObject {
  /** 模型显示文本 */
  text: string;
  /** 模型唯一标识 */
  value: string;
}

/**
 * 元数据接口
 */
interface Metadata {
  /** 模型ID */
  id: string;
  /** 模型名称 */
  name: string;
  /** 产品类型: "2D" | "3D" */
  productType: string;
}

/**
 * 选中项接口
 */
interface SelectedItem {
  /** 元数据信息 */
  metadata?: Metadata;
}

/**
 * 模型信息接口
 */
interface ModelInfo {
  /** 模型ID */
  id?: string;
  /** 模型名称 */
  name?: string;
}

/**
 * 函数参数接口
 */
interface FunctionContext {
  /** 模型信息 */
  model?: ModelInfo;
  /** 当前选中项 */
  selected?: SelectedItem;
}

/**
 * 图册环境返回结果
 */
interface ImageBrowserResult {
  selected: undefined;
}

/**
 * 模型环境返回结果
 */
interface ModelResult {
  /** 模型对象 */
  modelObj: ModelObject;
  /** 模块类型 */
  module?: string;
  /** 环境类型 */
  env?: string;
  /** 选中项 */
  selected?: undefined;
}

/**
 * 反馈查询数据项接口
 */
interface FeedbackQueryDataItem {
  /** 处理器唯一标识 */
  id: string;
  /** 处理函数 */
  fn: (context?: FunctionContext) => ImageBrowserResult | ModelResult | undefined;
  /** 执行顺序，数值越小优先级越高 */
  order: number;
  /** 处理器名称 */
  name: string;
}

/**
 * 反馈查询数据处理器数组
 * 用于按优先级顺序处理反馈数据
 */
export declare const handleFeedbackQueryDataArr: FeedbackQueryDataItem[];