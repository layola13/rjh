/**
 * Converts a value to an object after validating it's not null/undefined.
 * This module composes two utility functions:
 * 1. First validates the input is not null/undefined (be13)
 * 2. Then converts the validated value to an object (626a)
 * 
 * @module ValueToObject
 */

/**
 * Converts a validated value to its object representation.
 * Ensures the input is neither null nor undefined before conversion.
 * 
 * @template T - The type of the input value
 * @param value - The value to convert to an object (must not be null/undefined)
 * @returns The object representation of the validated value
 * @throws {TypeError} If the value is null or undefined
 * 
 * @example
 *