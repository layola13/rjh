const COMBINING_MARKS_REGEX = /[\u200d\ud800-\udfff\u0300-\u036f\ufe20-\ufe2f\u20d0-\u20ff\ufe0e\ufe0f]/;

/**
 * Tests if a string contains combining marks, zero-width joiners, or surrogate pairs.
 * These characters include:
 * - Zero-width joiner (\u200d)
 * - Surrogate pairs (\ud800-\udfff)
 * - Combining diacritical marks (\u0300-\u036f)
 * - Variation selectors (\ufe20-\ufe2f, \u20d0-\u20ff)
 * - Emoji variation selectors (\ufe0e, \ufe0f)
 */
export function hasCombiningMarks(text: string): boolean {
    return COMBINING_MARKS_REGEX.test(text);
}