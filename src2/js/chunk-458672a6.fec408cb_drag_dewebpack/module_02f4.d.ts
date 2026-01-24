/**
 * String iterator utility module for handling Unicode characters including surrogate pairs.
 * 
 * This module provides functionality to iterate through a string and correctly handle
 * Unicode characters, including those represented by surrogate pairs (characters outside
 * the Basic Multilingual Plane, U+10000 to U+10FFFF).
 * 
 * @module StringIteratorFactory
 */

/**
 * Converts a value to an integer.
 * @param value - The value to convert to an integer
 * @returns The integer representation of the value
 */
declare function toInteger(value: unknown): number;

/**
 * Ensures a value is a valid object (not null or undefined).
 * @param value - The value to check
 * @returns The value as an object
 * @throws {TypeError} If the value is null or undefined
 */
declare function requireObjectCoercible(value: unknown): object;

/**
 * Configuration for the string iterator behavior.
 */
interface StringIteratorOptions {
  /**
   * If true, returns the character(s) at the position.
   * If false, returns the Unicode code point value.
   */
  returnCharacter: boolean;
}

/**
 * Iterator function for string characters.
 * 
 * @param str - The string to iterate
 * @param position - The position in the string (0-based index)
 * @returns When returnCharacter is true: the character(s) at position or empty string if out of bounds.
 *          When returnCharacter is false: the Unicode code point or undefined if out of bounds.
 */
type StringIteratorFunction = (str: string, position: number) => string | number | undefined;

/**
 * Creates a string iterator factory function.
 * 
 * @param returnCharacter - If true, the iterator returns characters; if false, returns code points
 * @returns A function that iterates through a string at a given position, properly handling surrogate pairs
 * 
 * @remarks
 * Surrogate pairs are used in UTF-16 encoding to represent characters outside the BMP:
 * - High surrogate: 0xD800 (55296) to 0xDBFF (56319)
 * - Low surrogate: 0xDC00 (56320) to 0xDFFF (57343)
 * 
 * @example
 *