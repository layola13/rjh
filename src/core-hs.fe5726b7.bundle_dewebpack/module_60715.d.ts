/**
 * 检测正则表达式命名捕获组功能是否存在Bug
 * 
 * 测试两个关键特性：
 * 1. 命名捕获组的groups对象是否正确返回匹配结果
 * 2. String.prototype.replace是否正确支持命名捕获组的替换语法 $<name>
 * 
 * @returns {boolean} 如果存在Bug返回true，功能正常返回false
 * 
 * @example
 * // 正常环境应返回 false
 * // 表示命名捕获组功能正常工作
 * const hasBug = detectNamedCaptureGroupBug();
 */
declare function detectNamedCaptureGroupBug(): boolean;

export = detectNamedCaptureGroupBug;