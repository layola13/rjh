/**
 * Checks if a value is nullish (null or undefined) and throws a TypeError if so.
 * This utility ensures that method calls are not performed on null/undefined values.
 * 
 * @param value - The value to check for nullish state
 * @returns The original value if it's not null or undefined
 * @throws {TypeError} If the value is null or undefined
 * 
 * @example
 *