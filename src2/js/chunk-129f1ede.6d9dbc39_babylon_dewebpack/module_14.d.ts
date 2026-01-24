/**
 * Checks if a value is an array.
 * 
 * Uses native Array.isArray if available, otherwise falls back to a polyfill
 * that checks if the value is truthy and has a numeric length property.
 * 
 * @param value - The value to check
 * @returns True if the value is an array, false otherwise
 * 
 * @example
 *