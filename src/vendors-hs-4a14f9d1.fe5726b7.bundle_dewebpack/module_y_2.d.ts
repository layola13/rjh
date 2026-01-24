/**
 * Formats a date object to return a two-digit year string.
 * Extracts the year from tm_year, adds 1900 (Unix epoch offset), 
 * and returns the last 2 digits as a string (e.g., "24" for 2024).
 * 
 * @param dateObject - Object containing tm_year property (years since 1900)
 * @returns Two-digit year string
 */
declare function formatTwoDigitYear(dateObject: { tm_year: number }): string;