/**
 * String iterator utility module for handling Unicode characters including surrogate pairs.
 * 
 * This module provides a function factory that creates string character accessors
 * with support for proper Unicode handling, including supplementary characters
 * represented by surrogate pairs (U+10000 to U+10FFFF).
 * 
 * @module StringCharacterIterator
 */

/**
 * Converts a value to an integer suitable for use as an index.
 * @param value - The value to convert to an integer
 * @returns The integer representation of the value
 */
declare function toInteger(value: unknown): number;

/**
 * Ensures a value is a valid object (not null or undefined).
 * @param value - The value to check
 * @returns The value as a string
 * @throws {TypeError} If the value is null or undefined
 */
declare function requireObjectCoercible(value: unknown): string;

/**
 * Configuration for the character accessor function.
 */
interface CharacterAccessorOptions {
  /**
   * When true, returns the character(s) as a string.
   * When false, returns the code point as a number.
   */
  returnString: boolean;
}

/**
 * Function that accesses a character at a given position in a string.
 * 
 * @param target - The string to access
 * @param position - The zero-based index position
 * @returns The character(s) or code point at the position, or undefined/empty string if out of bounds
 */
type CharacterAccessor = (target: string, position: number) => string | number | undefined;

/**
 * Creates a character accessor function for strings with Unicode support.
 * 
 * This factory function generates accessors that properly handle:
 * - Basic Multilingual Plane (BMP) characters (U+0000 to U+FFFF)
 * - Supplementary characters using surrogate pairs (U+10000 to U+10FFFF)
 * 
 * Surrogate pair encoding:
 * - High surrogate range: 0xD800 (55296) to 0xDBFF (56319)
 * - Low surrogate range: 0xDC00 (56320) to 0xDFFF (57343)
 * 
 * @param returnString - If true, return character(s) as string; if false, return code point as number
 * @returns A function that accesses characters at a given position
 * 
 * @example
 *