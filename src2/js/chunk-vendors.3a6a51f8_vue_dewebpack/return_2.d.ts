/**
 * 迭代器辅助模块
 * 提供对可迭代对象的遍历功能，支持提前中断和返回值
 * @module Iterator
 */

/**
 * 表示迭代应该提前中断的特殊标记
 */
export const BREAK: unique symbol;

/**
 * 表示迭代应该返回特定值的特殊标记
 */
export const RETURN: unique symbol;

/**
 * 迭代上下文类型
 */
type IterationContext = typeof BREAK | typeof RETURN;

/**
 * 迭代回调函数类型（单参数版本）
 * @template T 迭代元素类型
 * @template R 回调返回值类型
 */
type IteratorCallback<T, R> = (value: T) => R | IterationContext;

/**
 * 迭代回调函数类型（键值对版本）
 * @template K 键类型
 * @template V 值类型
 * @template R 回调返回值类型
 */
type EntriesIteratorCallback<K, V, R> = (key: K, value: V) => R | IterationContext;

/**
 * 可迭代对象的迭代器方法
 * @template T 迭代元素类型
 */
type IteratorMethod<T> = () => Iterator<T>;

/**
 * 通用迭代函数
 * 遍历可迭代对象（数组、Map、Set等），并对每个元素执行回调函数
 * 
 * @template T 可迭代对象类型
 * @template R 回调返回值类型
 * 
 * @param iterable - 要遍历的可迭代对象
 * @param callback - 对每个元素执行的回调函数
 * @param context - 回调函数的this上下文
 * @param isEntries - 是否以键值对模式迭代（如Map.entries）
 * @param customIterator - 自定义迭代器方法，如果提供则使用该方法而非默认Symbol.iterator
 * 
 * @returns 如果回调返回BREAK或RETURN，则返回该标记；否则返回undefined
 * 
 * @throws {TypeError} 当对象不可迭代时抛出
 * 
 * @example
 *