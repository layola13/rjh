/**
 * Calculates the ISO 8601 week number of the year (Monday as first day of week).
 * Week 1 is the first week containing a Monday.
 * 
 * @param dateInfo - Object containing day-of-year and day-of-week information
 * @returns Two-digit string representation of the week number (00-53)
 */
declare function calculateWeekNumber(dateInfo: DateInfo): string;

/**
 * Date information structure containing calendar calculations
 */
interface DateInfo {
  /** Day of year (0-365, where 0 = January 1st) */
  tm_yday: number;
  
  /** Day of week (0-6, where 0 = Sunday, 6 = Saturday) */
  tm_wday: number;
}

/**
 * Formats a number with leading zeros to specified width
 * 
 * @param value - The numeric value to format
 * @param width - The minimum width of the output string
 * @returns Zero-padded string representation of the value
 */
declare function formatWithLeadingZeros(value: number, width: number): string;