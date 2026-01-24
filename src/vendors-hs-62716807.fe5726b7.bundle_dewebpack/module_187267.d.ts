/**
 * 时间格式化选项接口
 */
export interface FormatOptions {
  /**
   * 格式化模板字符串
   * 支持的占位符：
   * - Y: 年份
   * - M: 月份
   * - D: 天数
   * - H: 小时
   * - m: 分钟
   * - s: 秒
   * - S: 毫秒
   * - []: 转义字符，内部内容不会被格式化
   * @example "YYYY-MM-DD HH:mm:ss"
   * @example "HH:mm:ss [remaining]"
   */
  format?: string;
}

/**
 * 时间单位元组类型
 * [0]: 时间单位标识符
 * [1]: 该单位对应的毫秒数
 */
type TimeUnitTuple = [string, number];

/**
 * 格式化倒计时
 * 计算从当前时间到目标时间的剩余时间，并按指定格式输出
 * 
 * @param targetDate - 目标日期（Date对象、时间戳或日期字符串）
 * @param options - 格式化选项
 * @returns 格式化后的倒计时字符串
 * 
 * @example
 * formatCountdown(new Date('2024-12-31'), { format: 'DD天 HH:mm:ss' })
 * // => "15天 08:30:45"
 * 
 * @example
 * formatCountdown(Date.now() + 3600000, { format: 'HH[小时]mm[分钟]' })
 * // => "01小时00分钟"
 */
export function formatCountdown(
  targetDate: Date | number | string,
  options: FormatOptions
): string;

/**
 * 格式化时间字符串
 * 将毫秒数按指定格式转换为可读的时间字符串
 * 
 * @param milliseconds - 要格式化的毫秒数
 * @param format - 格式化模板字符串
 * @returns 格式化后的时间字符串
 * 
 * @example
 * formatTimeStr(3661000, 'HH:mm:ss')
 * // => "01:01:01"
 * 
 * @example
 * formatTimeStr(86400000, 'D[天] H[小时]')
 * // => "1天 0小时"
 */
export function formatTimeStr(milliseconds: number, format: string): string;

/**
 * 时间单位常量配置
 * 按从大到小的顺序定义各时间单位及其毫秒值
 * @internal
 */
declare const TIME_UNITS: ReadonlyArray<TimeUnitTuple>;