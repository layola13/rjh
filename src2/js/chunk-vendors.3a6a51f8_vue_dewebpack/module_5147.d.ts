/**
 * 用于检测字符串方法是否正确处理正则表达式的工具函数
 * 
 * @description
 * 此模块检测给定的字符串方法在接收正则表达式作为参数时是否表现正确。
 * 某些字符串方法（如 `match`）应该能够处理正则表达式，但在某些环境中可能存在不一致的行为。
 * 
 * @module RegExpMethodChecker
 * @dependencies
 * - "2b4c": Symbol/Well-known symbol provider (用于获取 Symbol.match)
 */

/**
 * 字符串方法名称类型
 * 可能的字符串方法，如 'match', 'search', 'replace' 等
 */
type StringMethodName = string;

/**
 * 检测字符串方法是否正确处理正则表达式
 * 
 * @param methodName - 要测试的字符串方法名称（如 'match'）
 * @returns 如果方法对正则表达式处理不正确则返回 `true`，否则返回 `false`
 * 
 * @remarks
 * 该函数通过以下步骤进行检测：
 * 1. 创建一个简单的正则表达式 `/./`
 * 2. 尝试在字符串 `"/./"` 上调用指定的方法，传入该正则表达式
 * 3. 如果抛出错误，尝试将正则表达式的 `Symbol.match` 属性设置为 `false`
 * 4. 再次测试，如果此时不抛出错误，说明该方法对正则表达式处理不正确
 * 
 * @example
 *