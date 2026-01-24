/**
 * 检测 RegExp 的 dotAll 标志('s')是否被正确支持
 * 
 * dotAll 模式下，点号(.)应该匹配包括换行符在内的所有字符
 * 此模块用于检测该特性在当前环境中的支持情况
 * 
 * @returns {boolean} 如果 dotAll 特性不被支持或实现不正确则返回 true，否则返回 false
 */
declare function checkRegExpDotAllSupport(): boolean;

export = checkRegExpDotAllSupport;