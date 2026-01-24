/**
 * Invokes a function with a dynamic number of arguments and an optional context.
 * Optimizes common cases (0-4 arguments) for better performance.
 * 
 * @param fn - The function to invoke
 * @param args - Array of arguments to pass to the function
 * @param context - The context (this value) to bind when calling the function
 * @returns The return value of the invoked function
 * 
 * @example
 *