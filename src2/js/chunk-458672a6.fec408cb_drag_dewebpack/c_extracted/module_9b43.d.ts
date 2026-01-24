/**
 * 函数上下文绑定工具
 * 
 * 根据参数数量优化函数绑定性能，避免不必要的 apply 调用。
 * 类似于 Function.prototype.bind，但针对特定参数数量进行了优化。
 * 
 * @module ContextBinder
 */

/**
 * 可调用的函数类型（泛型）
 */
type CallableFunction<T = any, R = any> = (...args: any[]) => R;

/**
 * 验证函数类型的工具函数类型定义
 */
type ValidateFunction = (fn: any) => void;

/**
 * 将函数绑定到指定上下文
 * 
 * @param fn - 需要绑定上下文的函数
 * @param context - 要绑定的上下文对象（this 值）
 * @param argCount - 函数参数数量，用于性能优化
 * @returns 绑定了上下文的新函数
 * 
 * @example
 *