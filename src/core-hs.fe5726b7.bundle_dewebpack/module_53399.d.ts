/**
 * Iterator.prototype.some() 方法的类型定义
 * 
 * 该方法用于测试迭代器中是否至少有一个元素满足提供的测试函数。
 * 类似于 Array.prototype.some()，但用于迭代器对象。
 * 
 * @module Iterator.prototype.some
 */

/**
 * 迭代器辅助函数选项
 */
interface IteratorHelperOptions {
  /** 是否为记录类型的迭代器 */
  IS_RECORD?: boolean;
  /** 是否可以被中断 */
  INTERRUPTED?: boolean;
}

/**
 * 迭代结果对象
 */
interface IterationResult<T> {
  /** 迭代是否已停止 */
  stopped: boolean;
  /** 当前迭代的值（如果有） */
  value?: T;
}

/**
 * 测试函数类型
 * 
 * @template T - 迭代器元素的类型
 * @param value - 当前迭代的元素值
 * @param index - 当前元素的索引位置
 * @returns 如果元素通过测试则返回 true，否则返回 false
 */
type PredicateFunction<T> = (value: T, index: number) => boolean;

/**
 * 迭代回调函数类型
 * 
 * @template T - 迭代器元素的类型
 * @param value - 当前迭代的元素值
 * @param stop - 用于停止迭代的函数
 * @returns 可选的返回值
 */
type IteratorCallback<T> = (value: T, stop: () => void) => void | unknown;

declare global {
  /**
   * Iterator 接口扩展
   */
  interface Iterator<T, TReturn = any, TNext = undefined> {
    /**
     * 测试迭代器中是否至少有一个元素满足提供的测试函数
     * 
     * 该方法会遍历迭代器中的每个元素，并对每个元素执行提供的谓词函数。
     * 如果谓词函数对任何元素返回 true，则立即停止迭代并返回 true。
     * 如果遍历完所有元素都没有找到满足条件的元素，则返回 false。
     * 
     * @param predicate - 用于测试每个元素的函数，接收元素值和索引作为参数
     * @returns 如果至少有一个元素满足测试条件则返回 true，否则返回 false
     * 
     * @example
     *