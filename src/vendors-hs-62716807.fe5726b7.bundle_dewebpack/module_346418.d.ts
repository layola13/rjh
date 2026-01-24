/**
 * Error logging utility that safely logs errors to the console.
 * Handles both single argument (error object/message) and two argument (error + context) cases.
 * Silently fails if console.error is unavailable or throws an exception.
 */
declare function logError(error: unknown): void;
declare function logError(error: unknown, context: unknown): void;

export = logError;