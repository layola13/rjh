/**
 * Module: module_s
 * @module module_s
 */

/**
 * Represents a callable function or object with a call method
 */
interface CallableFunction {
  call(thisArg: unknown, ...args: unknown[]): unknown;
}

/**
 * Invokes a function with a specific context
 * @param invokable - The function or callable object to invoke
 * @param context - The context (this value) to bind to the function
 * @returns The result of the function invocation
 */
declare function invokeWithContext(
  invokable: CallableFunction,
  context: unknown
): unknown;

export { invokeWithContext, CallableFunction };