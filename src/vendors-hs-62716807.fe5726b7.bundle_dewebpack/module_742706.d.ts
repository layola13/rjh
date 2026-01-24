/**
 * Checks if a value is an object type.
 * @param value - The value to check
 * @returns True if the value is an object, false otherwise
 */
declare function isObject(value: unknown): value is object;

/**
 * Asserts that a value is an object, throwing a TypeError if it is not.
 * 
 * @param value - The value to validate as an object
 * @returns The value cast as an object if validation passes
 * @throws {TypeError} When the provided value is not an object
 * 
 * @example
 *