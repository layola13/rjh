/**
 * Vue Apollo Smart Query/Subscription 初始化模块
 * 处理skip选项和pollInterval选项的监听设置
 */

/**
 * Smart Query/Subscription 选项配置
 */
interface SmartOptions {
  /**
   * 控制查询是否跳过执行
   * - 布尔值：静态控制跳过状态
   * - 函数：动态计算是否跳过
   */
  skip?: boolean | ((vm: Vue, key: string) => boolean);
  
  /**
   * 是否深度监听skip函数的依赖
   * @default false
   */
  deep?: boolean;
  
  /**
   * 轮询间隔时间（毫秒）
   * - 数字：固定轮询间隔
   * - 函数：动态计算轮询间隔
   */
  pollInterval?: number | (() => number);
}

/**
 * Smart Query/Subscription 实例
 * 管理GraphQL查询/订阅的生命周期和响应式行为
 */
interface SmartQuerySubscription {
  /**
   * Vue组件实例
   */
  readonly vm: Vue;
  
  /**
   * 查询/订阅的键名
   */
  readonly key: string;
  
  /**
   * 配置选项
   */
  readonly options: SmartOptions;
  
  /**
   * skip选项的观察者
   * 用于响应式地监听skip函数的返回值变化
   */
  _skipWatcher?: WatcherInstance;
  
  /**
   * 静态skip标志
   * 当skip为布尔值true时使用
   */
  _skip?: boolean;
  
  /**
   * pollInterval选项的观察者
   * 用于响应式地监听轮询间隔的变化
   */
  _pollWatcher?: WatcherInstance;
  
  /**
   * 启动查询/订阅
   */
  start(): void;
  
  /**
   * skip状态变化的回调处理函数
   * @param newValue - 新的skip值
   * @param oldValue - 旧的skip值
   */
  skipChanged(newValue: boolean, oldValue: boolean): void;
  
  /**
   * 轮询间隔变化的回调处理函数
   * @param newValue - 新的轮询间隔
   * @param oldValue - 旧的轮询间隔
   */
  pollIntervalChanged(newValue: number, oldValue: number): void;
}

/**
 * Vue观察者实例
 */
interface WatcherInstance {
  /**
   * 取消观察
   */
  (): void;
}

/**
 * Vue实例接口扩展
 */
interface Vue {
  /**
   * 观察Vue实例上的响应式属性变化
   * @param expOrFn - 表达式或计算函数
   * @param callback - 值变化时的回调函数
   * @param options - 观察选项
   * @returns 取消观察的函数
   */
  $watch<T = any>(
    expOrFn: string | (() => T),
    callback: (newValue: T, oldValue: T) => void,
    options?: WatchOptions
  ): WatcherInstance;
}

/**
 * $watch方法的选项配置
 */
interface WatchOptions {
  /**
   * 是否在创建观察者时立即触发回调
   * @default false
   */
  immediate?: boolean;
  
  /**
   * 是否深度监听对象内部值的变化
   * @default false
   */
  deep?: boolean;
}

/**
 * 初始化Smart Query/Subscription的skip和pollInterval监听
 * 此函数在Smart Query/Subscription实例创建时调用
 * 
 * @this SmartQuerySubscription - Smart Query/Subscription实例上下文
 * 
 * @remarks
 * 处理逻辑：
 * 1. 如果skip是函数：创建观察者监听函数返回值变化
 * 2. 如果skip是true：设置内部跳过标志
 * 3. 如果skip是false或未定义：启动查询/订阅
 * 4. 如果pollInterval是函数：创建观察者监听轮询间隔变化
 */
declare function initializeSmartWatchers(this: SmartQuerySubscription): void;

export { SmartOptions, SmartQuerySubscription, WatcherInstance, Vue, WatchOptions, initializeSmartWatchers };