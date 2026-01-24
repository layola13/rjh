/**
 * 异步任务调度器类
 * 继承自基础调度器，用于管理和执行异步任务队列
 * @module AsyncScheduler
 */

import { Scheduler } from './Scheduler';
import { Action } from './Action';
import { Subscription } from './Subscription';

/**
 * 异步调度器实现
 * 用于按顺序执行异步任务，支持延迟执行和任务队列管理
 * @extends Scheduler
 */
export declare class AsyncScheduler extends Scheduler {
  /**
   * 当前待执行的任务队列
   */
  actions: Array<Action<unknown>>;

  /**
   * 调度器是否正在执行任务
   */
  active: boolean;

  /**
   * 已调度任务的标识符（通常是 setTimeout 返回的 ID）
   */
  scheduled: number | undefined;

  /**
   * 静态委托调度器
   * 当设置时，所有调度操作将委托给此调度器
   */
  static delegate?: AsyncScheduler;

  /**
   * 创建异步调度器实例
   * @param schedulerActionCtor - 调度器动作的构造函数
   * @param now - 获取当前时间戳的函数，默认使用 Date.now
   */
  constructor(
    schedulerActionCtor: typeof Action,
    now?: () => number
  );

  /**
   * 调度一个任务
   * @template T - 任务状态的类型
   * @param work - 要执行的工作函数
   * @param delay - 延迟执行的毫秒数，默认为 0
   * @param state - 传递给工作函数的状态对象
   * @returns 返回可用于取消任务的订阅对象
   */
  schedule<T>(
    work: (this: Action<T>, state?: T) => void,
    delay?: number,
    state?: T
  ): Subscription;

  /**
   * 刷新任务队列，执行待处理的任务
   * 如果调度器已在执行中，将任务加入队列
   * 否则立即开始执行任务队列
   * @param action - 要刷新的动作对象
   * @throws 如果任务执行过程中抛出错误，会清空队列并重新抛出
   */
  flush(action: Action<unknown>): void;
}