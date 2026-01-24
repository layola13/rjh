/**
 * Module: module_value
 * Original ID: value
 * 
 * 根据条件返回带有历史记录切片的流或普通可观察流
 */

/**
 * 获取指定键的流数据，可选地包含历史记录切片
 * 
 * @template T - 流数据的类型
 * @template K - 流键的类型
 * 
 * @param streamKey - 要选择的流的键
 * @param historySliceSize - 可选的历史记录切片大小。如果提供有效整数且流有历史设置，则返回带历史的流
 * 
 * @returns 返回一个 Observable，根据条件包含或不包含历史记录切片
 * 
 * @remarks
 * - 当 historySliceSize 是整数且该流键存在于历史设置中时，返回带切片历史的流
 * - 否则返回普通的可观察流
 */
declare function getStreamValue<T = unknown, K extends string = string>(
  streamKey: K,
  historySliceSize?: number
): Observable<T>;

/**
 * 内部方法：选择指定键的流
 * 
 * @template T - 流数据类型
 * @param streamKey - 流的键
 * @returns 返回选中的流对象
 */
declare function _selectStream<T = unknown>(streamKey: string): StreamSubject<T>;

/**
 * 内部方法：获取带有切片历史记录的流
 * 
 * @template T - 流数据类型
 * @param streamKey - 流的键
 * @param sliceSize - 历史记录切片的数量
 * @returns 返回包含历史数据的 Observable
 */
declare function _getStreamWithSlicedHistory<T = unknown>(
  streamKey: string,
  sliceSize: number
): Observable<T>;

/**
 * 流主题接口，扩展自 Observable
 */
interface StreamSubject<T> {
  /**
   * 转换为标准 Observable
   */
  asObservable(): Observable<T>;
}

/**
 * 历史设置管理接口
 */
interface HistorySettings {
  /**
   * 检查是否存在指定键的历史设置
   * @param key - 要检查的键
   */
  has(key: string): boolean;
}

/**
 * Observable 接口定义（简化版，实际应使用 RxJS 类型）
 */
interface Observable<T> {
  subscribe(observer?: Partial<Observer<T>>): Subscription;
  pipe<R>(...operations: OperatorFunction<any, any>[]): Observable<R>;
}

interface Observer<T> {
  next: (value: T) => void;
  error: (err: any) => void;
  complete: () => void;
}

interface Subscription {
  unsubscribe(): void;
}

type OperatorFunction<T, R> = (source: Observable<T>) => Observable<R>;

/**
 * 包含该方法的类上下文接口
 */
interface StreamManager {
  /** 历史设置存储 */
  _historySettings: HistorySettings;
  
  /** 选择流的内部方法 */
  _selectStream<T>(streamKey: string): StreamSubject<T>;
  
  /** 获取带切片历史的流的内部方法 */
  _getStreamWithSlicedHistory<T>(streamKey: string, sliceSize: number): Observable<T>;
  
  /** 主方法：获取流值 */
  getStreamValue<T>(streamKey: string, historySliceSize?: number): Observable<T>;
}