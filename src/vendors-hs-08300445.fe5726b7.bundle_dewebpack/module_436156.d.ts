import type { Moment } from 'moment';

/**
 * 日期时间工具类型定义
 * 提供基于 Moment.js 的日期操作接口
 */
declare interface DateUtils {
  /**
   * 获取当前时间
   * @returns 当前时间的 Moment 对象
   */
  getNow(): Moment;

  /**
   * 获取固定格式的日期（YYYY-MM-DD）
   * @param date - 日期值（字符串、Date 或 Moment 对象）
   * @returns 格式化后的 Moment 对象
   */
  getFixedDate(date: string | Date | Moment): Moment;

  /**
   * 获取月份的最后一天
   * @param date - 输入日期
   * @returns 该月最后一天的 Moment 对象
   */
  getEndDate(date: Moment): Moment;

  /**
   * 获取星期几（考虑区域设置的第一天）
   * @param date - 输入日期
   * @returns 星期索引（0-6）
   */
  getWeekDay(date: Moment): number;

  /**
   * 获取年份
   * @param date - 输入日期
   * @returns 年份数值
   */
  getYear(date: Moment): number;

  /**
   * 获取月份
   * @param date - 输入日期
   * @returns 月份索引（0-11）
   */
  getMonth(date: Moment): number;

  /**
   * 获取日期（几号）
   * @param date - 输入日期
   * @returns 日期数值（1-31）
   */
  getDate(date: Moment): number;

  /**
   * 获取小时
   * @param date - 输入日期
   * @returns 小时数值（0-23）
   */
  getHour(date: Moment): number;

  /**
   * 获取分钟
   * @param date - 输入日期
   * @returns 分钟数值（0-59）
   */
  getMinute(date: Moment): number;

  /**
   * 获取秒
   * @param date - 输入日期
   * @returns 秒数值（0-59）
   */
  getSecond(date: Moment): number;

  /**
   * 增加年份
   * @param date - 原始日期
   * @param amount - 增加的年数（可为负数）
   * @returns 新的 Moment 对象
   */
  addYear(date: Moment, amount: number): Moment;

  /**
   * 增加月份
   * @param date - 原始日期
   * @param amount - 增加的月数（可为负数）
   * @returns 新的 Moment 对象
   */
  addMonth(date: Moment, amount: number): Moment;

  /**
   * 增加天数
   * @param date - 原始日期
   * @param amount - 增加的天数（可为负数）
   * @returns 新的 Moment 对象
   */
  addDate(date: Moment, amount: number): Moment;

  /**
   * 设置年份
   * @param date - 原始日期
   * @param year - 目标年份
   * @returns 新的 Moment 对象
   */
  setYear(date: Moment, year: number): Moment;

  /**
   * 设置月份
   * @param date - 原始日期
   * @param month - 目标月份（0-11）
   * @returns 新的 Moment 对象
   */
  setMonth(date: Moment, month: number): Moment;

  /**
   * 设置日期
   * @param date - 原始日期
   * @param day - 目标日期（1-31）
   * @returns 新的 Moment 对象
   */
  setDate(date: Moment, day: number): Moment;

  /**
   * 设置小时
   * @param date - 原始日期
   * @param hour - 目标小时（0-23）
   * @returns 新的 Moment 对象
   */
  setHour(date: Moment, hour: number): Moment;

  /**
   * 设置分钟
   * @param date - 原始日期
   * @param minute - 目标分钟（0-59）
   * @returns 新的 Moment 对象
   */
  setMinute(date: Moment, minute: number): Moment;

  /**
   * 设置秒
   * @param date - 原始日期
   * @param second - 目标秒（0-59）
   * @returns 新的 Moment 对象
   */
  setSecond(date: Moment, second: number): Moment;

  /**
   * 判断日期是否在另一个日期之后
   * @param date - 待比较日期
   * @param compareDate - 参照日期
   * @returns 是否在之后
   */
  isAfter(date: Moment, compareDate: Moment): boolean;

  /**
   * 验证日期是否有效
   * @param date - 待验证日期
   * @returns 是否有效
   */
  isValidate(date: Moment): boolean;

  /**
   * 区域设置相关的日期工具
   */
  locale: {
    /**
     * 获取指定区域的每周第一天索引
     * @param locale - 区域代码（如 'en_US', 'zh_CN'）
     * @returns 第一天索引（0-6）
     */
    getWeekFirstDay(locale: string): number;

    /**
     * 获取指定区域的每周第一天日期
     * @param locale - 区域代码
     * @param date - 输入日期
     * @returns 该周第一天的 Moment 对象
     */
    getWeekFirstDate(locale: string, date: Moment): Moment;

    /**
     * 获取指定区域的周数
     * @param locale - 区域代码
     * @param date - 输入日期
     * @returns 该年的第几周
     */
    getWeek(locale: string, date: Moment): number;

    /**
     * 获取指定区域的星期简称数组
     * @param locale - 区域代码
     * @returns 星期简称数组（如 ['Sun', 'Mon', ...]）
     */
    getShortWeekDays(locale: string): string[];

    /**
     * 获取指定区域的月份简称数组
     * @param locale - 区域代码
     * @returns 月份简称数组（如 ['Jan', 'Feb', ...]）
     */
    getShortMonths(locale: string): string[];

    /**
     * 格式化日期（带区域设置）
     * @param locale - 区域代码
     * @param date - 输入日期
     * @param format - 格式字符串
     * @returns 格式化后的字符串
     */
    format(locale: string, date: Moment, format: string): string;

    /**
     * 解析日期字符串（支持多种格式尝试）
     * @param locale - 区域代码
     * @param dateString - 日期字符串
     * @param formats - 尝试的格式数组
     * @returns 解析成功的 Moment 对象，失败返回 null
     */
    parse(locale: string, dateString: string, formats: string[]): Moment | null;
  };
}

declare const dateUtils: DateUtils;

export default dateUtils;