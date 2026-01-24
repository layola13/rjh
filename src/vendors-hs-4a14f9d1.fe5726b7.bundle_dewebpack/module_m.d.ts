/**
 * Time formatting module
 * Formats the minute component of a time object
 */

/**
 * Time object interface
 */
interface TimeObject {
  /** Minutes component (0-59) */
  tm_min: number;
  /** Hours component (0-23) */
  tm_hour?: number;
  /** Seconds component (0-59) */
  tm_sec?: number;
}

/**
 * Pads a number with leading zeros
 * @param value - The number to pad
 * @param width - The desired width of the output string
 * @returns Zero-padded string representation
 */
declare function B(value: number, width: number): string;

/**
 * Formats the minute component of a time object
 * @param timeObj - Time object containing tm_min property
 * @returns Zero-padded minute string (e.g., "05", "42")
 */
declare function formatMinutes(timeObj: TimeObject): string;

export { TimeObject, formatMinutes, B };