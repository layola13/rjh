/**
 * Time structure interface containing hour information
 */
interface TimeStructure {
  /** Hour component of time (0-23) */
  tm_hour: number;
}

/**
 * Formats a number with leading zeros to specified width
 * @param value - The numeric value to format
 * @param width - The desired width with zero-padding
 * @returns Formatted string representation
 */
declare function formatWithPadding(value: number, width: number): string;

/**
 * Extracts and formats the hour component from a time structure
 * @param timeData - Time structure containing hour information
 * @returns Zero-padded hour string (e.g., "09", "23")
 */
declare function getFormattedHour(timeData: TimeStructure): string;

/**
 * Module: module__H
 * Extracts hour from time structure and formats it as 2-digit string
 */
declare const module__H: typeof getFormattedHour;

export { TimeStructure, formatWithPadding, getFormattedHour, module__H };
export default module__H;