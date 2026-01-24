/**
 * Extracts the day of the week from a time structure.
 * 
 * @param tm - A time structure object containing date/time components
 * @returns The day of the week (0-6, where 0 is Sunday)
 */
declare function getDayOfWeek(tm: TimeStructure): number;

/**
 * Represents a time structure containing date and time components.
 * Typically follows the POSIX tm structure format.
 */
interface TimeStructure {
  /** Seconds after the minute (0-59) */
  tm_sec?: number;
  
  /** Minutes after the hour (0-59) */
  tm_min?: number;
  
  /** Hours since midnight (0-23) */
  tm_hour?: number;
  
  /** Day of the month (1-31) */
  tm_mday?: number;
  
  /** Months since January (0-11) */
  tm_mon?: number;
  
  /** Years since 1900 */
  tm_year?: number;
  
  /** Days since Sunday (0-6) */
  tm_wday: number;
  
  /** Days since January 1 (0-365) */
  tm_yday?: number;
  
  /** Daylight Saving Time flag */
  tm_isdst?: number;
}

export { getDayOfWeek, TimeStructure };