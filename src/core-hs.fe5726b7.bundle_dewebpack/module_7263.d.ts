/**
 * Function binding utility that binds a function to a specific context.
 * 
 * @module FunctionBinder
 * @description Provides a cross-environment function binding mechanism.
 * Falls back to native bind when available, otherwise uses a polyfill.
 */

/**
 * Binds a function to a specific context (thisArg).
 * 
 * @template T - The type of the function to bind
 * @param {T} targetFunction - The function to be bound to a context
 * @param {unknown} [thisArg] - The value to be used as 'this' when calling the function.
 *                              If undefined, returns the original function.
 * @returns {T} The bound function with the specified context
 * 
 * @example
 * const obj = { name: 'John' };
 * function greet() { return this.name; }
 * const boundGreet = functionBinder(greet, obj);
 * boundGreet(); // Returns 'John'
 */
export function functionBinder<T extends (...args: any[]) => any>(
  targetFunction: T,
  thisArg?: unknown
): T;

/**
 * @deprecated Use named export instead
 * @see functionBinder
 */
export default functionBinder;