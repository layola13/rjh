/**
 * Formats a year count in Hebrew based on grammatical rules.
 * 
 * Hebrew grammar rules for years:
 * - 2 years: special form "שנתיים" (dual form)
 * - 10, 20, 30... (multiples of 10, except 10 itself): number + "שנה" (singular form)
 * - All other numbers: number + "שנים" (plural form)
 * 
 * @param yearCount - The number of years to format
 * @returns The formatted Hebrew string representation of the year count
 * 
 * @example
 *