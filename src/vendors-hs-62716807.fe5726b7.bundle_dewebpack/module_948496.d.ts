/**
 * Call function utility module
 * 
 * Provides a cross-environment implementation for calling functions with a specified context.
 * Falls back to manual apply when native bind is not available.
 * 
 * @module CallFunction
 */

/**
 * Checks if native Function.prototype.bind is available
 * @internal
 */
declare const hasNativeBind: boolean;

/**
 * Calls a function with a given `this` value and arguments.
 * 
 * This utility ensures consistent function calling behavior across environments,
 * using native bind when available, or falling back to apply.
 * 
 * @template T - The type of the `this` context
 * @template A - The tuple type of arguments
 * @template R - The return type of the function
 * 
 * @param thisArg - The value to use as `this` when calling the function
 * @param args - Arguments to pass to the function
 * @returns The result of calling the function
 * 
 * @example
 *