/**
 * Observable操作符接口
 * 用于在lift操作中转换Observable流
 */
export interface Operator<T, R> {
  /**
   * 调用操作符,将源Observable转换为目标类型
   * @param subscriber - 订阅者对象
   * @param source - 源Observable
   */
  call(subscriber: Subscriber<R>, source: Observable<T>): TeardownLogic;
}

/**
 * 订阅者接口
 * 定义观察者的回调方法
 */
export interface Subscriber<T> {
  /** 下一个值的回调 */
  next?(value: T): void;
  /** 错误回调 */
  error?(err: unknown): void;
  /** 完成回调 */
  complete?(): void;
  /** 添加清理逻辑 */
  add(teardown: TeardownLogic): void;
  /** 同步错误可抛出标志(已废弃) */
  syncErrorThrowable?: boolean;
  /** 同步错误已抛出标志(已废弃) */
  syncErrorThrown?: boolean;
  /** 同步错误值(已废弃) */
  syncErrorValue?: unknown;
}

/**
 * 订阅清理逻辑类型
 */
export type TeardownLogic = Subscription | Function | void;

/**
 * 订阅对象接口
 */
export interface Subscription {
  /** 取消订阅 */
  unsubscribe(): void;
}

/**
 * 订阅函数类型
 * @param observer - 观察者对象或next回调
 * @param error - 错误回调
 * @param complete - 完成回调
 */
export type SubscribeFn<T> = (
  observer?: Subscriber<T> | ((value: T) => void),
  error?: (error: unknown) => void,
  complete?: () => void
) => TeardownLogic;

/**
 * Promise构造函数接口
 */
export interface PromiseConstructor {
  new <T>(executor: (resolve: (value: T) => void, reject: (reason?: unknown) => void) => void): Promise<T>;
}

/**
 * Observable配置接口
 */
export interface ObservableConfig {
  /** 使用已废弃的同步错误处理(已废弃) */
  useDeprecatedSynchronousErrorHandling?: boolean;
  /** Promise实现 */
  Promise?: PromiseConstructor;
}

/**
 * 可观察对象类
 * 提供响应式编程的核心抽象,表示一个可被订阅的数据流
 * 
 * @template T - 流中数据的类型
 * 
 * @example
 *