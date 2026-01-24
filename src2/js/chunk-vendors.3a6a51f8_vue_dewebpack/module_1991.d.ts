/**
 * 任务调度模块 - 提供跨平台的异步任务执行机制
 * 
 * 本模块实现了类似 setImmediate/clearImmediate 的功能，
 * 会根据运行环境选择最优的异步执行策略：
 * 1. process.nextTick (Node.js)
 * 2. Dispatch.now (某些环境)
 * 3. MessageChannel (现代浏览器)
 * 4. postMessage (支持的浏览器)
 * 5. script.onreadystatechange (旧版 IE)
 * 6. setTimeout (降级方案)
 */

/**
 * 任务回调函数类型
 */
type TaskCallback = (...args: any[]) => void;

/**
 * 任务 ID 类型
 */
type TaskId = number;

/**
 * 任务存储映射，键为任务 ID，值为待执行的回调函数
 */
interface TaskRegistry {
  [taskId: number]: () => void;
}

/**
 * 全局对象接口（浏览器或 Node.js 环境）
 */
interface GlobalEnvironment {
  process?: NodeJS.Process;
  setImmediate?: (callback: TaskCallback, ...args: any[]) => TaskId;
  clearImmediate?: (taskId: TaskId) => void;
  MessageChannel?: typeof MessageChannel;
  Dispatch?: {
    now: (callback: () => void) => void;
  };
  addEventListener?: (type: string, listener: EventListener, useCapture?: boolean) => void;
  postMessage?: (message: any, targetOrigin: string) => void;
  importScripts?: (...urls: string[]) => void;
}

/**
 * 消息事件接口
 */
interface MessageEventData {
  data: TaskId;
}

/**
 * 任务调度导出接口
 */
export interface TaskScheduler {
  /**
   * 异步执行任务
   * @param callback - 要执行的回调函数
   * @param args - 传递给回调函数的参数
   * @returns 任务 ID，可用于取消任务
   */
  set: (callback: TaskCallback, ...args: any[]) => TaskId;

  /**
   * 取消待执行的任务
   * @param taskId - 任务 ID
   */
  clear: (taskId: TaskId) => void;
}

/**
 * 部分应用函数工具类型
 */
type PartialApply = <T extends (...args: any[]) => any>(
  fn: T,
  context: any,
  arity: number
) => (...args: any[]) => ReturnType<T>;

/**
 * 类型检测函数类型
 */
type ClassOfChecker = (value: any) => string;

/**
 * DOM 元素创建函数类型
 */
type CreateElement = (tagName: string) => HTMLElement;

/**
 * 文档体引用类型
 */
type DocumentBody = HTMLElement;