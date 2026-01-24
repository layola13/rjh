/**
 * Creates a bound function with a specific context (this value).
 * Optimizes common arity cases (1-3 parameters) for better performance.
 * 
 * @module FunctionContextBinder
 * @requires isCallable - Validates that the input is a callable function
 */

import type { isCallable } from './d8e8';

/**
 * Binds a function to a specific context with optional arity optimization.
 * 
 * @template TContext - The type of the context object
 * @template TFn - The type of the function to bind
 * 
 * @param fn - The function to bind to the context
 * @param context - The context (this value) to bind the function to. If undefined, returns the original function.
 * @param arity - The number of arguments the function accepts. Used for optimization:
 *                - 1: Returns optimized single-parameter function
 *                - 2: Returns optimized two-parameter function
 *                - 3: Returns optimized three-parameter function
 *                - Other: Returns variadic function using apply
 * 
 * @returns The bound function or original function if context is undefined
 * 
 * @example
 *