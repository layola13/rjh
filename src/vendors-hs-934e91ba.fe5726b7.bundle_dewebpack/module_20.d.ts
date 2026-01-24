/**
 * Determines the plural form index for a number (typically for internationalization).
 * 
 * This function implements a plural rule commonly used in Slavic languages
 * (e.g., Polish, Russian, Czech) where there are three plural forms:
 * - Form 0: singular (when number is 1)
 * - Form 1: few (when number is 0 or ends with 02-19)
 * - Form 2: many (all other cases)
 * 
 * @param count - The number to determine the plural form for
 * @returns The plural form index (0, 1, or 2)
 * 
 * @example
 * getPluralFormIndex(1)   // returns 0 (singular: "1 item")
 * getPluralFormIndex(2)   // returns 2 (many: "2 items")
 * getPluralFormIndex(5)   // returns 2 (many: "5 items")
 * getPluralFormIndex(12)  // returns 1 (few: "12 items")
 * getPluralFormIndex(22)  // returns 2 (many: "22 items")
 * getPluralFormIndex(102) // returns 2 (many: "102 items")
 */
export declare function getPluralFormIndex(count: number): 0 | 1 | 2;