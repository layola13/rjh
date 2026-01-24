/**
 * Error logging and reporting utility
 * Logs errors to console and optionally throws them for debugging purposes
 */

/**
 * Logs an error message to the console and throws an error.
 * This function is typically used for critical errors that should be
 * both logged and potentially caught by error boundaries.
 * 
 * @param message - The error message to log and throw
 * @throws {Error} Always throws an Error with the provided message
 * 
 * @example
 *