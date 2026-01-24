/**
 * 日志上报模块
 * 
 * 提供通过 XMLHttpRequest 发送日志数据到指定端点的功能。
 * 使用原生 XMLHttpRequest 或其备份实例进行 POST 请求。
 * 
 * @module LogReporter
 */

/**
 * 可序列化的日志数据类型
 */
export type LogData = Record<string, unknown>;

/**
 * 日志上报的 URL 端点
 */
export type LogEndpoint = string;

/**
 * 控制台警告接口
 */
interface Logger {
  /**
   * 输出警告信息
   * @param message - 警告消息内容
   */
  warn(message: string): void;
}

/**
 * 发送日志数据到指定端点
 * 
 * 使用 XMLHttpRequest 以 POST 方法发送 JSON 格式的日志数据。
 * 如果发送失败，会通过日志系统记录异常信息。
 * 
 * @param data - 要发送的日志数据对象
 * @param endpoint - 接收日志的服务器端点 URL
 * 
 * @example
 *