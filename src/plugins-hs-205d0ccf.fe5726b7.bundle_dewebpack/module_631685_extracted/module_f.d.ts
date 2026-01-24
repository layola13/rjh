/**
 * 迭代器清理函数
 * 用于安全地关闭迭代器并处理异常
 * 这是 TypeScript/Babel 生成的迭代器辅助函数的一部分
 */

/**
 * 迭代器返回结果接口
 */
interface IteratorReturnResult<TReturn> {
  done: true;
  value: TReturn;
}

/**
 * 可关闭的迭代器接口
 */
interface CloseableIterator<T, TReturn = unknown> extends Iterator<T, TReturn> {
  /**
   * 关闭迭代器并返回最终值
   */
  return?(value?: TReturn): IteratorReturnResult<TReturn>;
}

/**
 * 清理迭代器资源
 * @param r - 是否正常返回（非异常退出）
 * @param n - 迭代器对象
 * @param l - 是否有待抛出的异常
 * @param i - 待抛出的异常对象
 * @throws 如果 l 为 true，则重新抛出异常 i
 */
declare function cleanupIterator<T = unknown, TReturn = unknown>(
  r: boolean,
  n: CloseableIterator<T, TReturn> | null | undefined,
  l: boolean,
  i: Error
): void;

/**
 * 模块导出
 */
export { cleanupIterator, CloseableIterator, IteratorReturnResult };