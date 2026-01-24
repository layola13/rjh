/**
 * 时间格式化模块
 * 将时间对象的秒数部分格式化为两位数字符串
 * @module module__S
 */

/**
 * 时间对象接口，包含秒数字段
 */
interface TimeObject {
  /** 秒数 (0-59) */
  tm_sec: number;
}

/**
 * 格式化函数类型
 * @param value - 要格式化的数值
 * @param width - 填充宽度
 * @returns 格式化后的字符串
 */
type FormatFunction = (value: number, width: number) => string;

/**
 * 导出的格式化函数
 * 接收时间对象，返回格式化后的秒数字符串
 * @param timeObj - 包含 tm_sec 属性的时间对象
 * @returns 格式化为两位数的秒数字符串 (例如: "09", "30")
 */
declare function formatSeconds(timeObj: TimeObject): string;

export default formatSeconds;
export type { TimeObject, FormatFunction };