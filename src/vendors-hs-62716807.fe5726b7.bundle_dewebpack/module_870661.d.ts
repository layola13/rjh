/**
 * Creates a bound function that applies the given context to the target function.
 * This is a utility for explicit function binding similar to Function.prototype.bind.
 * 
 * @template T - The type of the context object
 * @template A - The tuple type of function arguments
 * @template R - The return type of the function
 * 
 * @param fn - The function to bind
 * @param context - The context (this value) to bind to the function
 * @returns A new function that calls the original function with the specified context
 * 
 * @example
 *