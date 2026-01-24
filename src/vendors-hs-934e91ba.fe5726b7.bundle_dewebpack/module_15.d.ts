/**
 * Determines the plural form index for Slavic languages (e.g., Russian, Ukrainian, Polish).
 * 
 * This function implements the plural rules commonly used in Slavic languages that have
 * three plural forms:
 * - Form 0: for numbers ending in 1 (except 11): 1, 21, 31, 41, etc.
 * - Form 1: for numbers ending in 2-4 (except 12-14): 2, 3, 4, 22, 23, 24, etc.
 * - Form 2: for all other numbers: 0, 5-20, 25-30, etc.
 * 
 * @param count - The numeric value to determine the plural form for
 * @returns The plural form index (0, 1, or 2)
 * 
 * @example
 *