/**
 * 验证值是否为构造函数的工具模块
 * @module ConstructorValidator
 */

/**
 * 构造函数类型
 * 表示可以使用 new 关键字调用的函数
 * @template T - 构造函数实例化后的类型
 */
type Constructor<T = any> = new (...args: any[]) => T;

/**
 * 验证给定值是否为构造函数
 * 
 * 该函数检查传入的值是否可以作为构造函数使用（即是否可以用 new 关键字调用）。
 * 如果值是有效的构造函数，则返回该值；否则抛出 TypeError。
 * 
 * @template T - 期望的构造函数实例类型
 * @param value - 需要验证的值
 * @returns 如果验证通过，返回原始的构造函数
 * @throws {TypeError} 当值不是构造函数时抛出错误，错误消息格式为 "{value} is not a constructor"
 * 
 * @example
 *