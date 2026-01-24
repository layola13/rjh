/**
 * Formats the hour component of a time object to 12-hour format with zero-padding.
 * 
 * @remarks
 * This function converts 24-hour time format to 12-hour format:
 * - Midnight (0) becomes 12
 * - Hours 1-12 remain unchanged
 * - Hours 13-23 are converted to 1-11
 * 
 * @param timeData - Time data object containing hour information
 * @returns Zero-padded hour string in 12-hour format (e.g., "01", "12")
 */
export declare function formatHourTo12Hour(timeData: TimeData): string;

/**
 * Represents time data structure with hour component.
 */
export interface TimeData {
  /**
   * Hour component in 24-hour format (0-23).
   */
  tm_hour: number;
}

/**
 * Pads a number with leading zeros to achieve specified width.
 * 
 * @param value - The numeric value to pad
 * @param width - The desired total width of the resulting string
 * @returns Zero-padded string representation
 */
declare function B(value: number, width: number): string;