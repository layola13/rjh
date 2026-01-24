/**
 * Error handler module that propagates errors by rethrowing them.
 * This module is typically used in error handling pipelines where errors
 * need to be caught at a higher level in the call stack.
 */

/**
 * Throws the provided error, allowing it to propagate up the call stack.
 * 
 * @param error - The error object to be thrown
 * @throws {Error} Always throws the provided error
 * 
 * @example
 *