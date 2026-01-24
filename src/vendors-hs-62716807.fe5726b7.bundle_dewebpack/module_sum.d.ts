/**
 * 求和模块
 * @module module_sum
 * @originalId sum
 */

/**
 * 处理参数的工具类型
 */
interface ParamDealer {
  /**
   * 处理参数
   * @param data - 原始数据
   * @param config - 配置项
   * @param mode - 处理模式
   */
  dealParam(data: unknown, config: unknown, mode: number): unknown;
  
  /**
   * 输出警告信息
   * @param message - 警告消息
   */
  warn(message: string): void;
}

/**
 * 求和函数签名
 * @param e - 第一个参数（具体类型待确认）
 * @param n - 第二个参数（具体类型待确认）
 * @param t - 第三个参数（具体类型待确认）
 * @returns 日志记录结果（具体类型待确认）
 */
declare function sum(e: unknown, n: unknown, t: unknown): unknown;

/**
 * 包含 sum 方法的类接口
 */
interface SumModule {
  /**
   * 记录日志的内部方法
   * @param method - 方法名
   * @param data - 处理后的数据
   * @param options - 选项参数
   */
  _lg(method: string, data: unknown, options: unknown): unknown;
  
  /**
   * 求和方法
   * @param e - 数据源
   * @param n - 配置
   * @param t - 额外选项
   */
  sum(e: unknown, n: unknown, t: unknown): unknown;
}