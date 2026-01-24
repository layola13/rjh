/**
 * Subscription管理类 - 用于管理可观察对象的订阅生命周期
 * 提供订阅的添加、移除和取消订阅功能
 */
export declare class Subscription {
  /**
   * 标识订阅是否已关闭
   */
  closed: boolean;

  /**
   * 父订阅引用（单个父级）
   * @private
   */
  private _parent: Subscription | null;

  /**
   * 多个父订阅引用数组
   * @private
   */
  private _parents: Subscription[] | null;

  /**
   * 取消订阅时执行的清理函数
   * @private
   */
  private _unsubscribe?: (() => void) | void;

  /**
   * 子订阅集合
   * @private
   */
  private _subscriptions: (Subscription | TeardownLogic)[] | null;

  /**
   * 空订阅单例 - 用于表示无操作的订阅
   */
  static readonly EMPTY: Subscription;

  /**
   * 创建新的订阅实例
   * @param unsubscribe - 可选的取消订阅回调函数
   */
  constructor(unsubscribe?: () => void);

  /**
   * 取消订阅并执行所有清理逻辑
   * 释放父子订阅关系，执行清理函数
   * @throws {UnsubscriptionError} 当清理过程中发生错误时抛出
   */
  unsubscribe(): void;

  /**
   * 添加子订阅或清理资源
   * @param teardown - 要添加的订阅、清理函数或其他资源
   * @returns 返回添加的订阅对象，如果无效则返回EMPTY
   */
  add(teardown: TeardownLogic): Subscription;

  /**
   * 从当前订阅中移除子订阅
   * @param subscription - 要移除的订阅对象
   */
  remove(subscription: Subscription): void;

  /**
   * 内部方法 - 添加父订阅引用
   * @param parent - 父订阅对象
   * @private
   */
  private _addParent(parent: Subscription): void;
}

/**
 * 清理逻辑类型定义
 * 可以是订阅对象、清理函数或void
 */
export type TeardownLogic = Subscription | (() => void) | void;

/**
 * 扁平化错误数组的辅助函数
 * 将嵌套的UnsubscriptionError错误展开为一维数组
 * @param errors - 错误数组（可能包含嵌套的UnsubscriptionError）
 * @returns 扁平化后的错误数组
 */
declare function flattenErrors(errors: any[]): any[];

/**
 * 取消订阅错误类
 * 当unsubscribe过程中发生一个或多个错误时抛出
 */
export declare class UnsubscriptionError extends Error {
  readonly errors: any[];
  constructor(errors: any[]);
}