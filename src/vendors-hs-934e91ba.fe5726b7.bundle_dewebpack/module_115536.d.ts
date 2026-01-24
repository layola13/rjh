/**
 * Apply a function with a given context and arguments array.
 * Optimizes common cases (0-3 arguments) by using direct .call() invocations
 * instead of .apply() for better performance.
 * 
 * @template T - The type of the `this` context
 * @template TArgs - The type of the arguments array
 * @template TReturn - The return type of the function
 * 
 * @param fn - The function to invoke
 * @param context - The `this` context to bind to the function
 * @param args - The arguments array to pass to the function
 * @returns The result of invoking the function with the given context and arguments
 * 
 * @example
 *