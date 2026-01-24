/**
 * Utility function that creates a bound function wrapper.
 * 
 * This module provides a cross-environment solution for function binding.
 * - In modern environments: uses native `Function.prototype.bind`
 * - In legacy environments: falls back to manual `apply` wrapper
 * 
 * @module FunctionBindUtility
 */

/**
 * Determines if native bind is supported
 */
declare const hasNativeBind: boolean;

/**
 * Creates a bound function that will call the target function with proper context.
 * 
 * @template TFunc - The type of function to be bound
 * @param targetFunction - The function to bind and call
 * @returns A new function that calls the target function with applied arguments
 * 
 * @example
 *