/**
 * Determines the plural form category for a given number.
 * Used for internationalization (i18n) pluralization rules.
 * 
 * @param count - The numeric value to categorize
 * @returns Plural category index:
 *   - 0: Singular form (count === 1)
 *   - 1: Dual or special form (count === 2)
 *   - 2: Special plural form (count < 0 or count > 10, and divisible by 10)
 *   - 3: General plural form (all other cases)
 * 
 * @example
 * getPluralCategory(1)  // returns 0 (singular)
 * getPluralCategory(2)  // returns 1 (dual)
 * getPluralCategory(20) // returns 2 (special plural)
 * getPluralCategory(5)  // returns 3 (general plural)
 */
export declare function getPluralCategory(count: number): 0 | 1 | 2 | 3;