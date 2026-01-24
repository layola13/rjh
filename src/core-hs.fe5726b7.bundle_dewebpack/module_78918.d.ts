/**
 * String character and code point utilities
 * Provides methods for handling Unicode characters including surrogate pairs
 */

/**
 * Get the Unicode code point at a specific position in a string
 * Handles surrogate pairs correctly for characters outside the Basic Multilingual Plane
 * 
 * @param str - The input string to read from
 * @param position - The position (index) in the string
 * @returns The Unicode code point at the given position, or undefined if position is out of bounds
 */
export function codeAt(str: string, position: number): number | undefined;

/**
 * Get the character (including surrogate pairs) at a specific position in a string
 * Returns the full character even if it's represented by a surrogate pair
 * 
 * @param str - The input string to read from
 * @param position - The position (index) in the string
 * @returns The character at the given position, or empty string if position is out of bounds
 */
export function charAt(str: string, position: number): string;

/**
 * Internal interface for character access strategies
 * @internal
 */
interface CharacterAccessor {
  codeAt: typeof codeAt;
  charAt: typeof charAt;
}

declare const _exports: CharacterAccessor;
export default _exports;