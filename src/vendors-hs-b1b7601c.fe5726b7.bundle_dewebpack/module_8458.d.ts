/**
 * Checks if a value is a valid native constructor function.
 * 
 * This utility validates whether a given value is a native built-in constructor
 * by checking if it's an object/function, not a masked value, and matches
 * the expected native constructor pattern.
 * 
 * @param value - The value to check
 * @returns `true` if the value is a native constructor, `false` otherwise
 * 
 * @example
 *