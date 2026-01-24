/**
 * Utility module for function binding and invocation.
 * 
 * Provides a cross-compatible function call wrapper that works with or without
 * native Function.prototype.bind support.
 * 
 * @module FunctionBindUtility
 */

/**
 * Determines if native bind is supported.
 * Typically represents a feature detection flag from a compatibility module.
 */
declare const hasNativeBindSupport: boolean;

/**
 * Creates a bound function that invokes the target function with the correct context.
 * 
 * This utility provides two implementations:
 * - If native bind is available: Uses the optimized native bind for direct call invocation
 * - If bind is not available: Falls back to a manual apply-based wrapper
 * 
 * @template TFunc - The function type to be wrapped
 * @param targetFunction - The function to be invoked
 * @returns A wrapper function that preserves the calling context and forwards all arguments
 * 
 * @example
 *