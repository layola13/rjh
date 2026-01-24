/**
 * 迭代器辅助工具模块
 * 提供迭代控制流（中断和返回）的实用函数
 */

/**
 * 迭代中断标记
 * 当迭代回调返回此值时，终止迭代
 */
export const BREAK: unique symbol;

/**
 * 迭代返回标记
 * 当迭代回调返回此值时，立即返回该值并终止迭代
 */
export const RETURN: unique symbol;

/**
 * 迭代回调函数类型（单参数）
 */
type IteratorCallbackSingle<T, R> = (value: T) => R | typeof BREAK | typeof RETURN;

/**
 * 迭代回调函数类型（键值对参数）
 */
type IteratorCallbackPair<K, V, R> = (key: K, value: V) => R | typeof BREAK | typeof RETURN;

/**
 * 可迭代对象的迭代器接口
 */
interface Iterator<T> {
  next(): IteratorResult<T>;
}

/**
 * 迭代器结果接口
 */
interface IteratorResult<T> {
  done: boolean;
  value: T;
}

/**
 * 获取迭代器的函数类型
 */
type GetIteratorFunction<T> = (target: any) => Iterator<T>;

/**
 * 通用迭代函数
 * 
 * @template T - 可迭代对象类型
 * @template R - 回调函数返回值类型
 * 
 * @param target - 要迭代的对象（数组、类数组或实现了迭代器协议的对象）
 * @param callback - 迭代回调函数
 * @param context - 回调函数的上下文对象
 * @param isPair - 是否以键值对形式调用回调（true: callback(key, value), false: callback(value)）
 * @param useCustomIterator - 是否使用自定义迭代器（传入迭代器获取函数），false则自动检测
 * 
 * @returns 如果回调返回 BREAK 或 RETURN，则返回该标记值；否则返回 undefined
 * 
 * @throws {TypeError} 当目标对象不可迭代时抛出异常
 * 
 * @example
 * // 迭代数组
 * forOf([1, 2, 3], (value) => console.log(value), null, false, false);
 * 
 * @example
 * // 中断迭代
 * forOf([1, 2, 3], (value) => value === 2 ? BREAK : null, null, false, false);
 */
export default function forOf<T, R = void>(
  target: Iterable<T> | ArrayLike<T>,
  callback: IteratorCallbackSingle<T, R> | IteratorCallbackPair<any, any, R>,
  context: any,
  isPair: boolean,
  useCustomIterator: GetIteratorFunction<T> | false
): typeof BREAK | typeof RETURN | undefined;