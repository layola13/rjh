/**
 * Module: module_s
 * 
 * This module appears to contain a function that invokes another callable
 * with a specific context.
 */

/**
 * Option 1: If this is a utility function that calls a function with context
 */
export declare function invokeWithContext<T, TArgs extends unknown[], TReturn>(
  fn: (this: T, ...args: TArgs) => TReturn,
  context: T,
  ...args: TArgs
): TReturn;

/**
 * Option 2: If this is a class method wrapper
 */
export declare class ModuleS {
  /**
   * Invokes a method with the specified context
   * @param fn - The function to invoke
   * @param context - The execution context (this binding)
   */
  call<T, TReturn>(fn: (this: T) => TReturn, context: T): TReturn;
}

/**
 * Option 3: If this is a simple function executor
 */
export declare type FunctionExecutor = <T>(
  fn: () => T,
  context: unknown
) => T;

export declare const execute: FunctionExecutor;