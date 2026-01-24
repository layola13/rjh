/**
 * 获取原生Function.toString方法的引用
 * 
 * 该模块通过共享存储机制保存原生Function.toString方法的引用，
 * 防止被polyfill或其他代码覆盖后无法访问原始实现。
 * 
 * @module NativeFunctionToString
 */

/**
 * 共享存储获取函数类型
 * 用于从全局共享存储中获取指定键的值
 */
type SharedStoreGetter = <T>(key: string, fallbackValue: T) => T;

/**
 * 原生Function.toString方法的引用
 * 
 * 通过共享存储机制保存的原生Function.prototype.toString方法，
 * 确保即使在Function.prototype.toString被修改后，
 * 仍然可以访问原始的原生实现。
 * 
 * @remarks
 * 这种模式常用于polyfill库（如core-js）中，
 * 用于保护原生方法不被用户代码意外覆盖。
 * 
 * @example
 *