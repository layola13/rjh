/**
 * Module: module_s
 * 
 * 执行函数调用的模块，将函数 a 绑定到上下文 e 并执行
 * 
 * @remarks
 * 原始模块ID: s
 * 该模块似乎用于函数上下文绑定和执行
 */

/**
 * 函数执行器类型
 * 
 * @typeParam T - 函数的上下文类型
 * @typeParam R - 函数的返回值类型
 */
export type FunctionExecutor<T = unknown, R = unknown> = (this: T) => R;

/**
 * 执行函数调用，将函数绑定到指定上下文
 * 
 * @param a - 需要执行的函数
 * @param e - 函数执行的上下文（this值）
 * @returns 函数执行的结果
 * 
 * @example
 *