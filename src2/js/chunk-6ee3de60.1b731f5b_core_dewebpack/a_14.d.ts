/**
 * Observable configuration interface
 * 配置 Observable 实例的选项
 */
export interface ObservableConfig {
  /** Whether the observable is scalar (emits a single value) */
  useDeprecatedSynchronousErrorHandling?: boolean;
  /** Promise constructor to use for toPromise() */
  Promise?: PromiseConstructorLike;
}

/**
 * Subscriber callback function types
 * 订阅者回调函数类型定义
 */
export type NextCallback<T> = (value: T) => void;
export type ErrorCallback = (error: unknown) => void;
export type CompleteCallback = () => void;

/**
 * Subscription interface representing a disposable resource
 * 订阅接口，表示可释放的资源
 */
export interface Subscription {
  /** Disposes the resource held by the subscription */
  unsubscribe(): void;
  /** Adds a tear down to be called during unsubscribe */
  add(teardown: Subscription | (() => void) | null | undefined): void;
  /** Synchronous error handling flag (deprecated) */
  syncErrorThrowable?: boolean;
  syncErrorThrown?: boolean;
  syncErrorValue?: unknown;
}

/**
 * Observer interface for receiving Observable notifications
 * 观察者接口，用于接收 Observable 的通知
 */
export interface Observer<T> {
  /** Called when the Observable emits a value */
  next?: NextCallback<T>;
  /** Called when the Observable errors */
  error?: ErrorCallback;
  /** Called when the Observable completes */
  complete?: CompleteCallback;
}

/**
 * Subscriber extends Subscription and Observer
 * 订阅者，继承订阅和观察者接口
 */
export interface Subscriber<T> extends Subscription, Observer<T> {
  /** Whether this subscriber is closed */
  closed: boolean;
}

/**
 * Operator function type for transforming Observables
 * 操作符函数类型，用于转换 Observable
 */
export type OperatorFunction<T, R> = (source: Observable<T>) => Observable<R>;

/**
 * Unary function type
 * 一元函数类型
 */
export type UnaryFunction<T, R> = (source: T) => R;

/**
 * Observable symbol for subscribable detection
 * Observable 符号，用于可订阅对象检测
 */
export declare const observable: symbol;

/**
 * Main Observable class
 * 主 Observable 类
 * 
 * @template T - The type of values emitted by the Observable
 * 
 * @remarks
 * Observable represents a lazy Push collection of multiple values.
 * It is the core data structure of RxJS.
 * 
 * Observable 代表一个惰性的推送式多值集合，是 RxJS 的核心数据结构。
 */
export declare class Observable<T> {
  /**
   * Internal source Observable (for lifted operations)
   * 内部源 Observable（用于提升操作）
   */
  source?: Observable<unknown>;

  /**
   * Operator to apply when subscribing
   * 订阅时应用的操作符
   */
  operator?: OperatorFunction<unknown, T>;

  /**
   * Whether the Observable emits a single scalar value
   * Observable 是否发出单个标量值
   */
  _isScalar: boolean;

  /**
   * Creates a new Observable with the given subscribe function
   * 使用给定的订阅函数创建新的 Observable
   * 
   * @param subscribe - Function that defines how to subscribe to this Observable
   */
  constructor(subscribe?: (subscriber: Subscriber<T>) => void | (() => void) | Subscription);

  /**
   * Creates a new Observable that when subscribed will use the operator
   * 创建一个新的 Observable，订阅时将使用操作符
   * 
   * @param operator - The operator function to apply
   * @returns A new Observable with the operator applied
   */
  lift<R>(operator: OperatorFunction<T, R>): Observable<R>;

  /**
   * Subscribes to the Observable
   * 订阅 Observable
   * 
   * @param observer - Observer object or next callback
   * @param error - Error callback (optional)
   * @param complete - Complete callback (optional)
   * @returns Subscription that can be used to unsubscribe
   */
  subscribe(observer?: Partial<Observer<T>>): Subscription;
  subscribe(next?: NextCallback<T>, error?: ErrorCallback, complete?: CompleteCallback): Subscription;

  /**
   * Internal subscribe implementation
   * 内部订阅实现
   * 
   * @param subscriber - Subscriber to receive notifications
   * @returns Subscription or void
   */
  _subscribe(subscriber: Subscriber<T>): void | Subscription;

  /**
   * Try-catch wrapper around _subscribe
   * _subscribe 的 try-catch 包装器
   * 
   * @param subscriber - Subscriber to receive notifications
   * @returns Subscription or void
   */
  _trySubscribe(subscriber: Subscriber<T>): void | Subscription;

  /**
   * Executes a callback for each value emitted by the Observable
   * 为 Observable 发出的每个值执行回调
   * 
   * @param next - Callback to execute for each value
   * @param promiseConstructor - Promise constructor to use (optional)
   * @returns Promise that resolves when complete or rejects on error
   */
  forEach(next: NextCallback<T>, promiseConstructor?: PromiseConstructorLike): Promise<void>;

  /**
   * Pipes operators through the Observable
   * 通过 Observable 管道化操作符
   * 
   * @param operations - Operator functions to apply in sequence
   * @returns New Observable with all operators applied
   * 
   * @example
   *