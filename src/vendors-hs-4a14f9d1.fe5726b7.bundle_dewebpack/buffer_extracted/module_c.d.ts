/**
 * Date/Time formatting module for century calculation
 * Converts a tm_year value to century format
 */

/**
 * Structure representing time components (similar to C's struct tm)
 */
interface TimeStructure {
  /** Year since 1900 */
  tm_year: number;
  tm_mon?: number;
  tm_mday?: number;
  tm_hour?: number;
  tm_min?: number;
  tm_sec?: number;
  tm_wday?: number;
  tm_yday?: number;
  tm_isdst?: number;
}

/**
 * Formats a value with zero-padding
 * @param value - The numeric value to format
 * @param width - The minimum width of the output string
 * @returns Zero-padded string representation
 */
declare function formatWithPadding(value: number, width: number): string;

/**
 * Calculates the century from a TimeStructure object
 * @param timeStruct - Time structure containing tm_year field
 * @returns Formatted century string (e.g., "19", "20", "21")
 */
declare function getCentury(timeStruct: TimeStructure): string;

export { TimeStructure, formatWithPadding, getCentury };