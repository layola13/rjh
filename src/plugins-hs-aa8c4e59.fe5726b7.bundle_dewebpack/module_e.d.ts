/**
 * Error handler module that throws any error passed to it.
 * This is typically used as a default error handler or in error propagation scenarios.
 * 
 * @module ErrorHandler
 */

/**
 * Throws the provided error, allowing it to propagate up the call stack.
 * This function is useful for re-throwing errors in catch blocks or
 * forwarding errors in error handling middleware.
 * 
 * @param error - The error to be thrown
 * @throws Always throws the provided error
 * @returns This function never returns (always throws)
 * 
 * @example
 *