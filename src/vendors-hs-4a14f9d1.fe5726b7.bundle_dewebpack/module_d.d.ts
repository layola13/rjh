/**
 * Time structure interface containing day of month field
 */
interface TimeStruct {
  /** Day of the month (1-31) */
  tm_mday: number;
  [key: string]: unknown;
}

/**
 * Formatter function that processes time data
 * @param dayOfMonth - The day of the month value
 * @param padding - Padding/formatting parameter
 * @returns Formatted result
 */
declare function B(dayOfMonth: number, padding: number): string;

/**
 * Module %d: Extracts and formats the day of month from a time structure
 * @param timeData - Time structure containing tm_mday property
 * @returns Formatted day of month string
 */
declare const moduleD: (timeData: TimeStruct) => string;

export default moduleD;