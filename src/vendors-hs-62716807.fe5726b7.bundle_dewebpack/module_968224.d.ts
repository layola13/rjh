/**
 * React Hook模块 - 订阅状态管理
 * @module useSubscription
 * @description 提供一个自定义Hook用于订阅和管理外部状态变化
 */

/**
 * 状态对象的泛型接口
 * @template T - 状态数据的类型
 */
export interface SubscriptionState<T = Record<string, unknown>> {
  [key: string]: T;
}

/**
 * 订阅管理器接口
 * @description 定义订阅/取消订阅的标准接口
 */
export interface SubscriptionManager<T = SubscriptionState> {
  /**
   * 订阅状态变化
   * @param callback - 当状态更新时调用的回调函数
   * @returns 订阅ID,用于后续取消订阅
   */
  subscribe(callback: (state: T) => void): string | number;

  /**
   * 取消订阅
   * @param subscriptionId - subscribe方法返回的订阅ID
   */
  unsubscribe(subscriptionId: string | number): void;
}

/**
 * 自定义Hook: 订阅外部状态管理器
 * @template T - 状态对象的类型,默认为空对象
 * @returns 当前订阅的状态对象
 * 
 * @example
 *