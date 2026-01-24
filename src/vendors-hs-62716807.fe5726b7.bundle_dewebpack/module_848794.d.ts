/**
 * Checks if a value is an array iterator.
 * 
 * Determines whether the given value is iterable as an array by checking:
 * 1. If it matches the registered Array iterator in the iterators registry
 * 2. If it matches the native Array.prototype[Symbol.iterator]
 * 
 * @param value - The value to check for array iterator capability
 * @returns True if the value is an array iterator, false otherwise
 * 
 * @example
 *