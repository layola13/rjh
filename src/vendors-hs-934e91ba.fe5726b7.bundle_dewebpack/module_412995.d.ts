/**
 * Checks if a value is an arguments object.
 * 
 * This function determines whether the given value is an arguments object
 * by checking if it's object-like, has a 'callee' property that is owned
 * but not enumerable (characteristic of arguments objects in non-strict mode).
 * 
 * @param value - The value to check
 * @returns True if the value is an arguments object, false otherwise
 * 
 * @example
 *