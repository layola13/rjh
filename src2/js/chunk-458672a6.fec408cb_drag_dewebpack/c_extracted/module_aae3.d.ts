/**
 * Checks if a value is a regular expression.
 * 
 * This module determines whether the given value is a RegExp object by:
 * 1. First checking if the value is an object
 * 2. Then checking for the Symbol.match property if available
 * 3. Falling back to internal [[Class]] tag comparison
 * 
 * @module RegExpDetector
 */

/**
 * Checks if the provided value is an object (non-primitive value).
 * @param value - The value to check
 * @returns True if the value is an object, false otherwise
 */
declare function isObject(value: unknown): value is object;

/**
 * Gets the internal [[Class]] tag of a value.
 * @param value - The value to get the class tag from
 * @returns The internal class name (e.g., "RegExp", "Array", "Object")
 */
declare function getClassTag(value: unknown): string;

/**
 * Symbol.match - Well-known symbol that specifies matching of a regular expression against a string.
 */
declare const MATCH_SYMBOL: typeof Symbol.match;

/**
 * Determines if a value is a regular expression.
 * 
 * @param value - The value to check
 * @returns True if the value is a RegExp or RegExp-like object, false otherwise
 * 
 * @example
 *