/**
 * Error logging and throwing utility
 * Logs errors to console and throws them for debugging purposes
 * 
 * @module ErrorHandler
 */

/**
 * Logs an error message to the console and throws an Error.
 * 
 * This function performs two actions:
 * 1. Safely logs the error to console.error if available
 * 2. Throws an Error with the message for stack trace capture
 * 
 * The thrown error is immediately caught and suppressed, making this
 * primarily useful for development/debugging scenarios where you want
 * to capture stack traces without breaking execution flow.
 * 
 * @param message - The error message to log and throw
 * 
 * @example
 *