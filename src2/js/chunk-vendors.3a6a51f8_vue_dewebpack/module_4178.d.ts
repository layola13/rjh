/**
 * 跨平台异步任务调度模块
 * 提供类似 setImmediate/clearImmediate 的功能，在不同环境下使用最优的异步执行策略
 */

/**
 * 任务回调函数类型
 */
type TaskCallback = (...args: any[]) => void;

/**
 * 任务ID类型
 */
type TaskId = number;

/**
 * 任务存储映射表类型
 */
interface TaskStore {
  [taskId: number]: () => void;
}

/**
 * 调度器函数类型
 * @param taskId - 要执行的任务ID
 */
type SchedulerFunction = (taskId: TaskId) => void;

/**
 * 全局环境对象类型
 */
interface GlobalEnvironment {
  process?: NodeJS.Process;
  setImmediate?: (callback: (...args: any[]) => void, ...args: any[]) => number;
  clearImmediate?: (id: number) => void;
  MessageChannel?: typeof MessageChannel;
  Dispatch?: {
    now: (callback: () => void) => void;
  };
  addEventListener?: (type: string, listener: EventListener, options?: boolean | AddEventListenerOptions) => void;
  postMessage?: (message: any, targetOrigin: string) => void;
  importScripts?: (...urls: string[]) => void;
}

/**
 * 部分应用函数工具类型
 */
type PartialApply = <T extends (...args: any[]) => any>(
  fn: T,
  context: any,
  ...boundArgs: any[]
) => (...args: any[]) => ReturnType<T>;

/**
 * 函数调用工具类型
 */
type InvokeFunction = (fn: Function | string, args: any[]) => void;

/**
 * 创建DOM元素工具类型
 */
type CreateElement = (tagName: string) => HTMLElement;

/**
 * 类型检查工具类型
 */
type ClassOf = (value: any) => string;

/**
 * 异步任务调度器导出接口
 */
export interface TaskScheduler {
  /**
   * 设置一个异步任务，在下一个事件循环中执行
   * @param callback - 要执行的回调函数
   * @param args - 传递给回调函数的参数
   * @returns 任务ID，可用于取消任务
   */
  set(callback: TaskCallback, ...args: any[]): TaskId;

  /**
   * 取消一个待执行的异步任务
   * @param taskId - 要取消的任务ID
   */
  clear(taskId: TaskId): void;
}

/**
 * 默认导出：任务调度器实例
 */
declare const taskScheduler: TaskScheduler;
export default taskScheduler;

/**
 * 命名导出
 */
export const set: TaskScheduler['set'];
export const clear: TaskScheduler['clear'];