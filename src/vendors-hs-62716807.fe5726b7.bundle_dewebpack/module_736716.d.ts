/**
 * String character utilities for handling Unicode code points and surrogate pairs.
 * Provides methods to safely access characters and code points in strings,
 * with proper handling of UTF-16 surrogate pairs.
 * 
 * @module StringCharacterUtils
 */

/**
 * Options for character access behavior
 */
interface CharacterAccessOptions {
  /** Whether to return the character itself (true) or its code point (false) */
  returnCharacter: boolean;
}

/**
 * Result type for codeAt operation - returns code point number or undefined
 */
type CodeAtResult = number | undefined;

/**
 * Result type for charAt operation - returns character string or empty string
 */
type CharAtResult = string;

/**
 * Gets the Unicode code point at the specified position in a string.
 * Properly handles UTF-16 surrogate pairs (characters outside the BMP).
 * 
 * @param str - The input string to read from
 * @param index - The zero-based index position
 * @returns The Unicode code point value, or undefined if index is out of bounds
 * 
 * @example
 * codeAt('A', 0) // returns 65
 * codeAt('😀', 0) // returns 128512 (handles surrogate pair correctly)
 * codeAt('test', 10) // returns undefined (out of bounds)
 */
export function codeAt(str: string, index: number): CodeAtResult;

/**
 * Gets the character (including full surrogate pairs) at the specified position.
 * Properly handles UTF-16 surrogate pairs, returning the complete character.
 * 
 * @param str - The input string to read from
 * @param index - The zero-based index position
 * @returns The character at the position, or empty string if index is out of bounds
 * 
 * @example
 * charAt('ABC', 1) // returns 'B'
 * charAt('😀😁', 0) // returns '😀' (handles surrogate pair correctly)
 * charAt('test', 10) // returns '' (out of bounds)
 */
export function charAt(str: string, index: number): CharAtResult;

/**
 * Unicode constants for surrogate pair detection
 */
declare const SURROGATE_HIGH_START: 0xD800; // 55296
declare const SURROGATE_HIGH_END: 0xDBFF;   // 56319
declare const SURROGATE_LOW_START: 0xDC00;  // 56320
declare const SURROGATE_LOW_END: 0xDFFF;    // 57343
declare const SURROGATE_OFFSET: 0x10000;    // 65536
declare const SURROGATE_SHIFT: 10;

/**
 * Internal factory function that creates character/codePoint accessor functions
 * @internal
 */
declare function createCharAccessor(returnCharacter: boolean): 
  (str: string, index: number) => string | number | undefined;