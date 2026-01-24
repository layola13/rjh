/**
 * Function binding utility that creates a bound function with a specified context.
 * 
 * @module FunctionBinder
 * @description Creates a new function that calls the original function with a specific 'this' context.
 * Optimizes performance by creating specialized wrappers for functions with 1-3 arguments.
 */

/**
 * Type guard or validation function imported from module '79aa'
 * Likely validates that the input is a callable function
 */
type ValidateFunction = (fn: unknown) => asserts fn is Function;

/**
 * Creates a bound function that calls the original function with the specified context.
 * 
 * @template TContext - The type of the context object
 * @template TFunc - The type of the function to bind
 * 
 * @param fn - The function to bind to a context
 * @param context - The value to be used as 'this' when calling the function. If undefined, returns the original function.
 * @param argumentCount - Optional optimization hint for the number of arguments (1, 2, or 3)
 * 
 * @returns A new function that calls the original function with the bound context
 * 
 * @example
 *