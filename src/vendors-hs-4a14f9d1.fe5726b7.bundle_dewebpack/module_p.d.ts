/**
 * Time period indicator interface
 * Represents a time structure with hour information
 */
interface TimeInfo {
  /** Hour in 24-hour format (0-23) */
  tm_hour: number;
}

/**
 * Determines whether a given time falls in AM or PM period
 * 
 * @param timeInfo - Time information object containing the hour
 * @returns "AM" if hour is between 0-11 (inclusive), "PM" if hour is between 12-23
 * 
 * @example
 *