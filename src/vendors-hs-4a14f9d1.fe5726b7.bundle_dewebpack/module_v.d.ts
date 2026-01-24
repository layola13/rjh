/**
 * Calculates ISO 8601 week number for a given date
 * @param date - Date object containing time fields
 * @returns Formatted week number string (01-53)
 */
export declare function calculateISOWeekNumber(date: DateFields): string;

/**
 * Date fields structure representing broken-down time
 */
export interface DateFields {
  /** Day of year (0-365) */
  tm_yday: number;
  /** Day of week (0=Sunday, 6=Saturday) */
  tm_wday: number;
  /** Years since 1900 */
  tm_year: number;
}

/**
 * Checks if a given year is a leap year
 * @param year - Year to check (full year or offset from 1900)
 * @returns true if the year is a leap year, false otherwise
 */
declare function hA(year: number): boolean;

/**
 * Formats a number with leading zeros
 * @param value - Number to format
 * @param width - Minimum width of the output string
 * @returns Zero-padded string representation
 */
declare function B(value: number, width: number): string;