/**
 * Represents a calendar date broken down into components (similar to C's struct tm)
 */
interface TimeComponents {
  /** Day of the month (1-31) */
  tm_mday: number;
  /** Month (0-11, where 0 = January) */
  tm_mon: number;
  /** Year (offset from 1900) */
  tm_year: number;
}

/**
 * Array of days in each month for non-leap years
 */
declare const DAYS_IN_MONTH_NORMAL: readonly [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

/**
 * Array of days in each month for leap years
 */
declare const DAYS_IN_MONTH_LEAP: readonly [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

/**
 * Determines if a given year is a leap year
 * @param year - Full year (e.g., 2024)
 * @returns True if the year is a leap year
 */
declare function isLeapYear(year: number): boolean;

/**
 * Calculates cumulative days in months up to (but not including) the specified month
 * @param daysArray - Array of days per month (12 elements)
 * @param monthIndex - Target month index (0-11)
 * @returns Total days in all months before the target month
 */
declare function sumDaysUpToMonth(daysArray: readonly number[], monthIndex: number): number;

/**
 * Calculates the day of the year (1-366) for a given date
 * @param date - Date components
 * @returns Day number in the year (1 = January 1st)
 */
declare function calculateDayOfYear(date: TimeComponents): number;