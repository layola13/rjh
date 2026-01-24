/**
 * Time structure interface containing day of month field
 */
interface TimeStruct {
  /** Day of the month (1-31) */
  tm_mday: number;
}

/**
 * Formats a numeric value with specified width and padding
 * @param value - The numeric value to format
 * @param width - The desired width of the output string
 * @param padding - The padding character to use
 * @returns Formatted string representation
 */
declare function formatWithPadding(
  value: number,
  width: number,
  padding: string
): string;

/**
 * Extracts and formats the day of month from a time structure
 * @param timeStruct - Time structure containing tm_mday field
 * @returns Formatted day of month string (space-padded, 2 characters wide)
 */
declare function formatDayOfMonth(timeStruct: TimeStruct): string;