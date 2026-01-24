/**
 * Date formatting options for substring extraction
 */
export interface DateFormatterOptions {
  /** Starting position for substring extraction */
  start: number;
  /** Length of substring to extract */
  length: number;
}

/**
 * Function type that formats a date string according to locale rules
 * @param date - Date string in format "YYYY-MM-DD" or "YYYY-M-D"
 * @returns Formatted date string according to locale and options
 */
export type DateFormatter = (date: string) => string;

/**
 * Creates a native locale-based date formatter using Intl.DateTimeFormat
 * 
 * @param locale - BCP 47 language tag (e.g., "en-US", "fr-FR"). If undefined, uses system default
 * @param options - Intl.DateTimeFormat options for controlling date format output
 * @param fallbackOptions - Fallback substring extraction options when Intl.DateTimeFormat is unavailable
 * @returns A formatter function that converts date strings to locale-specific format, or undefined if no formatting is possible
 * 
 * @example
 *