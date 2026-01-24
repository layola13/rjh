/**
 * 获取值的内部类型标签字符串
 * 
 * 此函数通过调用 Object.prototype.toString 并提取类型标签来确定值的内部类型。
 * 例如：'[object Array]' => 'Array', '[object Date]' => 'Date'
 * 
 * @module ClassOf
 */

/**
 * 从 Object.prototype.toString 的输出中提取并返回类型标签
 * 
 * @param value - 需要检测类型的任意值
 * @returns 表示值内部类型的字符串（如 'Array', 'Object', 'Date', 'RegExp' 等）
 * 
 * @example
 *