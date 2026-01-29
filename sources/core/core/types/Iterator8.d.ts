/**
 * Iterator.prototype.every polyfill module
 * 为迭代器添加 every 方法支持
 */

/**
 * 迭代器 every 方法的谓词函数类型
 * 
 * @param value - 当前迭代的值
 * @param index - 当前迭代的索引
 * @returns 如果元素满足条件返回 true，否则返回 false
 */
type EveryPredicate<T> = (value: T, index: number) => boolean;

/**
 * 迭代选项
 */
interface IterateOptions {
  /**
   * 最大迭代次数
   */
  maxIterations?: number;
}

/**
 * 迭代结果
 */
interface IterateResult<T> {
  /**
   * 是否所有元素都满足条件
   */
  result: boolean;
  /**
   * 已迭代的元素数量
   */
  count: number;
}

/**
 * 迭代器对象接口
 */
interface IteratorObject<T> {
  next(): IteratorResult<T>;
  [Symbol.iterator](): IteratorObject<T>;
}

/**
 * 扩展 Iterator 接口，添加 every 方法
 */
interface Iterator<T> {
  /**
   * 测试迭代器中的所有元素是否都满足指定的条件
   * 
   * @param predicate - 测试每个元素的函数
   * @returns 如果所有元素都满足条件返回 true，否则返回 false
   * 
   * @example
   * ```typescript
   * // 测试数组迭代器
   * const arr = [2, 4, 6, 8];
   * const iterator = arr.values();
   * const allEven = iterator.every(x => x % 2 === 0); // true
   * 
   * // 使用索引参数
   * const numbers = [1, 2, 3, 4];
   * const iter = numbers.values();
   * const result = iter.every((value, index) => value === index + 1); // true
   * ```
   */
  every(predicate: EveryPredicate<T>): boolean;
}

export { EveryPredicate, IterateOptions, IterateResult, IteratorObject, Iterator };