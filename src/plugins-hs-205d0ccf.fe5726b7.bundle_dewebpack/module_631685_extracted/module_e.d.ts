/**
 * Error handler module that throws the provided error.
 * This is typically used as a default error handler or rejection handler in promise chains.
 * 
 * @module ErrorHandler
 */

/**
 * Throws the provided error, propagating it up the call stack.
 * This function is designed to be used as an error handler that doesn't catch or transform errors,
 * but simply re-throws them to ensure they're not silently swallowed.
 * 
 * @param error - The error to be thrown
 * @throws {unknown} Always throws the provided error parameter
 * @example
 *