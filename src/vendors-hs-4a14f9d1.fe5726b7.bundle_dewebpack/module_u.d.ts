/**
 * 日期时间结构接口
 * 表示分解的时间信息，类似于C语言的tm结构
 */
interface TimeInfo {
  /** 一年中的第几天 (0-365) */
  tm_yday: number;
  /** 一周中的第几天 (0-6, 0表示星期日) */
  tm_wday: number;
}

/**
 * 数字格式化函数类型
 * 将数字填充为指定宽度的字符串
 */
type FormatNumberFunction = (value: number, width: number) => string;

/**
 * 计算一年中的周数
 * 
 * 根据给定的日期信息计算该日期所在的周数。
 * 计算方法：将年初天数加7，减去星期偏移，然后除以7向下取整。
 * 
 * @param timeInfo - 包含年中天数和星期信息的时间对象
 * @param formatNumber - 用于格式化周数的函数，通常填充为2位数字
 * @returns 格式化后的周数字符串
 * 
 * @example
 *