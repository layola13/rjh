/**
 * Type-safe array checking utility
 * Provides a polyfill for Array.isArray with proper type guards
 */

/**
 * Checks if the given value is an array
 * 
 * @param value - The value to check
 * @returns True if the value is an array, false otherwise
 * 
 * @remarks
 * This function serves as a polyfill for environments where Array.isArray
 * is not available. It uses Object.prototype.toString for reliable type checking.
 * 
 * @example
 *