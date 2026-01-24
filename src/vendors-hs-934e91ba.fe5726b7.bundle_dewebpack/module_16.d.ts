/**
 * Determines the plural form index for Slavic languages (e.g., Russian, Ukrainian, Belarusian).
 * 
 * This function implements plural rules for languages that have three plural forms:
 * - Form 0: one (e.g., 1, 21, 31, 41, 51, 61, 71, 81, 101, 1001, ...)
 * - Form 1: few (e.g., 2-4, 22-24, 32-34, 42-44, 52-54, 62, 102-104, ...)
 * - Form 2: many (e.g., 0, 5-20, 25-30, 35-40, ...)
 * 
 * @param count - The numeric value to determine plural form for
 * @returns The plural form index: 0 for "one", 1 for "few", 2 for "many"
 * 
 * @example
 * getPluralFormIndex(1);   // returns 0 (one item)
 * getPluralFormIndex(2);   // returns 1 (few items)
 * getPluralFormIndex(5);   // returns 2 (many items)
 * getPluralFormIndex(21);  // returns 0 (twenty-one items)
 * getPluralFormIndex(0);   // returns 2 (zero items)
 */
export function getPluralFormIndex(count: number): number;