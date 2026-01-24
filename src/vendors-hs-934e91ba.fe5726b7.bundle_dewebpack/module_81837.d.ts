/**
 * 将字符串转换为首字母大写形式
 * @param str - 要转换的字符串
 * @returns 首字母大写的字符串
 */
declare function upperFirst(str: string): string;

/**
 * 字符串拼接函数，支持可选的首字母大写转换
 * 
 * @param prefix - 前缀字符串
 * @param middle - 中间字符串（会被转换为小写）
 * @param shouldCapitalize - 是否将中间字符串首字母大写
 * @returns 拼接后的字符串
 * 
 * @example
 *