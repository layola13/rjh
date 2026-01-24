/**
 * Checks if a value is a RegExp object.
 * 
 * This module determines whether the provided value is a regular expression by:
 * 1. First checking if it's an object
 * 2. Then checking for the Symbol.match property if available
 * 3. Falling back to checking the internal class name
 * 
 * @module RegExpMatcher
 */

/**
 * Checks if the given value is an object (not a primitive).
 * Corresponds to the imported 'd3f4' module.
 */
declare function isObject(value: unknown): value is object;

/**
 * Gets the internal [[Class]] name of a value (e.g., "RegExp", "Array", "Object").
 * Corresponds to the imported '2d95' module.
 */
declare function getClassName(value: unknown): string;

/**
 * Retrieves a well-known symbol by name (e.g., "match" returns Symbol.match).
 * Corresponds to the imported '2b4c' module.
 */
declare function getWellKnownSymbol(symbolName: string): symbol;

/**
 * Determines if a value is a RegExp object.
 * 
 * The function performs a two-step check:
 * 1. If the value has a Symbol.match property, returns its boolean value
 * 2. Otherwise, checks if the internal class name is "RegExp"
 * 
 * @param value - The value to check
 * @returns `true` if the value is a RegExp, `false` otherwise
 * 
 * @example
 *