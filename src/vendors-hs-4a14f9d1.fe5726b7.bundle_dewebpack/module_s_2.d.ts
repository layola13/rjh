/**
 * Time formatting module
 * Formats time components with zero-padding
 */

/**
 * Formats the seconds component of a time object
 * @param timeObj - Time object containing time components
 * @returns Formatted seconds string with zero-padding (00-59)
 */
export declare function formatSeconds(timeObj: TimeObject): string;

/**
 * Time object interface containing standard time components
 */
export interface TimeObject {
  /** Seconds (0-59) */
  tm_sec: number;
  /** Minutes (0-59) */
  tm_min?: number;
  /** Hours (0-23) */
  tm_hour?: number;
  /** Day of month (1-31) */
  tm_mday?: number;
  /** Month (0-11) */
  tm_mon?: number;
  /** Year (actual year, e.g., 2024) */
  tm_year?: number;
  /** Day of week (0-6, Sunday = 0) */
  tm_wday?: number;
  /** Day of year (0-365) */
  tm_yday?: number;
  /** Daylight saving time flag */
  tm_isdst?: number;
}

/**
 * Zero-pads a number to specified width
 * @param value - The number to pad
 * @param width - Target width (default: 2)
 * @returns Zero-padded string representation
 */
declare function zeroPad(value: number, width: number): string;