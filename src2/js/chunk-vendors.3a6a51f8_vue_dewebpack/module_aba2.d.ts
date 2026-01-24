/**
 * 微任务调度器模块
 * 提供跨平台的微任务队列实现
 * 
 * @module MicrotaskScheduler
 * @dependencies 
 *   - e53d: 全局对象(window/global)
 *   - 4178: 定时器工具集
 *   - 6b4c: 类型检测工具
 */

/**
 * 微任务队列节点
 */
interface QueueNode {
  /** 待执行的函数 */
  fn: () => void;
  /** 指向下一个节点 */
  next: QueueNode | undefined;
}

/**
 * 微任务调度函数类型
 */
type MicrotaskScheduler = (task: () => void) => void;

/**
 * 队列执行器类型
 */
type FlushQueue = () => void;

/**
 * 全局对象接口
 */
interface GlobalObject {
  MutationObserver?: typeof MutationObserver;
  WebKitMutationObserver?: typeof MutationObserver;
  process?: NodeJS.Process;
  Promise?: PromiseConstructor;
  navigator?: { standalone?: boolean };
}

/**
 * 定时器工具接口
 */
interface TimerUtil {
  set: (callback: () => void) => void;
}

/**
 * 类型检测函数
 */
type TypeChecker = (value: unknown) => string;

/**
 * 创建微任务调度器
 * 根据环境自动选择最优的微任务实现策略
 * 
 * @returns 微任务调度函数，接受一个回调并异步执行
 */
declare function createMicrotaskScheduler(
  globalObject: GlobalObject,
  timerUtil: TimerUtil,
  typeChecker: TypeChecker
): MicrotaskScheduler;

export default createMicrotaskScheduler;

/**
 * 模块导出的调度器工厂函数
 * 
 * 实现策略优先级：
 * 1. Node.js: 使用 process.nextTick
 * 2. 现代浏览器: 使用 Promise.resolve().then()
 * 3. 旧版浏览器: 使用 MutationObserver
 * 4. 降级方案: 使用 setTimeout
 * 
 * @example
 * const schedule = createMicrotaskScheduler(global, timer, typeCheck);
 * schedule(() => console.log('microtask executed'));
 */
export type { 
  QueueNode, 
  MicrotaskScheduler, 
  FlushQueue, 
  GlobalObject, 
  TimerUtil, 
  TypeChecker 
};