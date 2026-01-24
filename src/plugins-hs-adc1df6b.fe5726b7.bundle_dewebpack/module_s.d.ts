/**
 * Module: module_s
 * Original ID: s
 * 
 * 执行函数调用的工具函数
 * 在指定上下文中调用函数并返回结果
 */

/**
 * 在给定上下文中调用函数
 * @param n - 要调用的函数
 * @param e - 作为this上下文的对象
 * @returns 函数调用的结果
 */
declare function callInContext<T, TContext>(
  n: (this: TContext, ...args: unknown[]) => T,
  e: TContext
): T;

export { callInContext };