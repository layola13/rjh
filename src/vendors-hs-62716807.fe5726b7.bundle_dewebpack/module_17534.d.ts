/**
 * Cross-environment function application utility
 * 
 * Provides a unified way to apply functions with a given `this` context and arguments array.
 * Prefers native Reflect.apply when available, falls back to Function.prototype polyfills.
 * 
 * @module FunctionApply
 */

/**
 * Type helper to check if Reflect API is available
 */
type ReflectType = typeof Reflect | undefined;

/**
 * Function signature for applying a function with context and arguments
 * 
 * @template T - The type of the `this` context
 * @template A - Tuple type representing argument types
 * @template R - The return type of the target function
 * 
 * @param target - The function to invoke
 * @param thisArgument - The value to use as `this` when calling the function
 * @param argumentsList - Array of arguments to pass to the function
 * @returns The result of calling the target function
 */
declare function functionApply<T, A extends readonly unknown[], R>(
  target: (this: T, ...args: A) => R,
  thisArgument: T,
  argumentsList: A
): R;

/**
 * Determines the appropriate function application strategy:
 * 1. Native Reflect.apply (preferred, modern environments)
 * 2. Bound call/apply pattern (legacy binding support)
 * 3. Direct call/apply fallback (legacy environments)
 * 
 * @remarks
 * This utility normalizes differences in how JavaScript engines handle
 * function invocation, ensuring consistent behavior across environments.
 * 
 * Dependencies:
 * - Module 194243: Type checking utility (likely returns "object" for objects)
 * - Module 789191: Binding support detection flag
 */
export = functionApply;