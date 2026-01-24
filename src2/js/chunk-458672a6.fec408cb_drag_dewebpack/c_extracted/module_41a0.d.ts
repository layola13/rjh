/**
 * 迭代器工厂模块
 * 
 * 用于创建符合ES2015迭代器协议的构造函数。
 * 该模块通过原型继承创建具有迭代器接口的类型。
 * 
 * @module IteratorFactory
 */

/**
 * 创建对象的属性描述符
 * 对应依赖 "4630"
 */
declare function createPropertyDescriptor(
  enumerable: number,
  value: unknown
): PropertyDescriptor;

/**
 * 基于原型创建新对象
 * 对应依赖 "2aeb"
 */
declare function objectCreate<T extends object>(
  proto: T,
  propertiesObject?: PropertyDescriptorMap
): T;

/**
 * 设置对象的类型标签（toStringTag）
 * 对应依赖 "7f20"
 */
declare function setToStringTag(
  target: object,
  tag: string
): void;

/**
 * 在对象上定义属性
 * 对应依赖 "32e9"
 */
declare function defineProperty(
  target: object,
  propertyKey: PropertyKey,
  descriptor: PropertyDescriptor | (() => unknown)
): void;

/**
 * 获取Well-Known Symbol
 * 对应依赖 "2b4c"
 * @param name - Symbol名称，如 "iterator"
 */
declare function getSymbol(name: string): symbol;

/**
 * 迭代器构造函数接口
 * 定义标准的迭代器接口
 */
interface IteratorConstructor<T = unknown> {
  new(): Iterator<T>;
  prototype: Iterator<T>;
}

/**
 * 创建迭代器构造函数
 * 
 * 该函数接收一个构造函数并将其转换为符合ES2015迭代器协议的类。
 * 它会：
 * 1. 创建一个带有 `next` 方法的原型对象
 * 2. 添加 `@@iterator` 方法，返回迭代器本身
 * 3. 设置适当的类型标签用于 `Object.prototype.toString`
 * 
 * @template T - 迭代器产生的值类型
 * @param Constructor - 要转换为迭代器的构造函数
 * @param name - 迭代器的名称（用于调试和类型标签）
 * @param nextMethod - 实现迭代逻辑的next方法
 * 
 * @example
 *