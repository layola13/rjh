/**
 * Calculates the ISO week number of the year for a given date.
 * 
 * This function computes which week of the year a date falls into,
 * adjusting for the day of the week. The calculation follows the convention
 * where weeks start on Sunday (tm_wday = 0).
 * 
 * @param date - A date object containing day of year and day of week information
 * @param formatter - A formatting function that pads the week number to a specific width
 * @returns The formatted week number string
 */
declare function calculateWeekNumber(
  date: DateInfo,
  formatter: NumberFormatter
): string;

/**
 * Represents date information needed for week number calculation.
 */
interface DateInfo {
  /**
   * Day of the year (0-365, where 0 is January 1st)
   */
  tm_yday: number;

  /**
   * Day of the week (0-6, where 0 is Sunday)
   */
  tm_wday: number;
}

/**
 * A function that formats a number to a string with specific padding.
 * 
 * @param value - The numeric value to format
 * @param width - The minimum width of the output string (will be zero-padded)
 * @returns The formatted string representation
 */
type NumberFormatter = (value: number, width: number) => string;

export { calculateWeekNumber, DateInfo, NumberFormatter };