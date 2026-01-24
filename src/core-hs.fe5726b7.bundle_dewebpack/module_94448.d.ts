/**
 * Iterator.prototype.every polyfill
 * 检查迭代器中的所有元素是否都满足给定的条件
 */

/**
 * 迭代器每项测试的谓词函数类型
 * @template T - 迭代器元素的类型
 */
type EveryPredicate<T> = (value: T, index: number) => boolean;

/**
 * 迭代选项接口
 */
interface IterateOptions {
  /** 是否为记录类型的迭代 */
  IS_RECORD: boolean;
  /** 是否支持中断迭代 */
  INTERRUPTED: boolean;
}

/**
 * 迭代结果接口
 */
interface IterateResult {
  /** 迭代是否被中断 */
  stopped: boolean;
}

/**
 * 迭代器对象类型
 * @template T - 迭代器元素的类型
 */
interface IteratorObject<T> {
  next(): IteratorResult<T>;
  [Symbol.iterator](): IteratorObject<T>;
}

/**
 * 迭代器协议扩展
 * @template T - 迭代器元素的类型
 */
interface Iterator<T> {
  /**
   * 测试迭代器中的所有元素是否都满足提供的测试函数
   * 
   * @param predicate - 用于测试每个元素的函数，接收元素值和索引作为参数
   * @returns 如果所有元素都通过测试则返回 true，否则返回 false
   * 
   * @example
   *