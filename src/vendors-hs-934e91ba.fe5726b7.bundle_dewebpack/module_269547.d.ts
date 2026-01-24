/**
 * Creates a factory function that returns a constant value.
 * 
 * This is a higher-order function that takes a value and returns a function
 * that always returns that value when called. Useful for creating constant
 * factories or lazy evaluation patterns.
 * 
 * @template T - The type of the constant value
 * @param value - The value to be returned by the factory function
 * @returns A function that returns the constant value when invoked
 * 
 * @example
 *