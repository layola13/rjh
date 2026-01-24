/**
 * Date/Time calculation module for computing day of year
 * Handles leap year adjustments and month-based day calculations
 */

/**
 * Structure representing a time/date value (similar to C's tm struct)
 */
export interface TimeStruct {
  /** Day of the month (1-31) */
  tm_mday: number;
  /** Month (0-11, where 0 = January) */
  tm_mon: number;
  /** Years since 1900 */
  tm_year: number;
}

/**
 * Days in each month for regular years
 */
export declare const DAYS_IN_REGULAR_YEAR: readonly number[];

/**
 * Days in each month for leap years
 */
export declare const DAYS_IN_LEAP_YEAR: readonly number[];

/**
 * Checks if a given year is a leap year
 * @param year - The full year (e.g., 2024)
 * @returns True if the year is a leap year, false otherwise
 */
export declare function isLeapYear(year: number): boolean;

/**
 * Calculates the sum of days from the beginning of the year up to (but not including) a given month
 * @param monthDaysArray - Array containing days in each month
 * @param monthIndex - Zero-based month index to sum up to (0 = January)
 * @returns Total number of days from January 1st to the start of the specified month
 */
export declare function sumDaysUpToMonth(
  monthDaysArray: readonly number[],
  monthIndex: number
): number;

/**
 * Computes the day of the year (1-366) from a TimeStruct
 * @param timeStruct - Time structure containing date information
 * @returns Day number within the year (1 = January 1st, 366 = December 31st in leap years)
 */
export declare function calculateDayOfYear(timeStruct: TimeStruct): number;