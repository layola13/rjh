/**
 * Validates and returns a value that can be safely used as a prototype.
 * 
 * @module PrototypeValidator
 * @description Ensures the provided value is either an object or a function,
 * which are the only valid prototype values in JavaScript.
 * 
 * @throws {TypeError} If the value cannot be used as a prototype (i.e., is a primitive other than null)
 */

/**
 * Type guard for valid prototype values.
 * A prototype must be either an object (including null) or a function.
 */
type ValidPrototype = object | Function | null;

/**
 * Checks if a value is callable (i.e., a function).
 * 
 * @param value - The value to check
 * @returns True if the value is a function, false otherwise
 */
declare function isCallable(value: unknown): value is Function;

/**
 * Validates that a value can be used as a prototype.
 * 
 * @param value - The value to validate as a potential prototype
 * @returns The validated value if it's a valid prototype
 * @throws {TypeError} If the value is a primitive (string, number, boolean, symbol, bigint, undefined) that cannot be used as a prototype
 * 
 * @example
 *