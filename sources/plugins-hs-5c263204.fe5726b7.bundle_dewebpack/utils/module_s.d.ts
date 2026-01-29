/**
 * Module: module_s
 * 
 * 该模块包含一个函数调用包装器，用于在特定上下文中执行函数
 */

/**
 * 函数执行上下文
 * 用于描述函数调用时的执行环境
 */
interface ExecutionContext {
  /** 执行上下文对象，通常是 this 的指向 */
  readonly context: unknown;
  /** 可选的额外参数 */
  readonly args?: readonly unknown[];
}

/**
 * 可调用的函数类型
 * 表示可以在指定上下文中调用的函数
 */
type CallableFunction<TContext = unknown, TReturn = unknown> = (
  this: TContext,
  ...args: unknown[]
) => TReturn;

/**
 * 在指定上下文中执行函数
 * 
 * @template TContext - 执行上下文的类型
 * @template TReturn - 函数返回值的类型
 * @param fn - 要执行的函数
 * @param context - 执行上下文对象（this 绑定）
 * @returns 函数执行结果
 * 
 * @example
 *