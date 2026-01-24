/**
 * Error handler module that throws any error passed to it.
 * This is typically used as a fallback error handler in module loading systems.
 * 
 * @module ErrorHandler
 */

/**
 * Throws the provided error without any processing.
 * This function is designed to propagate errors up the call stack immediately.
 * 
 * @param error - The error or exception to be thrown
 * @throws Always throws the provided error
 * @returns Never returns (function always throws)
 * 
 * @example
 *