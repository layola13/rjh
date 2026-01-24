/**
 * 微任务调度器模块
 * 
 * 提供跨平台的微任务调度机制，按优先级选择以下实现：
 * 1. process.nextTick (Node.js环境)
 * 2. Promise.resolve().then (支持Promise的环境)
 * 3. MutationObserver (浏览器环境)
 * 4. setImmediate 降级方案
 */

/**
 * 任务队列节点
 */
interface TaskNode {
  /** 待执行的函数 */
  fn: () => void;
  /** 指向下一个任务节点 */
  next: TaskNode | undefined;
}

/**
 * 全局对象类型定义
 */
interface GlobalObject extends Window {
  MutationObserver?: typeof MutationObserver;
  WebKitMutationObserver?: typeof MutationObserver;
  process?: NodeJS.Process;
  Promise?: PromiseConstructor;
  navigator?: Navigator;
}

/**
 * Node.js Domain 类型定义
 */
interface ProcessDomain {
  exit(): void;
  enter(): void;
}

/**
 * 扩展的 Process 类型
 */
interface ProcessWithDomain extends NodeJS.Process {
  domain?: ProcessDomain;
}

/**
 * 创建微任务调度器
 * 
 * @returns 返回一个函数，用于将回调函数加入微任务队列
 * 
 * @example
 * const scheduleTask = createMicrotaskScheduler();
 * scheduleTask(() => console.log('executed'));
 */
declare function createMicrotaskScheduler(): (callback: () => void) => void;

export = createMicrotaskScheduler;

/**
 * 实现说明：
 * 
 * 内部维护一个单向链表作为任务队列，包含以下变量：
 * - taskQueueHead: 队列头节点
 * - taskQueueTail: 队列尾节点
 * - resolved: Promise.resolve() 的结果
 * - scheduleFlush: 触发队列执行的调度函数
 * - toggleValue: MutationObserver 切换值
 * - textNode: MutationObserver 监听的文本节点
 * 
 * 调度策略：
 * 1. Node.js: 使用 process.nextTick，支持 domain 上下文
 * 2. 现代浏览器: 优先使用 Promise.resolve().then
 * 3. 旧版浏览器: 使用 MutationObserver 监听 DOM 变化
 * 4. 降级方案: 使用 setImmediate 或 setTimeout
 * 
 * 错误处理：
 * - 任务执行出错时，清空当前任务引用并继续执行后续任务
 * - 如果队列为空，抛出错误
 */