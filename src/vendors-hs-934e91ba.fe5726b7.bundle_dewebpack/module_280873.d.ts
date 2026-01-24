/**
 * Checks if a string contains complex Unicode characters that require special handling.
 * 
 * This function tests for the presence of:
 * - Zero-width joiner (\u200d)
 * - Surrogate pairs (\ud800-\udfff) - used for emoji and rare characters
 * - Combining diacritical marks (\u0300-\u036f)
 * - Variation selectors (\ufe20-\ufe2f, \u20d0-\u20ff)
 * - Text presentation selectors (\ufe0e, \ufe0f)
 * 
 * @param input - The string to test for complex Unicode characters
 * @returns True if the string contains any complex Unicode characters, false otherwise
 */
export declare function hasComplexUnicodeCharacters(input: string): boolean;