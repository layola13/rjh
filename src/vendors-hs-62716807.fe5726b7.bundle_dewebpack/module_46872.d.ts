/**
 * Function.prototype.bind polyfill module
 * 
 * Provides a fallback implementation of the native Function.prototype.bind method
 * for environments where it is not available. If the native bind method exists,
 * it will be used; otherwise, a custom implementation is provided.
 * 
 * @module bind-polyfill
 */

/**
 * Binds a function to a specific context (this value) and optionally pre-fills arguments.
 * 
 * @template T - The type of the context object
 * @template A - The type of the pre-filled arguments
 * @template R - The return type of the function
 * 
 * @param thisArg - The value to be passed as the 'this' parameter to the target function
 * @param args - Arguments to prepend to arguments provided to the bound function
 * @returns A new function with the specified 'this' value and initial arguments
 * 
 * @example
 *