/**
 * 日志收集器信号监听模块
 * 用于捕获和处理应用程序日志和错误信息
 */

/**
 * 日志数据接口
 */
interface LogData {
  /** 日志消息内容 */
  message?: string | MessageObject;
  /** 日志分类 */
  category?: string;
  /** 可选配置项 */
  options?: LogOptions;
}

/**
 * 消息对象结构
 */
interface MessageObject {
  /** 消息分类 */
  category?: string;
  /** 消息详细信息 */
  info?: string;
  [key: string]: unknown;
}

/**
 * 日志选项配置
 */
interface LogOptions {
  /** 错误描述 */
  description?: string;
  /** 错误详细信息 */
  errorInfo?: unknown;
  /** 错误堆栈信息 */
  errorStack?: string;
}

/**
 * 监听事件数据结构
 */
interface ListenEventData {
  /** 日志数据 */
  data?: LogData;
}

/**
 * 日志收集器接口
 */
interface LogCollector {
  /** 添加日志的信号 */
  signalAddLog?: unknown;
}

/**
 * 带有日志收集器的对象
 */
interface ObjectWithLogCollector {
  /** 日志收集器实例 */
  logCollector?: LogCollector;
}

/**
 * 解析后的错误信息
 */
interface ParsedError {
  /** 操作类型（截取前200字符） */
  actionType: string;
  /** 完整错误堆栈 */
  errorStack: string;
}

/**
 * 日志参数结构
 */
interface LogParams {
  /** 错误描述 */
  description: string;
  /** 错误详细信息 */
  errorInfo: unknown;
  /** 错误堆栈 */
  errorStack?: string;
  /** 分组标识 */
  group: 'customizeError';
  /** 错误类型 */
  type?: string;
}

/**
 * 日志条目结构
 */
interface LogEntry {
  /** 日志名称 */
  name: string;
  /** 日志参数 */
  params: LogParams;
}

/**
 * 日志监听器配置
 */
interface LogListener {
  /**
   * 获取监听信号
   * @param obj - 包含日志收集器的对象
   * @returns 日志添加信号，如果不存在则返回undefined
   */
  getListenSignal(obj: ObjectWithLogCollector): unknown | undefined;

  /**
   * 监听日志事件并处理
   * @param event - 监听事件数据
   * @returns 处理后的日志条目数组
   */
  listen(event: ListenEventData): LogEntry[];
}

/**
 * 默认导出：日志监听器配置数组
 */
declare const logListeners: LogListener[];

export default logListeners;