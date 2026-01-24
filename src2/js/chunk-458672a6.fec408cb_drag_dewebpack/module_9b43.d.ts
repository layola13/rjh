/**
 * 函数上下文绑定工具
 * 
 * 根据参数数量优化的函数绑定实现，类似于 Function.prototype.bind
 * 但针对不同参数数量提供了性能优化的快速路径
 * 
 * @module FunctionContextBinder
 */

/**
 * 可调用的函数类型
 */
type CallableFunction = (...args: any[]) => any;

/**
 * 将函数绑定到指定上下文
 * 
 * @template T - 函数类型
 * @param fn - 需要绑定上下文的函数
 * @param context - 绑定的this上下文，如果为undefined则返回原函数
 * @param arity - 函数的参数数量，用于性能优化（1-3有快速路径）
 * @returns 绑定了上下文的新函数
 * 
 * @example
 * const obj = { value: 42 };
 * function getValue() { return this.value; }
 * const boundFn = bindContext(getValue, obj, 0);
 * boundFn(); // 42
 */
declare function bindContext<T extends CallableFunction>(
  fn: T,
  context: any,
  arity: number
): T;

/**
 * 断言函数可调用性的验证函数（来自依赖模块 d8e8）
 * 
 * @param fn - 待验证的函数
 * @throws {TypeError} 如果参数不是函数
 */
declare function assertCallable(fn: unknown): asserts fn is CallableFunction;

export = bindContext;