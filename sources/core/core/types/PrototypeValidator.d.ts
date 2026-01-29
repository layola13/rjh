/**
 * Prototype validation utility module
 * @description Ensures values can be safely used as prototypes
 * @module PrototypeValidator
 * @example
 * const obj = { key: 'value' };
 * const isValid = validatePrototype(obj);
 * console.log(isValid);
 */

/**
 * Type guard for valid prototype values
 */
type ValidPrototype = object | Function | null;

/**
 * Checks if a value is callable (i.e., a function)
 * @param value - The value to check
 * @returns True if the value is a function, false otherwise
 */
declare function isCallable(value: unknown): value is Function;

/**
 * Validates that a value can be used as a prototype
 * @param value - The value to validate as a potential prototype
 * @returns The validated value if it's a valid prototype
 * @throws {TypeError} If the value is a primitive that cannot be used as a prototype
 */
declare function validatePrototype(value: unknown): ValidPrototype;

export { ValidPrototype, isCallable, validatePrototype };