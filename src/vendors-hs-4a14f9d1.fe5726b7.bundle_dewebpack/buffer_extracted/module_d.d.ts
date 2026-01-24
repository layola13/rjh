/**
 * Date formatter module for day of month formatting
 * 
 * This module provides functionality to format the day of the month (tm_mday)
 * from a time structure into a padded string representation.
 * 
 * @module date-formatter
 */

/**
 * Represents a time structure containing date/time components
 * Similar to the C struct tm
 */
interface TimeStructure {
  /** Day of the month (1-31) */
  tm_mday: number;
  
  /** Seconds (0-60, allowing for leap seconds) */
  tm_sec?: number;
  
  /** Minutes (0-59) */
  tm_min?: number;
  
  /** Hours (0-23) */
  tm_hour?: number;
  
  /** Month (0-11) */
  tm_mon?: number;
  
  /** Year since 1900 */
  tm_year?: number;
  
  /** Day of week (0-6, Sunday = 0) */
  tm_wday?: number;
  
  /** Day of year (0-365) */
  tm_yday?: number;
  
  /** Daylight saving time flag */
  tm_isdst?: number;
}

/**
 * Pads a number with leading zeros to reach the specified width
 * 
 * @param value - The numeric value to pad
 * @param width - The desired total width of the output string
 * @returns The zero-padded string representation of the value
 * 
 * @example
 *