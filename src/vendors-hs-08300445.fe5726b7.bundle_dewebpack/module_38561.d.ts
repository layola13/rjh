/**
 * 日期时间工具函数模块
 * 提供日期计算、时间设置等辅助功能
 */

/**
 * 日期处理器接口
 * 定义了日期操作所需的所有方法
 */
interface DateHandler {
  /**
   * 获取年份
   * @param date - 日期对象
   * @returns 年份数值
   */
  getYear(date: unknown): number;

  /**
   * 获取月份（0-11）
   * @param date - 日期对象
   * @returns 月份数值
   */
  getMonth(date: unknown): number;

  /**
   * 获取日期
   * @param date - 日期对象
   * @returns 日期数值（1-31）
   */
  getDate(date: unknown): number;

  /**
   * 获取小时
   * @param date - 日期对象
   * @returns 小时数值（0-23）
   */
  getHour(date: unknown): number;

  /**
   * 获取分钟
   * @param date - 日期对象
   * @returns 分钟数值（0-59）
   */
  getMinute(date: unknown): number;

  /**
   * 获取秒数
   * @param date - 日期对象
   * @returns 秒数数值（0-59）
   */
  getSecond(date: unknown): number;

  /**
   * 设置小时
   * @param date - 日期对象
   * @param hour - 小时值
   * @returns 更新后的日期对象
   */
  setHour(date: unknown, hour: number): unknown;

  /**
   * 设置分钟
   * @param date - 日期对象
   * @param minute - 分钟值
   * @returns 更新后的日期对象
   */
  setMinute(date: unknown, minute: number): unknown;

  /**
   * 设置秒数
   * @param date - 日期对象
   * @param second - 秒数值
   * @returns 更新后的日期对象
   */
  setSecond(date: unknown, second: number): unknown;

  /**
   * 获取固定日期对象
   * @param dateString - 日期字符串（格式：YYYY-MM-DD）
   * @returns 日期对象
   */
  getFixedDate(dateString: string): unknown;

  /**
   * 获取月份最后一天
   * @param date - 日期对象
   * @returns 月末日期对象
   */
  getEndDate(date: unknown): unknown;
}

/**
 * 获取指定日期所在月份的最后一天
 * @param handler - 日期处理器实例
 * @param date - 目标日期
 * @returns 格式化的日期字符串（YYYY-MM-DD）
 */
export function getLastDay(handler: DateHandler, date: unknown): string;

/**
 * 计算时间的下界（向下取整到指定间隔）
 * @param hour - 当前小时（0-23）
 * @param minute - 当前分钟（0-59）
 * @param second - 当前秒数（0-59）
 * @param hourInterval - 小时间隔
 * @param minuteInterval - 分钟间隔
 * @param secondInterval - 秒数间隔
 * @returns 调整后的 [小时, 分钟, 秒数] 元组
 */
export function getLowerBoundTime(
  hour: number,
  minute: number,
  second: number,
  hourInterval: number,
  minuteInterval: number,
  secondInterval: number
): [number, number, number];

/**
 * 将源日期的时间部分复制到目标日期
 * @param handler - 日期处理器实例
 * @param targetDate - 目标日期对象
 * @param sourceDate - 源日期对象（可选）
 * @returns 更新后的日期对象，如果源日期为空则返回原目标日期
 */
export function setDateTime(
  handler: DateHandler,
  targetDate: unknown,
  sourceDate?: unknown
): unknown;

/**
 * 设置日期对象的时间部分
 * @param handler - 日期处理器实例
 * @param date - 要修改的日期对象
 * @param hour - 小时值（0-23）
 * @param minute - 分钟值（0-59）
 * @param second - 秒数值（0-59）
 * @returns 更新后的日期对象
 */
export function setTime(
  handler: DateHandler,
  date: unknown,
  hour: number,
  minute: number,
  second: number
): unknown;