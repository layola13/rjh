/**
 * 表示一个可以被取消订阅的对象的主题
 */
interface Subject<T> {
  /** 观察者数组 */
  observers: Observer<T>[];
  /** 是否已停止 */
  isStopped: boolean;
  /** 是否已关闭 */
  closed: boolean;
}

/**
 * 观察者接口
 */
interface Observer<T> {
  // 观察者基本属性
}

/**
 * 订阅基类
 */
declare class Subscription {
  /** 是否已关闭 */
  closed: boolean;
  
  /**
   * 取消订阅
   */
  unsubscribe(): void;
}

/**
 * 主题订阅类
 * 将订阅者连接到主题，并在取消订阅时从主题的观察者列表中移除
 * 
 * @template T 主题发出的值的类型
 */
export declare class SubjectSubscription<T> extends Subscription {
  /** 关联的主题 */
  private subject: Subject<T> | null;
  
  /** 订阅的观察者 */
  private subscriber: Observer<T>;
  
  /** 订阅是否已关闭 */
  closed: boolean;

  /**
   * 创建一个新的主题订阅
   * 
   * @param subject - 要订阅的主题
   * @param subscriber - 执行订阅的观察者
   */
  constructor(subject: Subject<T>, subscriber: Observer<T>);

  /**
   * 取消订阅并从主题的观察者列表中移除订阅者
   * 
   * 此方法会：
   * 1. 标记订阅为已关闭
   * 2. 从主题的观察者数组中移除订阅者
   * 3. 清空对主题的引用
   * 
   * 如果主题已停止、已关闭或观察者列表为空，则不执行移除操作
   */
  unsubscribe(): void;
}