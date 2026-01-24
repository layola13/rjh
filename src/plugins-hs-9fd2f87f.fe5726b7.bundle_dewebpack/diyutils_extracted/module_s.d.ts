/**
 * Module: module_s
 * Original ID: s
 * 
 * This module exports a function that invokes another function with a specific context.
 */

/**
 * A function that calls another function with a given context.
 * 
 * @param n - The function to be called
 * @param e - The context (this value) to be used when calling the function
 * @returns The result of calling function n with context e
 */
declare function moduleS<T = unknown, TContext = unknown>(
  n: (this: TContext) => T,
  e: TContext
): T;

export default moduleS;