/**
 * Date formatting module that extracts and formats the day of month
 * from a time structure.
 * 
 * @module module__e
 * @originalId %e
 */

/**
 * Time structure containing date/time components
 */
interface TimeStruct {
  /** Day of the month (1-31) */
  tm_mday: number;
  // ... potentially other fields like tm_year, tm_mon, etc.
}

/**
 * Formats a numeric value with padding
 * 
 * @param value - The numeric value to format
 * @param width - The desired width of the output string
 * @param padChar - Character used for padding (e.g., " " or "0")
 * @returns Formatted string with specified width and padding
 */
declare function a(value: number, width: number, padChar: string): string;

/**
 * Extracts and formats the day of month from a time structure
 * 
 * @param timeStruct - Time structure containing the tm_mday field
 * @returns Space-padded 2-character string representing the day (e.g., " 1", "15")
 */
declare function formatDayOfMonth(timeStruct: TimeStruct): string;

export default formatDayOfMonth;