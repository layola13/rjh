/**
 * Schedules an error to be thrown asynchronously in the next event loop tick.
 * This is commonly used in promise/async libraries to ensure errors are not swallowed
 * and can be caught by global error handlers.
 * 
 * @param error - The error object to be thrown asynchronously
 * 
 * @example
 *