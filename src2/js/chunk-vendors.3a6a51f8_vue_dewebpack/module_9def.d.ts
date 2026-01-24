/**
 * 将数值转换为安全整数范围内的非负整数
 * 
 * 该函数确保输入值在 JavaScript 的安全整数范围内（MAX_SAFE_INTEGER）。
 * 如果输入值大于 0，则返回输入值与最大安全整数之间的较小值；
 * 否则返回 0。
 * 
 * @module ToLength
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER | MAX_SAFE_INTEGER}
 */

/**
 * JavaScript 中最大的安全整数 (2^53 - 1)
 * @constant
 */
declare const MAX_SAFE_INTEGER: 9007199254740991;

/**
 * 将数值转换为有效的类数组长度值
 * 
 * 此函数用于规范化数组或类数组对象的长度值，确保：
 * 1. 长度为非负数
 * 2. 长度不超过 JavaScript 的最大安全整数 (9007199254740991)
 * 
 * @param value - 要转换的数值，通常来自 toInteger 转换后的结果
 * @returns 返回规范化后的长度值：
 *   - 如果 value > 0，返回 Math.min(value, 9007199254740991)
 *   - 如果 value <= 0，返回 0
 * 
 * @example
 *