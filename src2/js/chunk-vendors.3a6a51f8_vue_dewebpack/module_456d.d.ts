/**
 * Object.keys polyfill/utility module
 * 
 * This module provides a standardized implementation of Object.keys
 * that works across different JavaScript environments.
 * 
 * @module ObjectKeysPolyfill
 */

/**
 * Converts a value to an object (handles primitives and nullish values)
 * @param value - The value to convert to an object
 * @returns The value as an object
 */
declare function toObject(value: unknown): object;

/**
 * Gets all enumerable property names from an object
 * @param obj - The object to extract keys from
 * @returns Array of property names
 */
declare function getObjectKeys(obj: object): string[];

/**
 * Defines or polyfills the Object.keys method
 * @param methodName - The method name to define (e.g., "keys")
 * @param implementation - The implementation factory function
 */
declare function defineObjectMethod(
  methodName: string,
  implementation: () => (value: unknown) => string[]
): void;

/**
 * Object.keys implementation that ensures the input is an object
 * and returns its enumerable property names
 * 
 * @param value - Any value (will be coerced to object)
 * @returns Array of enumerable property names
 * 
 * @example
 *