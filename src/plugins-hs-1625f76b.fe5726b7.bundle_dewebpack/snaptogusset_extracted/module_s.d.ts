/**
 * Module: module_s
 * Original webpack module ID: s
 * 
 * This module appears to contain a function that calls another function
 * with a specific context binding.
 */

/**
 * Represents a callable function that can be bound to a context
 */
type CallableFunction = (...args: unknown[]) => unknown;

/**
 * Executes a function by calling it with a bound context
 * @param n - The function to be called
 * @param e - The context (this binding) for the function call
 */
declare function executeWithContext(n: CallableFunction, e: unknown): void;

export { executeWithContext, CallableFunction };