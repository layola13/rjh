/**
 * Creates a function that applies the given function to an array of arguments.
 * This is a curried function application utility that converts a function
 * accepting multiple parameters into one that accepts an array of those parameters.
 * 
 * @template TArgs - Tuple type representing the function's parameter types
 * @template TReturn - The return type of the function
 * @param fn - The function to be applied with spread arguments
 * @returns A new function that accepts an array of arguments and applies them to the original function
 * 
 * @example
 *