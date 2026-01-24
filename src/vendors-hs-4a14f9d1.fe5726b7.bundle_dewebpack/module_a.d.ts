/**
 * 获取星期几的缩写名称（前3个字符）
 * @module module__a
 */

/**
 * 星期几的名称数组，索引0-6对应周日到周六
 */
declare const weekdayNames: readonly string[];

/**
 * 根据日期对象的星期几索引返回缩写名称
 * @param dateObject - 包含 tm_wday 属性的日期对象
 * @returns 星期几的3字符缩写（如 "Mon", "Tue" 等）
 * 
 * @example
 *