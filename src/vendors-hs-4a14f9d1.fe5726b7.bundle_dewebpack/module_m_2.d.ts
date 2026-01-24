/**
 * Date/time structure interface
 * Represents a broken-down time structure similar to C's struct tm
 */
interface DateTimeStruct {
  /** Month (0-11) */
  tm_mon: number;
  /** Other potential fields in the time structure */
  [key: string]: any;
}

/**
 * Formats a number with zero-padding to specified width
 * @param value - The numeric value to format
 * @param width - The minimum width for the formatted string (will be zero-padded)
 * @returns The formatted string with leading zeros if necessary
 */
declare function B(value: number, width: number): string;

/**
 * Formats the month field from a datetime structure
 * Converts tm_mon (0-11) to a two-digit month string (01-12)
 * 
 * @param dateTime - Date/time structure containing tm_mon field
 * @returns Two-digit month string (01-12)
 * 
 * @example
 * // Returns "03" for March
 * formatMonth({ tm_mon: 2 })
 * 
 * @example
 * // Returns "12" for December
 * formatMonth({ tm_mon: 11 })
 */
declare function formatMonth(dateTime: DateTimeStruct): string;

/**
 * Module export for month formatting
 * Original implementation: A => B(A.tm_mon + 1, 2)
 * Converts zero-based month index to two-digit month string
 */
export { formatMonth, B, DateTimeStruct };