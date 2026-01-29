const COMBINING_MARKS_REGEX = /[\u200d\ud800-\udfff\u0300-\u036f\ufe20-\ufe2f\u20d0-\u20ff\ufe0e\ufe0f]/;

/**
 * Checks if a string contains combining marks, zero-width joiners, 
 * surrogate pairs, or variation selectors.
 * 
 * @param text - The string to test
 * @returns True if the string contains special Unicode characters
 */
export function hasUnicodeCombiningMarks(text: string): boolean {
    return COMBINING_MARKS_REGEX.test(text);
}