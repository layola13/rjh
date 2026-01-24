/**
 * Hebrew hour formatter
 * Converts a numeric hour value to its Hebrew text representation
 * 
 * @param hours - The number of hours to format
 * @returns The formatted Hebrew string representation of the hours
 * 
 * @example
 * formatHebrewHours(2) // returns "שעתיים" (two hours)
 * formatHebrewHours(5) // returns "5 שעות" (5 hours)
 */
declare function formatHebrewHours(hours: number): string;

export default formatHebrewHours;