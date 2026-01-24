/**
 * String iterator helper module for Unicode code point handling.
 * Handles both BMP (Basic Multilingual Plane) and supplementary characters.
 * 
 * Original Module ID: 02f4
 * Dependencies: 4588 (toInteger), be13 (requireObjectCoercible)
 */

/**
 * Converts a value to an integer.
 * @param value - The value to convert
 * @returns The integer representation
 */
declare function toInteger(value: unknown): number;

/**
 * Ensures the value can be converted to an object (not null/undefined).
 * @param value - The value to check
 * @returns The coerced string value
 */
declare function requireObjectCoercible(value: unknown): string;

/**
 * Configuration options for character retrieval.
 */
interface CharacterRetrievalOptions {
  /** Whether to return the character(s) as a string or code point as number */
  returnAsString: boolean;
}

/**
 * Creates a string iterator function that correctly handles Unicode surrogate pairs.
 * 
 * @param returnAsString - If true, returns character(s) as string; if false, returns code point as number
 * @returns A function that retrieves character or code point at specified position
 * 
 * @remarks
 * - Handles Unicode surrogate pairs (U+D800 to U+DFFF range)
 * - High surrogates: 0xD800 (55296) to 0xDBFF (56319)
 * - Low surrogates: 0xDC00 (56320) to 0xDFFF (57343)
 * - Supplementary characters are composed of high + low surrogate pairs
 */
declare function createStringIterator(
  returnAsString: boolean
): (input: unknown, position: unknown) => string | number | undefined;

/**
 * String iterator function signature.
 * 
 * @param input - The string to iterate over
 * @param position - The position/index in the string
 * @returns 
 * - If returnAsString is true: the character(s) at position, or empty string if out of bounds
 * - If returnAsString is false: the code point value, or undefined if out of bounds
 * 
 * @example
 * const getChar = createStringIterator(true);
 * getChar("A𝐁C", 1); // Returns "𝐁" (handles surrogate pair correctly)
 * 
 * const getCodePoint = createStringIterator(false);
 * getCodePoint("A𝐁C", 1); // Returns 119809 (the code point of 𝐁)
 */
declare type StringIteratorFunction = (
  input: unknown,
  position: unknown
) => string | number | undefined;

export = createStringIterator;