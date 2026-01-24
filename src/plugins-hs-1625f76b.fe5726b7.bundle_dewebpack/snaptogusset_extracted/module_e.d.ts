/**
 * Error handler module that throws the provided error.
 * This is typically used in module loading error scenarios or as a fallback error handler.
 * 
 * @module ErrorHandler
 */

/**
 * Throws the provided error, propagating it up the call stack.
 * This function never returns normally and always throws.
 * 
 * @param error - The error to be thrown
 * @throws Always throws the provided error
 * @returns Never returns (TypeScript 'never' type)
 * 
 * @example
 *