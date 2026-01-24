/**
 * 计算平均值模块
 * Module: module_avg
 * Original ID: avg
 */

/**
 * 处理并记录平均值统计数据
 * @param eventName - 事件名称或配置对象
 * @param params - 事件参数或配置项
 * @param timestamp - 时间戳，用于记录事件发生的具体时间
 * @returns 返回日志记录的结果
 */
declare function avg(
  eventName: string | Record<string, unknown>,
  params: Record<string, unknown> | number,
  timestamp: number
): unknown;

/**
 * 平均值统计相关的类型定义
 */
interface AvgStatData {
  /** 处理后的参数数据 */
  processedParams: unknown;
}

/**
 * 参数处理器接口
 */
interface ParamDealer {
  /**
   * 处理参数
   * @param eventName - 事件名称
   * @param params - 参数对象
   * @param mode - 处理模式（0表示默认模式）
   * @returns 处理后的参数
   */
  dealParam(
    eventName: string | Record<string, unknown>,
    params: Record<string, unknown> | number,
    mode: number
  ): unknown;

  /**
   * 输出警告信息
   * @param message - 警告消息
   */
  warn(message: string): void;
}

/**
 * 日志记录器接口
 */
interface Logger {
  /**
   * 记录日志
   * @param type - 日志类型（如 'avg' 表示平均值统计）
   * @param data - 要记录的数据
   * @param timestamp - 时间戳
   * @returns 日志记录结果
   */
  _lg(type: string, data: unknown, timestamp: number): unknown;
}

export { avg, AvgStatData, ParamDealer, Logger };