/**
 * Error handler function that re-throws the provided error.
 * This is typically used in module loading error scenarios to propagate exceptions.
 * 
 * @param error - The error object to be thrown
 * @throws {unknown} Re-throws the provided error without modification
 */
declare function errorHandler(error: unknown): never;

export { errorHandler };