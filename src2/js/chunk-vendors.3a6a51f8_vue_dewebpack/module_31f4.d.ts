/**
 * Invokes a function with a variable number of arguments, optionally binding a context.
 * Optimizes common cases (0-4 arguments) to avoid the overhead of Function.prototype.apply.
 * 
 * @template T - The return type of the function
 * @param fn - The function to invoke
 * @param args - An array of arguments to pass to the function
 * @param context - The context (this value) to bind when calling the function. If undefined, the function is called without binding.
 * @returns The return value of the invoked function
 * 
 * @example
 *