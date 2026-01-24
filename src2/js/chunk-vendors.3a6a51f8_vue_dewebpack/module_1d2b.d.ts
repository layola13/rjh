/**
 * Creates a bound function that applies the given context to the original function.
 * This is a utility for binding function context (similar to Function.prototype.bind).
 * 
 * @template T - The type of the context object
 * @template TArgs - The tuple type of function arguments
 * @template TReturn - The return type of the function
 * 
 * @param fn - The function to bind
 * @param context - The context (this value) to bind to the function
 * @returns A new function that calls the original function with the bound context
 * 
 * @example
 *