/**
 * Type-safe array detection utility.
 * Provides a polyfill for Array.isArray with fallback to Object.prototype.toString.
 */

/**
 * Checks if a value is an array.
 * 
 * Uses native Array.isArray if available, otherwise falls back to
 * Object.prototype.toString comparison.
 * 
 * @param value - The value to check
 * @returns True if the value is an array, false otherwise
 * 
 * @example
 *