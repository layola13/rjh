/**
 * Date formatting utility for extracting two-digit year representation
 * @module module__y
 */

/**
 * Represents a time structure with year field
 */
interface TimeStruct {
  /** Years since 1900 */
  tm_year: number;
  /** Month (0-11) */
  tm_mon?: number;
  /** Day of month (1-31) */
  tm_mday?: number;
  /** Hours (0-23) */
  tm_hour?: number;
  /** Minutes (0-59) */
  tm_min?: number;
  /** Seconds (0-59) */
  tm_sec?: number;
  /** Day of week (0-6, Sunday = 0) */
  tm_wday?: number;
}

/**
 * Extracts the two-digit year from a time structure
 * 
 * Converts tm_year (years since 1900) to a full year, then returns
 * the last two digits as a string (e.g., 2024 -> "24")
 * 
 * @param timeStruct - Time structure containing tm_year field
 * @returns Two-digit year string representation
 * 
 * @example
 *