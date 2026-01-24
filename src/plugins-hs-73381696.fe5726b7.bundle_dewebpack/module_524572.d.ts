/**
 * 持久化插件错误监听器配置
 * 用于监听保存失败和自动保存失败事件，并生成相应的错误报告
 */

/**
 * 编辑器实例接口
 */
interface EditorInstance {
  /** 插件管理器 */
  pluginManager: PluginManager;
}

/**
 * 插件管理器接口
 */
interface PluginManager {
  /**
   * 获取指定类型的插件实例
   * @param pluginType - 插件类型
   */
  getPlugin(pluginType: string): PersistencePlugin;
}

/**
 * 持久化插件接口
 */
interface PersistencePlugin {
  /** 保存失败信号 */
  signalSaveFailed: Signal;
  /** 自动保存失败信号 */
  signalAutoSaveFailed: Signal;
}

/**
 * 信号类型（事件发射器）
 */
type Signal = unknown;

/**
 * 监听器事件数据
 */
interface ListenerEventData {
  /** 事件数据载荷 */
  data?: SaveFailedData | AutoSaveFailedData;
}

/**
 * 保存失败数据
 */
interface SaveFailedData {
  /** 错误对象 */
  error?: ErrorLike;
  /** 保存类型 */
  saveType?: string;
  /** 保存返回数据 */
  saveReturnData?: unknown;
}

/**
 * 自动保存失败数据
 */
interface AutoSaveFailedData {
  /** 错误对象 */
  error?: ErrorLike;
  /** 保存返回数据 */
  saveReturnData?: unknown;
}

/**
 * 错误类型联合
 */
type ErrorLike = Error | ErrorObject | string | number | Record<string, unknown>;

/**
 * 结构化错误对象
 */
interface ErrorObject {
  /** 原始错误 */
  originError?: Error;
  /** 其他错误属性 */
  [key: string]: unknown;
}

/**
 * 解析后的错误信息
 */
interface ParsedError {
  /** 错误堆栈（Error对象） */
  errorStack?: Error;
  /** 错误详细信息 */
  errorInfo?: Record<string, unknown>;
}

/**
 * 错误报告参数
 */
interface ErrorReportParams {
  /** 错误描述 */
  description: string;
  /** 错误分组 */
  group: string;
  /** 错误堆栈 */
  errorStack?: Error;
  /** 错误详细信息 */
  errorInfo: Record<string, unknown>;
}

/**
 * 错误报告项
 */
interface ErrorReport {
  /** 报告名称 */
  name: string;
  /** 报告参数 */
  params: ErrorReportParams;
}

/**
 * 错误监听器配置
 */
interface ErrorListenerConfig {
  /**
   * 获取需要监听的信号
   * @param editor - 编辑器实例
   * @returns 信号对象
   */
  getListenSignal(editor: EditorInstance): Signal;

  /**
   * 监听回调函数
   * @param event - 事件数据
   * @returns 错误报告列表
   */
  listen(event: ListenerEventData): ErrorReport[];
}

/**
 * 解析错误对象为标准格式
 * @param error - 任意类型的错误
 * @returns 解析后的错误对象
 */
declare function parseError(error?: ErrorLike): ParsedError;

/**
 * 错误监听器配置列表
 * 包含保存失败和自动保存失败两个监听器
 */
declare const errorListeners: ErrorListenerConfig[];

export default errorListeners;