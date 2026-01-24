/**
 * String.prototype.startsWith polyfill/implementation
 * 
 * Provides a polyfill for the native String.prototype.startsWith method
 * with additional checks and fallback logic for older environments.
 */

/**
 * Check if a string starts with a specified search string at a given position
 * 
 * @param searchString - The characters to be searched for at the start of this string
 * @param position - The position in this string at which to begin searching (defaults to 0)
 * @returns True if the string starts with searchString at the given position, false otherwise
 * 
 * @example
 *