/**
 * Asynchronously throws an error by scheduling it to be thrown in the next event loop tick.
 * This allows the current execution context to complete before the error is raised,
 * preventing immediate disruption of the call stack.
 * 
 * @param error - The error to be thrown asynchronously
 * 
 * @example
 *