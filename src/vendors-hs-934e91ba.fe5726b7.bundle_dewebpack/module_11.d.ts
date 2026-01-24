/**
 * Determines the plural form category for a given number in a specific language.
 * 
 * This function implements plural rules, likely for a language with multiple plural forms
 * (such as Russian, Polish, or similar Slavic languages with 4 plural categories).
 * 
 * @param count - The number to determine the plural form for
 * @returns The plural form category:
 *   - 0: Singular form (for 1 and 11)
 *   - 1: Special form for pairs (for 2 and 12)
 *   - 2: Few/Several form (for numbers 3-19)
 *   - 3: Many/Other form (for all other numbers)
 * 
 * @example
 * getPluralFormCategory(1);  // Returns 0 (singular)
 * getPluralFormCategory(2);  // Returns 1 (pair)
 * getPluralFormCategory(5);  // Returns 2 (few)
 * getPluralFormCategory(25); // Returns 3 (many)
 */
export function getPluralFormCategory(count: number): 0 | 1 | 2 | 3;