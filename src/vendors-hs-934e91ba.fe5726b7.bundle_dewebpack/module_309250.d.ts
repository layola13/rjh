/**
 * Unicode-aware word tokenizer that splits strings into words, numbers, and emoji.
 * Handles complex Unicode patterns including surrogate pairs, diacritics, and regional indicators.
 */

/**
 * Splits a string into an array of words, numbers, and emoji tokens.
 * 
 * This function uses Unicode-aware regular expressions to correctly tokenize:
 * - ASCII and Latin-1 words
 * - Uppercase and lowercase sequences
 * - Numbers and ordinal indicators (1st, 2nd, 3rd, etc.)
 * - Emoji including skin tone modifiers and ZWJ sequences
 * - Contractions (e.g., "don't", "we'll")
 * 
 * @param input - The string to tokenize
 * @returns An array of tokens, or an empty array if no matches found
 * 
 * @example
 *