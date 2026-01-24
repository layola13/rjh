/**
 * Type guard function that validates if a value is an object
 * 
 * @description
 * This utility function checks whether the provided value is a valid object type.
 * If the validation fails, it throws a TypeError with a descriptive message.
 * 
 * Original module ID: cb7c
 * Dependencies: d3f4 (isObject type checker)
 * 
 * @template T - The expected object type to validate
 * @param value - The value to check if it's an object
 * @returns The validated value as an object type
 * @throws {TypeError} When the provided value is not an object
 * 
 * @example
 *