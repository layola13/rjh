/**
 * Module: module_s
 * 
 * 执行函数调用的辅助模块
 * 该模块包含一个函数，用于在指定上下文中调用另一个函数
 */

/**
 * 在指定上下文中调用函数
 * 
 * @template T - 函数返回值类型
 * @param n - 需要调用的函数
 * @param e - 函数执行的上下文对象
 * @returns 函数执行的返回值
 */
declare function invokeWithContext<T>(
  n: (this: unknown, ...args: unknown[]) => T,
  e: unknown
): T;

export { invokeWithContext };