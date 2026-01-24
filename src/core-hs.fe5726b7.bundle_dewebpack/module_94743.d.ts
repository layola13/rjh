/**
 * Validates that a value is a function and returns it, or throws a TypeError.
 * 
 * This utility is commonly used in polyfills and runtime validation scenarios
 * to ensure a value is callable before attempting to invoke it.
 * 
 * @param value - The value to check if it's a function
 * @returns The same value if it's a function
 * @throws {TypeError} If the value is not a function, with a descriptive message
 * 
 * @example
 *