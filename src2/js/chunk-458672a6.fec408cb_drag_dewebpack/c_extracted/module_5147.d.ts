/**
 * 检测字符串方法是否正确处理正则表达式的Symbol.match属性
 * 
 * 用途：某些字符串方法（如includes、startsWith、endsWith等）在接收正则表达式参数时
 * 应该抛出TypeError。此函数检测方法实现是否遵循ES规范。
 * 
 * @module CorrectPrototypeGetter
 * @see https://tc39.es/ecma262/#sec-symbol.match
 */

/**
 * 检查指定的字符串原型方法是否正确处理正则表达式参数
 * 
 * 工作原理：
 * 1. 首先尝试在字符串上调用指定方法，传入正则表达式
 * 2. 如果方法正确实现，应该检查正则表达式的Symbol.match属性并抛出错误
 * 3. 如果捕获到错误，尝试禁用Symbol.match属性（设为false）再次调用
 * 4. 如果禁用后仍然失败，说明实现不正确
 * 
 * @param methodName - 要检测的字符串原型方法名称（如'includes'、'startsWith'等）
 * @returns 如果方法未正确处理正则表达式返回true，否则返回false
 * 
 * @example
 *