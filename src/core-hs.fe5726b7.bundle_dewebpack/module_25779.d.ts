/**
 * 对象池管理器
 * 用于复用对象实例，减少频繁创建和销毁对象的性能开销
 */
export declare class ObjectPool {
  /**
   * 单例实例
   * @private
   */
  private static ins?: ObjectPool;

  /**
   * 按类型存储的对象池
   * key: 对象类型名称
   * value: 该类型的对象实例数组
   * @private
   */
  private _poolByType: Map<string, any[]>;

  /**
   * 自定义对象创建器映射
   * key: 对象类型名称
   * value: 创建该类型对象的工厂函数
   * @private
   */
  private _customCreatorByType: Map<string, () => any>;

  /**
   * 构造函数
   * 初始化对象池和创建器映射
   */
  constructor();

  /**
   * 获取单例实例
   * @returns ObjectPool 单例实例
   */
  static getInstance(): ObjectPool;

  /**
   * 从对象池中获取指定类型的对象
   * 如果池中有可用的已释放对象，则重置并返回；否则创建新对象
   * @param type - 对象类型名称（字符串形式的类名）
   * @returns 对象实例（引用计数+1）
   */
  get(type: string): any;

  /**
   * 注册自定义对象创建器
   * @param type - 对象类型名称
   * @param creator - 创建该类型对象的工厂函数
   */
  registerCreator(type: string, creator: () => any): void;

  /**
   * 从对象池中查找可用的（已释放的）对象
   * @param type - 对象类型名称
   * @returns 可用的对象实例，如果没有则返回 undefined
   * @private
   */
  private _findAvailableObjectFromPool(type: string): any | undefined;

  /**
   * 将对象添加到对象池
   * @param type - 对象类型名称
   * @param obj - 要添加的对象实例
   * @private
   */
  private _addObjectToPool(type: string, obj: any): void;

  /**
   * 打印对象池状态到控制台
   * 显示每种类型的对象使用情况和未释放对象的详细信息
   */
  logPoolStatus(): void;
}

/**
 * 可释放对象接口
 * 对象池中的对象需要实现此接口
 */
export interface IDisposable {
  /**
   * 标识对象是否已释放
   */
  xIsDisposed: boolean;

  /**
   * 重置对象状态，准备复用
   */
  xReset(): void;
}

/**
 * 引用计数对象接口
 * 对象池中的对象需要实现此接口
 */
export interface IRefCounted {
  /**
   * 增加引用计数
   * @returns 对象自身（支持链式调用）
   */
  xAddRef(): this;

  /**
   * 调试信息（用于日志输出）
   */
  xDebugInfo?: string;
}