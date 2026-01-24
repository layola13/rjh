/**
 * Converts a value to an object after ensuring it's not null or undefined.
 * This is a common utility for safely coercing primitive values to their object wrappers.
 * 
 * @param value - The value to convert to an object
 * @returns The value converted to an object wrapper
 * @throws {TypeError} If the value is null or undefined (via requireObjectCoercible)
 * 
 * @example
 * toObject('hello') // String { "hello" }
 * toObject(42) // Number { 42 }
 * toObject(true) // Boolean { true }
 */
declare function toObject<T>(value: T): T extends null | undefined ? never : Object;

export = toObject;