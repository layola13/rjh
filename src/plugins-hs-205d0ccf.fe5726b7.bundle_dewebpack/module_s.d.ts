/**
 * Module: module_s
 * Original ID: s
 * 
 * 调用函数 n 并绑定上下文 e
 * 注意：由于源代码片段不完整，此类型定义基于有限信息推断
 */

/**
 * 执行函数调用，将 n 以 e 作为上下文调用
 * @param n - 要调用的函数
 * @param e - 函数调用的上下文对象（this）
 */
declare function moduleS<T = unknown, TContext = unknown>(
  n: (this: TContext, ...args: unknown[]) => T,
  e: TContext
): void;

export default moduleS;