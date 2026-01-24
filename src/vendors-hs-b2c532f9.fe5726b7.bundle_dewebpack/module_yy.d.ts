/**
 * Hebrew year formatter for durations
 * Converts a numeric year value to its Hebrew text representation with proper grammar
 * 
 * Grammar rules:
 * - 2 years: "שנתיים" (dual form)
 * - Multiples of 10 (except 10): number + "שנה" (singular form)
 * - All other numbers: number + "שנים" (plural form)
 * 
 * @module module_yy
 */

/**
 * Formats a year count into Hebrew text
 * 
 * @param years - The number of years to format
 * @returns The formatted Hebrew string representation
 * 
 * @example
 * formatHebrewYears(2)  // Returns: "שנתיים"
 * formatHebrewYears(10) // Returns: "10 שנים"
 * formatHebrewYears(20) // Returns: "20 שנה"
 * formatHebrewYears(5)  // Returns: "5 שנים"
 */
export function formatHebrewYears(years: number): string {
  const DUAL_FORM_YEARS = 2;
  const DECADE_DIVISOR = 10;
  const EXCLUDED_DECADE = 10;

  // Special case: exactly 2 years uses dual form
  if (years === DUAL_FORM_YEARS) {
    return "שנתיים"; // "two years" (dual)
  }

  // Multiples of 10 (excluding 10 itself) use singular form
  if (years % DECADE_DIVISOR === 0 && years !== EXCLUDED_DECADE) {
    return `${years} שנה`; // "year" (singular)
  }

  // Default: plural form
  return `${years} שנים`; // "years" (plural)
}