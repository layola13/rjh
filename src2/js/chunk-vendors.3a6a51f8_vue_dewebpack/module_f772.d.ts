/**
 * Checks if a value is an object or function.
 * 
 * @remarks
 * This utility function determines whether a given value is considered an "object"
 * in JavaScript's type system. It returns true for:
 * - Non-null objects (excluding primitives)
 * - Functions (since typeof function returns "function")
 * 
 * @param value - The value to check
 * @returns `true` if the value is a non-null object or a function, `false` otherwise
 * 
 * @example
 *