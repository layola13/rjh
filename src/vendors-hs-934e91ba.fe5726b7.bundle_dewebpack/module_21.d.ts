/**
 * Determines the plural form category for a number based on modulo 100 rules.
 * Commonly used in Slavic language pluralization (e.g., Polish, Russian).
 * 
 * @param value - The numeric value to categorize
 * @returns Plural form index:
 *   - 1: when value % 100 equals 1 (e.g., 1, 101, 201)
 *   - 2: when value % 100 equals 2 (e.g., 2, 102, 202)
 *   - 3: when value % 100 equals 3 or 4 (e.g., 3, 4, 103, 104)
 *   - 0: all other cases (default)
 * 
 * @example
 * getPluralFormCategory(1);   // returns 1
 * getPluralFormCategory(2);   // returns 2
 * getPluralFormCategory(3);   // returns 3
 * getPluralFormCategory(5);   // returns 0
 * getPluralFormCategory(101); // returns 1
 */
export function getPluralFormCategory(value: number): 0 | 1 | 2 | 3;