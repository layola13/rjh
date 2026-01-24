/**
 * Type definitions for error handling wrapper module
 * Provides a safe function execution wrapper with error catching capabilities
 */

/**
 * Global error container interface
 * Used to store caught errors for later retrieval
 */
interface ErrorContainer {
  /** The caught error object */
  e?: Error | unknown;
}

/**
 * Generic function type that can accept any arguments and return any value
 */
type AnyFunction = (...args: any[]) => any;

/**
 * Wraps a function with error handling logic
 * Attempts to execute the stored function, catching any thrown errors
 * 
 * @template TArgs - The argument types of the wrapped function
 * @template TReturn - The return type of the wrapped function
 * @param this - The execution context for the wrapped function
 * @param args - Arguments to pass to the wrapped function
 * @returns The result of the wrapped function, or the error container if an error occurred
 */
declare function executeWithErrorHandling<TArgs extends any[], TReturn>(
  this: any,
  ...args: TArgs
): TReturn | ErrorContainer;

/**
 * Creates a safe wrapper around a function that catches and stores errors
 * 
 * @template TFunc - The type of function being wrapped
 * @param fn - The function to wrap with error handling
 * @returns A wrapped version of the function that catches errors
 * 
 * @example
 *