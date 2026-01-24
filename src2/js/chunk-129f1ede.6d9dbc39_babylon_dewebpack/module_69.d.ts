/**
 * 异步任务 ID 计数器
 * 用于生成唯一的异步任务标识符
 */
declare let asyncIdCounter: number;

/**
 * 异步任务队列映射表
 * 键为异步任务 ID，值为待执行的回调函数
 */
declare const asyncTaskQueue: Record<number, (() => void) | undefined>;

/**
 * 调度一个异步任务到微任务队列
 * 使用 Promise.resolve() 实现基于 Promise 的微任务调度
 * 
 * @param callback - 待调度执行的回调函数
 * @returns 返回分配给该任务的唯一 ID
 * 
 * @example
 * const taskId = scheduleAsyncTask(() => {
 *   console.log('Task executed');
 * });
 */
declare function scheduleAsyncTask(callback: () => void): number;

/**
 * 异步调度器动作（Action）
 * 继承自基础 AsyncAction，用于管理异步任务的调度和执行
 * 
 * @template T - 动作状态的类型
 */
declare class AsynchronousAction<T> extends BaseAsyncAction<T> {
  /**
   * 所属的调度器实例
   */
  scheduler: AsynchronousScheduler<T>;

  /**
   * 待执行的工作函数
   */
  work: (this: SchedulerAction<T>, state?: T) => void;

  /**
   * 创建异步动作实例
   * 
   * @param scheduler - 所属的调度器实例
   * @param work - 待执行的工作函数
   */
  constructor(
    scheduler: AsynchronousScheduler<T>,
    work: (this: SchedulerAction<T>, state?: T) => void
  );

  /**
   * 请求异步 ID 用于任务调度
   * 
   * 如果 delay 为 null、0 或未定义，则将任务加入调度器的 actions 队列，
   * 并使用微任务调度器安排执行；否则调用父类方法使用定时器调度
   * 
   * @param scheduler - 调度器实例
   * @param id - 可选的现有异步 ID
   * @param delay - 延迟时间（毫秒），默认为 0
   * @returns 返回异步任务 ID
   */
  requestAsyncId(
    scheduler: AsynchronousScheduler<T>,
    id?: number,
    delay?: number
  ): number;

  /**
   * 回收异步 ID 资源
   * 
   * 如果存在延迟或 delay 参数大于 0，则调用父类方法；
   * 否则在调度器动作队列为空时清理调度状态
   * 
   * @param scheduler - 调度器实例
   * @param id - 要回收的异步 ID
   * @param delay - 延迟时间（毫秒），默认为 null
   * @returns 返回回收后的 ID 或 undefined
   */
  recycleAsyncId(
    scheduler: AsynchronousScheduler<T>,
    id?: number,
    delay?: number
  ): number | undefined;
}

/**
 * 异步调度器（Asynchronous Scheduler）
 * 继承自基础 AsyncScheduler，使用微任务队列管理任务执行
 * 
 * @template T - 调度器状态的类型
 */
declare class AsynchronousScheduler<T> extends BaseAsyncScheduler<T> {
  /**
   * 待执行的动作队列
   */
  actions: Array<AsynchronousAction<T>>;

  /**
   * 是否处于活动执行状态
   */
  active: boolean;

  /**
   * 当前调度的异步任务 ID
   */
  scheduled?: number;

  /**
   * 刷新执行队列中的所有动作
   * 
   * 按顺序执行队列中的所有动作，如果任何动作抛出错误，
   * 会取消后续动作的订阅并重新抛出错误
   * 
   * @param action - 可选的初始动作，若未提供则从队列头部取出
   * @throws 如果任何动作执行失败，会抛出对应的错误
   */
  flush(action?: AsynchronousAction<T>): void;
}

/**
 * 异步调度器单例实例
 * 用于全局异步任务调度，基于 Promise 微任务实现
 * 
 * @example
 * import { asynchronous } from 'rxjs/scheduler';
 * 
 * observable.pipe(
 *   delay(0, asynchronous)
 * ).subscribe();
 */
export declare const asynchronous: AsynchronousScheduler<unknown>;

/**
 * 基础异步动作接口（来自依赖模块）
 */
interface BaseAsyncAction<T> {
  execute(state: T, delay: number): unknown;
  unsubscribe(): void;
  delay: number;
}

/**
 * 基础异步调度器接口（来自依赖模块）
 */
interface BaseAsyncScheduler<T> {
  // 基础调度器属性和方法
}

/**
 * 调度器动作接口
 */
interface SchedulerAction<T> {
  schedule(state?: T, delay?: number): void;
}