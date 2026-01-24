/**
 * CancelToken - 用于取消异步操作的令牌类
 * 
 * 该类提供了一种优雅的方式来取消 Promise 操作。
 * 通过 executor 函数注入取消逻辑，当调用 cancel 函数时，
 * 会创建一个 Cancel 错误并 resolve 内部的 promise。
 * 
 * @example
 * // 方式1: 使用 executor
 * const cancelToken = new CancelToken((cancel) => {
 *   setTimeout(() => cancel('Operation timeout'), 5000);
 * });
 * 
 * // 方式2: 使用 source 工厂方法
 * const source = CancelToken.source();
 * source.cancel('User cancelled');
 * 
 * @module CancelToken
 */

/**
 * 取消执行器函数类型
 * @param cancel - 取消函数，调用时传入取消原因
 */
type CancelExecutor = (cancel: (message?: string) => void) => void;

/**
 * Cancel 错误类型（从模块 582459 导入）
 * 表示操作被取消时抛出的错误对象
 */
interface Cancel {
  message?: string;
  __CANCEL__?: boolean;
}

/**
 * CancelToken 源对象接口
 * 提供了一个便捷的方式来创建和控制 CancelToken
 */
interface CancelTokenSource {
  /**
   * 取消令牌实例
   */
  token: CancelToken;
  
  /**
   * 取消函数，调用此函数将触发令牌的取消状态
   * @param message - 可选的取消原因描述
   */
  cancel: (message?: string) => void;
}

/**
 * CancelToken 类
 * 
 * 用于管理可取消的异步操作。当操作需要被取消时，
 * 可以通过此令牌来检查取消状态或抛出取消错误。
 */
declare class CancelToken {
  /**
   * 内部 Promise，当取消操作被调用时会 resolve
   */
  promise: Promise<Cancel>;
  
  /**
   * 取消原因，包含 Cancel 错误对象
   * 如果未被取消则为 undefined
   */
  reason?: Cancel;
  
  /**
   * 构造函数
   * 
   * @param executor - 执行器函数，接收一个 cancel 回调函数作为参数
   *                   当 cancel 被调用时，会设置 reason 并 resolve 内部 promise
   * 
   * @throws {TypeError} 如果 executor 不是函数类型
   * 
   * @example
   * const token = new CancelToken((cancel) => {
   *   button.onclick = () => cancel('User clicked cancel');
   * });
   */
  constructor(executor: CancelExecutor);
  
  /**
   * 检查是否已请求取消，如果是则抛出取消错误
   * 
   * 通常在异步操作的关键点调用此方法，以响应取消请求
   * 
   * @throws {Cancel} 如果令牌已被取消
   * 
   * @example
   * async function fetchData(cancelToken) {
   *   cancelToken.throwIfRequested();
   *   const data = await fetch('/api/data');
   *   cancelToken.throwIfRequested();
   *   return data.json();
   * }
   */
  throwIfRequested(): void;
  
  /**
   * 静态工厂方法 - 创建一个新的 CancelToken 源对象
   * 
   * 这是创建可取消操作的推荐方式，返回的对象包含：
   * - token: CancelToken 实例，传递给需要取消支持的函数
   * - cancel: 取消函数，调用后会触发令牌的取消状态
   * 
   * @returns CancelTokenSource 对象
   * 
   * @example
   * const source = CancelToken.source();
   * 
   * fetchData(source.token).catch((error) => {
   *   if (error.__CANCEL__) {
   *     console.log('Request cancelled:', error.message);
   *   }
   * });
   * 
   * // 稍后取消请求
   * source.cancel('Operation no longer needed');
   */
  static source(): CancelTokenSource;
}

export = CancelToken;