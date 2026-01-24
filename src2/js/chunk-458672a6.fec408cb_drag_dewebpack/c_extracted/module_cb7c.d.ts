/**
 * 对象类型验证工具模块
 * 
 * 该模块提供了运行时对象类型断言功能，确保传入的值是有效的对象类型。
 * 
 * @module ObjectValidator
 * @requires d3f4 - 对象类型检查依赖模块
 */

/**
 * 验证给定值是否为对象类型
 * 
 * 该函数检查传入的值是否为有效的对象（非null、非undefined、非原始类型）。
 * 如果验证失败，将抛出TypeError异常。
 * 
 * @template T - 期望的对象类型
 * @param value - 需要验证的值
 * @returns 验证通过后返回原始值（类型断言为对象）
 * @throws {TypeError} 当传入的值不是对象时抛出，错误信息格式为 "{value} is not an object!"
 * 
 * @example
 *