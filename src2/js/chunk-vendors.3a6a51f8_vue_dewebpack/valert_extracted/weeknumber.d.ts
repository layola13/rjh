/**
 * Date and time utility functions for calendar calculations
 */

/**
 * Calculate the week number of a given date within a year
 * 
 * @param year - The year of the date
 * @param month - The month of the date (0-11, where 0 is January)
 * @param day - The day of the month (1-31)
 * @param firstDayOfWeek - The first day of the week (0-6, where 0 is Sunday)
 * @param minimalDaysInFirstWeek - Minimum days required in the first week of the year
 * @returns The week number (1-53)
 */
export declare function weekNumber(
  year: number,
  month: number,
  day: number,
  firstDayOfWeek: number,
  minimalDaysInFirstWeek: number
): number;

/**
 * Determine if a given year is a leap year
 * 
 * A year is a leap year if:
 * - It is divisible by 4 AND not divisible by 100, OR
 * - It is divisible by 400
 * 
 * @param year - The year to check
 * @returns True if the year is a leap year, false otherwise
 */
export declare function isLeapYear(year: number): boolean;