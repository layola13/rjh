/**
 * 迭代器清理辅助函数
 * 确保迭代器在异常情况下正确释放资源
 * 
 * @param iterator - 需要清理的迭代器对象
 * @param hasError - 是否发生了错误
 * @param errorValue - 捕获的错误值
 * @throws 如果hasError为true，则重新抛出errorValue
 */
declare function cleanupIterator<T = unknown>(
  iterator: Iterator<T> | null | undefined,
  hasError: boolean,
  errorValue?: unknown
): void;

/**
 * 迭代器清理函数的实现接口
 */
interface IteratorCleanup {
  /**
   * 执行迭代器的return方法以释放资源
   * @param iterator - 待清理的迭代器
   */
  (iterator: Iterator<unknown> | null | undefined): void;
}

/**
 * 可关闭的迭代器接口
 */
interface CloseableIterator<T> extends Iterator<T> {
  /**
   * 提前终止迭代器并释放资源
   * @returns 迭代结果，通常为done: true
   */
  return?(): IteratorResult<T>;
}