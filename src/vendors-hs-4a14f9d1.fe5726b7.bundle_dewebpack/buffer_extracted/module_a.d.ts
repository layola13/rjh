/**
 * 日期时间格式化模块
 * @module module__a
 */

/**
 * 表示时间结构的接口，包含星期信息
 */
interface TimeStructure {
  /** 星期几 (0-6, 0表示星期日) */
  tm_wday: number;
}

/**
 * 从时间结构中提取星期几的缩写名称（前3个字符）
 * @param timeStruct - 包含 tm_wday 属性的时间结构对象
 * @returns 星期几的缩写字符串（例如：'Sun', 'Mon', 'Tue'）
 * @example
 *