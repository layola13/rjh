/**
 * Converts a value to an object by ensuring it's not null or undefined.
 * Wraps the result of a type coercion function in an Object constructor call.
 * 
 * @module ObjectCoercion
 */

/**
 * Requires a primitive value and throws if null or undefined.
 * This is typically a "RequireObjectCoercible" implementation.
 */
declare function requireObjectCoercible(value: unknown): unknown;

/**
 * Converts a value to an object, throwing if the value is null or undefined.
 * 
 * This function ensures that:
 * 1. The input value is not null or undefined (via requireObjectCoercible)
 * 2. The result is wrapped in an Object constructor call
 * 
 * @param value - The value to convert to an object
 * @returns An object representation of the input value
 * @throws {TypeError} If the value is null or undefined
 * 
 * @example
 *