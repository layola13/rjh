/**
 * Module: module_s
 * Original ID: s
 * 
 * This module exports a function that invokes a callable entity with a specific context.
 */

/**
 * Executes a function by calling it with a given context.
 * 
 * @param callableFunction - The function to be invoked
 * @param context - The context (this value) to be used when calling the function
 * @returns The result of the function invocation
 */
export declare function executeWithContext<T = unknown, TContext = unknown>(
  callableFunction: (this: TContext, ...args: unknown[]) => T,
  context: TContext
): T;

/**
 * Default export: Function that applies a callable with a specific context
 */
declare const moduleS: <T = unknown, TContext = unknown>(
  callableFunction: (this: TContext, ...args: unknown[]) => T,
  context: TContext
) => T;

export default moduleS;