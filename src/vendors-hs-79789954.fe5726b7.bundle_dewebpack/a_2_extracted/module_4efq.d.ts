/**
 * Type-safe array detection utility
 * Provides a polyfill for Array.isArray with proper type guards
 */

/**
 * Determines whether the passed value is an Array.
 * Uses native Array.isArray if available, otherwise falls back to Object.prototype.toString check.
 * 
 * @template T - The type of array elements
 * @param value - The value to be checked
 * @returns True if the value is an array, false otherwise
 * 
 * @example
 *