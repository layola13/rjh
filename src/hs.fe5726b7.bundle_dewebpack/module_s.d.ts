/**
 * Module: module_s
 * Original ID: s
 * 
 * 通用函数调用模块
 * 该模块导出一个函数，用于在指定上下文中调用另一个函数
 */

/**
 * 在指定上下文中调用函数
 * @param n - 要调用的函数
 * @param e - 函数调用的上下文对象（this值）
 * @returns 函数调用的返回值
 */
declare function invokeWithContext<T = unknown, TContext = unknown>(
  n: (this: TContext, ...args: unknown[]) => T,
  e: TContext
): T;

export default invokeWithContext;