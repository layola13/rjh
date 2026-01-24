/**
 * Error handler module that rethrows any error passed to it.
 * This is typically used in promise rejection handlers or as a fallback error handler.
 * 
 * @module ErrorHandler
 */

/**
 * Rethrows the provided error without modification.
 * This function is useful when you want to propagate errors up the call stack
 * without any additional processing or wrapping.
 * 
 * @param error - The error to be rethrown
 * @throws Always throws the provided error
 * @returns Never returns as it always throws
 * 
 * @example
 *