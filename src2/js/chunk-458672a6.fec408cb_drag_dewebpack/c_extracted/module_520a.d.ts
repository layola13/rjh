/**
 * 正则表达式 exec 方法的 polyfill/修复
 * 
 * 修复了以下问题：
 * 1. 某些环境下 RegExp.prototype.exec 不正确地更新 lastIndex
 * 2. 某些环境下捕获组返回空字符串而非 undefined
 * 
 * @module RegExpExecPolyfill
 */

/**
 * 获取正则表达式的标志字符串
 * 依赖外部模块提供此功能
 */
declare function getRegExpFlags(regexp: RegExp): string;

/**
 * 正则表达式 exec 方法的增强实现
 * 
 * @param input - 要匹配的字符串
 * @returns 匹配结果数组，如果没有匹配则返回 null
 * 
 * @example
 *