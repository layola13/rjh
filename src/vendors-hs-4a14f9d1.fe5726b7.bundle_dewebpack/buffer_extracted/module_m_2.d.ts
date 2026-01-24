/**
 * Time structure interface representing a decomposed date/time value
 * Similar to C's struct tm
 */
interface TimeStruct {
  /** Month (0-11, where 0 = January) */
  tm_mon: number;
  /** Day of month (1-31) */
  tm_mday?: number;
  /** Year (e.g., 2024) */
  tm_year?: number;
  /** Hours (0-23) */
  tm_hour?: number;
  /** Minutes (0-59) */
  tm_min?: number;
  /** Seconds (0-59) */
  tm_sec?: number;
  /** Day of week (0-6, where 0 = Sunday) */
  tm_wday?: number;
}

/**
 * Converts a time structure to a formatted month string
 * @param timeStruct - The time structure containing month information
 * @returns Formatted month string (01-12) with leading zero padding
 * @example
 * const time = { tm_mon: 0 }; // January
 * const result = formatMonth(time); // Returns "01"
 */
declare function formatMonth(timeStruct: TimeStruct): string;

/**
 * Formats a number with zero-padding to specified width
 * @param value - The numeric value to format
 * @param width - The minimum width with zero-padding
 * @returns Zero-padded string representation
 */
declare function B(value: number, width: number): string;

export { TimeStruct, formatMonth, B };