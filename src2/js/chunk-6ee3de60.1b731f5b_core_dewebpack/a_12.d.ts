/**
 * Observer 接口 - 用于接收可观察序列的通知
 * @template T 被观察值的类型
 */
interface Observer<T> {
  /**
   * 指示观察者是否已关闭，不再接收通知
   */
  closed: boolean;

  /**
   * 接收下一个值的通知
   * @param value - 从可观察序列发出的值
   */
  next(value: T): void;

  /**
   * 接收错误通知
   * @param error - 发生的错误对象
   * @throws 如果启用了已弃用的同步错误处理模式，则直接抛出错误
   */
  error(error: unknown): void;

  /**
   * 接收完成通知，表示序列已成功结束
   */
  complete(): void;
}

/**
 * 空观察者实例 - 一个不执行任何操作的观察者
 * 用作默认观察者或占位符
 * @constant
 */
declare const emptyObserver: Observer<unknown>;

export { Observer, emptyObserver };