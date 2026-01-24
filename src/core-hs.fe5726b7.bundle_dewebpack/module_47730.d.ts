/**
 * Cross-environment function call utility
 * 
 * Provides a reliable way to call functions with a specific `this` context and arguments.
 * Uses native Function.prototype.call.bind when available, otherwise falls back to a polyfill.
 * 
 * @module CallUtility
 */

/**
 * Determines if native function binding is supported
 * Imported from another module that checks for Function.prototype.bind availability
 */
declare const hasNativeBindSupport: boolean;

/**
 * Calls a function with a given `this` value and arguments
 * 
 * @template T - The type of the `this` context
 * @template TArgs - The tuple type of the function arguments
 * @template TReturn - The return type of the function
 * @param thisArg - The value to use as `this` when calling the function
 * @param args - Arguments to pass to the function
 * @returns The result of calling the function
 * 
 * @example
 *