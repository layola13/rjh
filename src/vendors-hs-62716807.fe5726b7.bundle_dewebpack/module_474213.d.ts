/**
 * Function binding utility
 * 
 * Creates a bound function with a specified context (this value).
 * If native bind is available and the environment supports it, uses the optimized native implementation.
 * Otherwise, falls back to a manual binding implementation.
 * 
 * @param fn - The function to bind
 * @param context - The context (this value) to bind to the function. If undefined, returns the original function.
 * @returns A new function with the bound context, or the original function if context is undefined
 * 
 * @example
 *