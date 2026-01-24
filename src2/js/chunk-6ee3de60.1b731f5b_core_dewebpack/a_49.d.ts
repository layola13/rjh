/**
 * RxJS Subscriber 类型定义
 * 实现了观察者模式的订阅者接口
 */

/**
 * 观察者接口
 * @template T - 观察值的类型
 */
interface Observer<T> {
  /**
   * 接收下一个值
   * @param value - 要处理的值
   */
  next?: (value: T) => void;
  
  /**
   * 处理错误
   * @param err - 错误对象
   */
  error?: (err: unknown) => void;
  
  /**
   * 完成通知
   */
  complete?: () => void;
}

/**
 * 订阅接口
 */
interface Subscription {
  /**
   * 是否已关闭
   */
  closed: boolean;
  
  /**
   * 取消订阅
   */
  unsubscribe(): void;
  
  /**
   * 添加子订阅
   * @param teardown - 要添加的清理函数或订阅
   */
  add(teardown: Subscription | (() => void)): Subscription;
}

/**
 * 订阅者配置
 * @deprecated 使用 useDeprecatedSynchronousErrorHandling 已废弃
 */
interface Config {
  /**
   * 是否使用已废弃的同步错误处理
   * @deprecated 此选项已废弃，将在未来版本中移除
   */
  useDeprecatedSynchronousErrorHandling: boolean;
}

/**
 * 核心订阅者类
 * 继承自 Subscription 并实现 Observer 接口
 * @template T - 观察值的类型
 */
declare class Subscriber<T> extends Subscription implements Observer<T> {
  /**
   * 同步错误值
   * @deprecated 仅在 useDeprecatedSynchronousErrorHandling 为 true 时使用
   */
  syncErrorValue: unknown | null;
  
  /**
   * 是否抛出了同步错误
   * @deprecated 仅在 useDeprecatedSynchronousErrorHandling 为 true 时使用
   */
  syncErrorThrown: boolean;
  
  /**
   * 是否可以抛出同步错误
   * @deprecated 仅在 useDeprecatedSynchronousErrorHandling 为 true 时使用
   */
  syncErrorThrowable: boolean;
  
  /**
   * 是否已停止接收值
   */
  isStopped: boolean;
  
  /**
   * 目标观察者
   */
  protected destination: Observer<T>;
  
  /**
   * 父订阅（内部使用）
   * @internal
   */
  protected _parent: Subscriber<unknown> | null;
  
  /**
   * 父订阅列表（内部使用）
   * @internal
   */
  protected _parents: Subscriber<unknown>[] | null;
  
  /**
   * 父订阅引用（内部使用）
   * @internal
   */
  protected _parentSubscription: Subscription | null;
  
  /**
   * 构造函数
   * @param destinationOrNext - 目标观察者或 next 回调函数
   * @param error - 错误处理回调
   * @param complete - 完成处理回调
   */
  constructor(
    destinationOrNext?: Observer<T> | ((value: T) => void),
    error?: (e: unknown) => void,
    complete?: () => void
  );
  
  /**
   * 创建订阅者实例（工厂方法）
   * @param next - next 回调函数
   * @param error - 错误处理回调
   * @param complete - 完成处理回调
   * @returns 新的订阅者实例，syncErrorThrowable 设置为 false
   */
  static create<T>(
    next?: ((value: T) => void) | null,
    error?: ((e: unknown) => void) | null,
    complete?: (() => void) | null
  ): Subscriber<T>;
  
  /**
   * 接收下一个值
   * @param value - 要处理的值
   */
  next(value: T): void;
  
  /**
   * 处理错误
   * @param err - 错误对象
   */
  error(err: unknown): void;
  
  /**
   * 完成通知
   */
  complete(): void;
  
  /**
   * 取消订阅
   */
  unsubscribe(): void;
  
  /**
   * 内部 next 实现
   * @param value - 要处理的值
   * @protected
   */
  protected _next(value: T): void;
  
  /**
   * 内部 error 实现
   * @param err - 错误对象
   * @protected
   */
  protected _error(err: unknown): void;
  
  /**
   * 内部 complete 实现
   * @protected
   */
  protected _complete(): void;
  
  /**
   * 取消订阅并回收订阅者实例
   * @returns 回收后的订阅者实例
   * @protected
   */
  protected _unsubscribeAndRecycle(): Subscriber<T>;
  
  /**
   * 支持迭代器协议
   * @returns 返回自身
   */
  [Symbol.observable](): this;
}

/**
 * 安全订阅者类
 * 包装用户提供的观察者回调，提供错误处理
 * @template T - 观察值的类型
 */
declare class SafeSubscriber<T> extends Subscriber<T> {
  /**
   * 父订阅者引用
   * @internal
   */
  private _parentSubscriber: Subscriber<T>;
  
  /**
   * 执行上下文
   * @internal
   */
  private _context: unknown;
  
  /**
   * next 回调函数
   * @internal
   */
  private _next?: (value: T) => void;
  
  /**
   * error 回调函数
   * @internal
   */
  private _error?: (err: unknown) => void;
  
  /**
   * complete 回调函数
   * @internal
   */
  private _complete?: () => void;
  
  /**
   * 构造函数
   * @param parentSubscriber - 父订阅者
   * @param observerOrNext - 观察者对象或 next 回调
   * @param error - 错误处理回调
   * @param complete - 完成处理回调
   */
  constructor(
    parentSubscriber: Subscriber<T>,
    observerOrNext?: Observer<T> | ((value: T) => void),
    error?: (e: unknown) => void,
    complete?: () => void
  );
  
  /**
   * 接收下一个值（带错误处理）
   * @param value - 要处理的值
   */
  next(value: T): void;
  
  /**
   * 处理错误（带错误处理）
   * @param err - 错误对象
   */
  error(err: unknown): void;
  
  /**
   * 完成通知（带错误处理）
   */
  complete(): void;
  
  /**
   * 尝试执行回调或取消订阅
   * @param fn - 要执行的函数
   * @param value - 传递给函数的值
   * @private
   */
  private __tryOrUnsub(fn: (value: T) => void, value: T): void;
  
  /**
   * 尝试执行回调或设置错误
   * @param parent - 父订阅者
   * @param fn - 要执行的函数
   * @param value - 传递给函数的值
   * @returns 是否发生错误
   * @deprecated 仅在 useDeprecatedSynchronousErrorHandling 为 true 时使用
   * @private
   */
  private __tryOrSetError(
    parent: Subscriber<T>,
    fn: (value?: T) => void,
    value?: T
  ): boolean;
  
  /**
   * 内部取消订阅实现
   * @protected
   */
  protected _unsubscribe(): void;
}

/**
 * 空观察者
 * 用作默认的目标观察者
 */
declare const empty: Observer<unknown>;

export { Subscriber, SafeSubscriber, Observer, Subscription, Config, empty };