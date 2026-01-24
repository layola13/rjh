/**
 * DOM utility functions and console reference
 * @module DOMUtils
 */

/**
 * Global console object reference
 * Safe reference to console from window or global context
 */
export const b: Console;

/**
 * Converts kebab-case strings to camelCase
 * @param str - The kebab-case string to convert (e.g., "foo-bar")
 * @returns The camelCase version of the string (e.g., "fooBar")
 * @example
 *