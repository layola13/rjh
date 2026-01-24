/**
 * Error handler module that throws any error passed to it.
 * This is typically used as a fallback error handler in module loading systems.
 * 
 * @module ErrorHandler
 */

/**
 * Throws the provided error, allowing it to propagate up the call stack.
 * This function is designed to be used in error handling scenarios where
 * errors should not be caught or suppressed.
 * 
 * @param error - The error to be thrown
 * @throws {Error} Always throws the provided error
 * @template T - The type of error being thrown
 */
export function throwError<T = Error>(error: T): never {
    throw error;
}

/**
 * Type definition for the error handler function
 */
export type ErrorHandler<T = Error> = (error: T) => never;

/**
 * Default export of the error handler function
 */
declare const errorHandler: ErrorHandler;
export default errorHandler;