/**
 * 异步迭代器辅助函数 - 从异步迭代器中获取第一个值或完整迭代结果
 * 
 * 该函数用于处理异步迭代器，调用next()方法并根据迭代器状态返回结果：
 * - 如果第一次迭代即完成(done=true)，返回迭代器的value
 * - 否则继续调用next()获取下一个值
 * 
 * @module AsyncIteratorHelper
 */

/**
 * 异步迭代器结果接口
 * @template T 迭代器值的类型
 */
interface AsyncIteratorResult<T> {
  /** 迭代器是否已完成 */
  done: boolean;
  /** 当前迭代的值 */
  value: T;
}

/**
 * 异步迭代器接口
 * @template T 迭代器产生的值类型
 */
interface AsyncIteratorLike<T> {
  /** 获取迭代器的下一个值 */
  next(): Promise<AsyncIteratorResult<T>>;
}

/**
 * 从异步迭代器中提取值的辅助函数
 * 
 * @template E 第一个参数类型
 * @template T 第二个参数类型
 * @template R 第三个参数类型
 * @template N 第四个参数类型
 * @template O 第五个参数类型
 * @template V 返回值类型
 * 
 * @param e - 第一个参数，传递给依赖函数
 * @param t - 第二个参数，传递给依赖函数
 * @param r - 第三个参数，传递给依赖函数
 * @param n - 第四个参数，传递给依赖函数
 * @param o - 第五个参数，传递给依赖函数
 * 
 * @returns Promise，解析为迭代器的值或下一次next()调用的结果
 * 
 * @remarks
 * 该函数依赖模块906636中的函数来创建异步迭代器，
 * 然后调用其next()方法获取第一个结果，
 * 根据done状态决定是返回value还是继续迭代
 */
declare function asyncIteratorHelper<E, T, R, N, O, V>(
  e: E,
  t: T,
  r: R,
  n: N,
  o: O
): Promise<V>;

export = asyncIteratorHelper;
export default asyncIteratorHelper;