/**
 * DOM manipulation and string utility functions
 * @module DOMUtils
 */

/**
 * Global console object reference
 * Supports both browser and Node.js environments
 */
export declare const console: Console;

/**
 * Converts kebab-case strings to camelCase
 * @param str - The kebab-case string to convert (e.g., "foo-bar")
 * @returns The camelCase version of the string (e.g., "fooBar")
 * @example
 *