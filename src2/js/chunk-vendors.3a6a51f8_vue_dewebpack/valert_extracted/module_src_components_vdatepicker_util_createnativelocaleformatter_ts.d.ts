/**
 * Date formatting options for extracting portions of a date string
 */
export interface DateSubstringOptions {
  /** Starting position for substring extraction (default: 0) */
  start: number;
  /** Length of substring to extract (default: 0) */
  length: number;
}

/**
 * A function that formats a date string according to locale-specific rules
 * @param date - Date string in format "YYYY-M-D" or "YYYY-MM-DD"
 * @returns Formatted date string according to the locale
 */
export type DateFormatter = (date: string) => string;

/**
 * Creates a locale-aware date formatter using Intl.DateTimeFormat API.
 * Falls back to substring extraction if Intl API is unavailable or fails.
 * 
 * @param locale - BCP 47 language tag (e.g., "en-US", "fr-FR"). If undefined, uses user's locale
 * @param options - Intl.DateTimeFormat options for customizing output format
 * @param substringFallback - Fallback options for extracting date portions when Intl API fails
 * @returns A function that formats date strings, or undefined if formatting is not possible
 * 
 * @example
 *