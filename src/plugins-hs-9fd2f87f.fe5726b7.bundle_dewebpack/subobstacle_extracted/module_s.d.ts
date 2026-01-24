/**
 * Module: module_s
 * Original ID: s
 * 
 * This module appears to execute a function call pattern where a function `n`
 * is invoked with `e` as its context using Function.prototype.call.
 */

/**
 * Represents a callable function that can be invoked with a specific context.
 * @template TContext - The type of the context object
 * @template TReturn - The return type of the function
 */
type CallableFunction<TContext = unknown, TReturn = void> = (this: TContext) => TReturn;

/**
 * Executes a function with a given context.
 * 
 * @template TContext - The type of the context object to bind
 * @template TReturn - The return type of the callable function
 * @param n - The function to be called
 * @param e - The context object to use as 'this' when calling the function
 * @returns The result of calling function `n` with context `e`
 */
declare function moduleS<TContext = unknown, TReturn = void>(
  n: CallableFunction<TContext, TReturn>,
  e: TContext
): TReturn;

export default moduleS;