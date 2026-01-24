/**
 * Regular expression pattern for matching word boundaries and various text cases.
 * Supports:
 * - Lowercase words with optional contractions (d, ll, m, re, s, t, ve)
 * - Uppercase words with optional contractions (D, LL, M, RE, S, T, VE)
 * - Numbers with ordinal suffixes (1st, 2nd, 3rd, 4th, etc.)
 * - Unicode characters including emojis and special symbols
 * - Latin extended characters (À-ÖØ-öø-ÿ)
 */
declare const WORD_BOUNDARY_PATTERN: RegExp;

/**
 * Converts a single word or phrase to camelCase format.
 * The first word starts with a lowercase letter, and subsequent words
 * start with an uppercase letter.
 * 
 * @param input - The string to convert to camelCase
 * @returns The camelCase formatted string
 * 
 * @example
 *