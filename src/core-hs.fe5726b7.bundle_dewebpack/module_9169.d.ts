/**
 * 检查给定的可迭代对象是否正确实现了迭代器协议
 * 用于测试环境是否支持迭代器（Iterator）特性
 * 
 * @module IteratorProtocolChecker
 */

/**
 * 迭代器结果对象
 */
interface IteratorResult<T> {
  /** 是否已完成迭代 */
  done: boolean;
  /** 当前迭代的值（可选） */
  value?: T;
}

/**
 * 迭代器接口
 */
interface Iterator<T> {
  /** 获取下一个迭代结果 */
  next(): IteratorResult<T>;
  /** 提前终止迭代器（可选） */
  return?(): IteratorResult<T>;
}

/**
 * 可迭代对象接口
 */
interface Iterable<T> {
  /** 返回迭代器的方法，键为 Symbol.iterator */
  [Symbol.iterator](): Iterator<T>;
}

/**
 * 接受可迭代对象的函数类型
 * @param iterable - 要处理的可迭代对象
 */
type IterableConsumer = (iterable: Iterable<unknown>) => unknown;

/**
 * 检查给定函数是否正确支持迭代器协议
 * 
 * @param consumer - 接受可迭代对象的函数（如 Array.from、for...of 等）
 * @param requiresEarlyClose - 是否要求支持提前关闭迭代器（return 方法）
 * @returns 如果正确支持迭代器协议则返回 true，否则返回 false
 * 
 * @example
 *