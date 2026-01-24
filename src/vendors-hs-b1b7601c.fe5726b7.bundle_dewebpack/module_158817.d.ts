/**
 * Error reporting utilities for unhandled errors in observable streams.
 * Provides mechanisms to report errors that were not caught by error handlers.
 * @module UnhandledErrorReporting
 */

/**
 * Reports an unhandled error by scheduling it to be thrown on the next tick.
 * This ensures the error is surfaced even when no error handler is present.
 * 
 * The error will be passed to the configured global error handler if available,
 * otherwise it will be thrown to trigger the default error handling mechanism.
 * 
 * @param error - The error that was not handled by any observer error handler
 * @throws {unknown} The error will be re-thrown if no global error handler is configured
 */
export declare function reportUnhandledError(error: unknown): void;