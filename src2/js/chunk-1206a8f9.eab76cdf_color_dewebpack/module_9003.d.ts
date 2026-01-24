/**
 * Polyfill for Array.isArray compatibility
 * Provides a fallback implementation for environments that don't support native Array.isArray
 * @module ArrayIsArrayPolyfill
 */

/**
 * Check if a value is an array
 * Uses native Array.isArray if available, otherwise falls back to Object.prototype.toString check
 * @param value - The value to check
 * @returns True if the value is an array, false otherwise
 * @example
 *