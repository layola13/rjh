/**
 * 延迟创建 Observable，直到订阅时才执行工厂函数
 * 
 * @template T - Observable 发出值的类型
 * @param observableFactory - 返回 Observable 或类 Observable 对象的工厂函数
 * @returns 一个新的 Observable，在订阅时执行工厂函数
 * 
 * @remarks
 * 此函数会延迟 Observable 的创建，直到有订阅者订阅时才调用工厂函数。
 * 如果工厂函数抛出错误，错误会被传递给订阅者。
 * 如果工厂函数返回假值（null/undefined），则返回空的 Observable。
 */
export declare function a<T>(
  observableFactory: () => ObservableInput<T> | void | null | undefined
): Observable<T>;

/**
 * Observable 类型 - 表示随时间推送多个值的数据流
 * 
 * @template T - Observable 发出值的类型
 */
declare class Observable<T> {
  /**
   * 订阅此 Observable
   * 
   * @param observer - 观察者对象或回调函数
   * @returns 订阅对象，可用于取消订阅
   */
  subscribe(observer: Partial<Observer<T>>): Subscription;
}

/**
 * 观察者接口 - 定义如何接收 Observable 的通知
 * 
 * @template T - 接收值的类型
 */
interface Observer<T> {
  /** 接收下一个值 */
  next: (value: T) => void;
  /** 接收错误通知 */
  error: (err: unknown) => void;
  /** 接收完成通知 */
  complete: () => void;
}

/**
 * Observable 输入类型 - 可以转换为 Observable 的类型联合
 * 
 * @template T - 值的类型
 */
type ObservableInput<T> = 
  | Observable<T> 
  | Promise<T> 
  | Iterable<T> 
  | ArrayLike<T>;

/**
 * 订阅对象 - 表示可释放的资源
 */
interface Subscription {
  /** 取消订阅并释放资源 */
  unsubscribe(): void;
  /** 订阅是否已关闭 */
  readonly closed: boolean;
}