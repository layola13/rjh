/**
 * 验证对象类型是否正确
 * 
 * 该模块用于检查给定对象是否为指定构造函数或原型的实例。
 * 如果验证失败，则抛出 "Incorrect invocation" 类型错误。
 * 
 * @module TypeValidator
 */

/**
 * 检查对象是否为指定类型的实例
 * 
 * @description
 * 验证 value 是否是 constructor 的实例。通常用于确保函数/方法
 * 被正确调用（如构造函数是否用 new 调用）。
 * 
 * @param constructor - 期望的构造函数或原型对象
 * @param value - 需要验证的值
 * @returns 如果验证通过，返回原始值
 * @throws {TypeError} 当 value 不是 constructor 的实例时抛出 "Incorrect invocation" 错误
 * 
 * @example
 *