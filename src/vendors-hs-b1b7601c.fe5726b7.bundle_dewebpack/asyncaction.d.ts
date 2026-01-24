/**
 * AsyncAction - 异步操作调度器
 * 用于在调度器中执行异步任务，支持延迟执行和取消操作
 */

import { Action } from './Action';
import { SchedulerLike } from './types/scheduler';

/**
 * 异步操作类，继承自 Action
 * 负责管理异步任务的调度、执行和取消
 * 
 * @template T 状态类型
 */
export declare class AsyncAction<T> extends Action<T> {
  /**
   * 调度器实例
   */
  scheduler: SchedulerLike;

  /**
   * 要执行的工作函数
   */
  work: ((this: AsyncAction<T>, state?: T) => void) | null;

  /**
   * 操作是否处于待执行状态
   */
  pending: boolean;

  /**
   * 异步操作的唯一标识符（定时器ID）
   */
  id: ReturnType<typeof setInterval> | null;

  /**
   * 延迟执行的时间（毫秒）
   */
  delay: number | null;

  /**
   * 操作的状态数据
   */
  state?: T;

  /**
   * 构造函数
   * @param scheduler 调度器实例
   * @param work 要执行的工作函数
   */
  constructor(
    scheduler: SchedulerLike,
    work: (this: AsyncAction<T>, state?: T) => void
  );

  /**
   * 调度操作执行
   * @param state 传递给工作函数的状态
   * @param delay 延迟时间（毫秒），默认为 0
   * @returns 返回自身以支持链式调用
   */
  schedule(state?: T, delay?: number): this;

  /**
   * 请求异步操作ID（设置定时器）
   * @param scheduler 调度器实例
   * @param id 现有的操作ID（如果有）
   * @param delay 延迟时间（毫秒），默认为 0
   * @returns 新的操作ID
   */
  requestAsyncId(
    scheduler: SchedulerLike,
    id: ReturnType<typeof setInterval> | null,
    delay?: number
  ): ReturnType<typeof setInterval>;

  /**
   * 回收异步操作ID（清除定时器）
   * @param scheduler 调度器实例
   * @param id 要回收的操作ID
   * @param delay 延迟时间（毫秒），默认为 0
   * @returns 如果操作可以复用则返回ID，否则返回 undefined
   */
  recycleAsyncId(
    scheduler: SchedulerLike,
    id: ReturnType<typeof setInterval> | null,
    delay?: number
  ): ReturnType<typeof setInterval> | undefined;

  /**
   * 执行操作
   * @param state 传递给工作函数的状态
   * @param delay 延迟时间
   * @returns 如果执行出错则返回 Error，否则返回 undefined
   */
  execute(state: T, delay: number): Error | undefined;

  /**
   * 内部执行方法
   * @param state 传递给工作函数的状态
   * @param delay 延迟时间
   * @returns 如果执行出错则返回 Error，否则返回 undefined
   * @protected
   */
  protected _execute(state: T, delay: number): Error | undefined;

  /**
   * 取消订阅并清理资源
   * 会清除定时器、重置状态并从调度器中移除此操作
   */
  unsubscribe(): void;
}