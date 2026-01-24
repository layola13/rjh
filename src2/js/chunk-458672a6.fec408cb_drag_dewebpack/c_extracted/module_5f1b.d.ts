/**
 * RegExp exec 方法的安全执行包装器
 * 确保 exec 方法返回正确的类型并在兼容的接收者上调用
 * 
 * @module RegExpExecWrapper
 */

/**
 * 执行正则表达式匹配，支持自定义 exec 方法
 * 
 * @param regexp - 要执行的正则表达式对象
 * @param str - 要匹配的字符串
 * @returns 匹配结果数组，如果没有匹配则返回 null
 * @throws {TypeError} 当 exec 方法返回的不是对象或 null 时
 * @throws {TypeError} 当在不兼容的接收者上调用时
 */
export declare function regExpExec(
  regexp: RegExp,
  str: string
): RegExpExecArray | null;