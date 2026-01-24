/**
 * Converts a value to an object by first ensuring it's not null/undefined.
 * Wraps a required value check before converting to Object type.
 * 
 * @param value - The value to convert to an object
 * @returns The value converted to an Object
 * @throws {TypeError} If the value is null or undefined (via requireDefined)
 * 
 * @example
 *