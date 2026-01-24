/**
 * 异步调度器模块
 * 
 * 该模块导出一个异步调度器类，用于管理和执行异步操作的调度。
 * 它继承自基础调度器，并提供了任务队列管理和执行能力。
 * 
 * @module AsyncScheduler
 */

/**
 * 调度器操作接口
 * 
 * 表示一个可调度的操作单元
 */
export interface SchedulerAction<T> {
  /** 操作的状态数据 */
  state: T;
  
  /** 延迟执行时间（毫秒） */
  delay: number;
  
  /**
   * 执行该操作
   * 
   * @param state - 操作的状态
   * @param delay - 延迟时间
   * @returns 如果执行出错则返回错误对象，成功返回 undefined
   */
  execute(state: T, delay: number): Error | undefined;
  
  /**
   * 取消订阅/清理该操作
   */
  unsubscribe(): void;
}

/**
 * 调度器工作函数类型
 * 
 * @template T - 工作状态的类型
 * @param state - 当前状态
 * @returns 可选的订阅对象或 void
 */
export type SchedulerWork<T> = (state?: T) => Subscription | void;

/**
 * 订阅接口
 */
export interface Subscription {
  /** 取消订阅 */
  unsubscribe(): void;
}

/**
 * 时间提供者函数类型
 * 
 * @returns 当前时间戳（毫秒）
 */
export type TimeProvider = () => number;

/**
 * 异步调度器类
 * 
 * 该调度器使用异步队列管理任务执行。所有调度的操作会被添加到队列中，
 * 并在事件循环的下一个时刻依次执行。
 * 
 * @template T - 调度操作的状态类型
 * 
 * @example
 *