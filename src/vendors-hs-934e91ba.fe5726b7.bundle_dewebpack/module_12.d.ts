/**
 * Determines the plural form index for Slavic languages (e.g., Russian, Ukrainian, Belarusian).
 * 
 * This function implements a common plural rule where:
 * - Numbers ending in 1 (except 11) use singular form (returns 0)
 * - All other numbers use plural form (returns 1)
 * 
 * Examples:
 * - 1, 21, 31, 41... → 0 (singular: "1 день")
 * - 11, 2, 3, 5, 12, 13... → 1 (plural: "2 дня" or "5 дней")
 * 
 * @param value - The numeric value to evaluate for plural form
 * @returns 0 for singular form, 1 for plural form
 */
export function getPluralFormIndex(value: number): number {
  return Number(value % 10 !== 1 || value % 100 === 11);
}