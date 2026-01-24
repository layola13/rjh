/**
 * 检查给定的函数是否正确处理可迭代对象
 * 用于测试环境中验证迭代器协议的实现
 * 
 * @module IteratorSafetyCheck
 */

/**
 * 迭代器符号类型
 */
type IteratorSymbol = typeof Symbol.iterator;

/**
 * 迭代器结果对象
 */
interface IteratorResult<T = unknown> {
  /** 表示迭代是否完成 */
  done: boolean;
  /** 迭代的当前值（可选） */
  value?: T;
}

/**
 * 迭代器接口
 */
interface Iterator<T = unknown> {
  /** 获取下一个迭代结果 */
  next(): IteratorResult<T>;
  /** 提前终止迭代器（可选） */
  return?(): IteratorResult<T>;
}

/**
 * 可迭代对象接口
 */
interface Iterable<T = unknown> {
  /** 返回迭代器的方法 */
  [Symbol.iterator](): Iterator<T>;
}

/**
 * 接受可迭代对象作为参数的函数类型
 */
type IterableConsumer = (iterable: Iterable) => unknown;

/**
 * 检查函数是否正确处理迭代器协议
 * 
 * 此函数用于测试目标函数在处理可迭代对象时是否遵循规范。
 * 它会创建一个模拟的可迭代对象并验证目标函数是否正确调用了迭代器方法。
 * 
 * @param targetFunction - 需要测试的函数，应接受可迭代对象作为参数
 * @param requiresFullCheck - 是否要求完整的迭代器检查（通常用于不支持迭代器的环境）
 * @returns 如果目标函数正确处理了迭代器则返回 true，否则返回 false
 * 
 * @example
 *