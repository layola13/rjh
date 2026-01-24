/**
 * Extracts the day of the week from a time structure.
 * 
 * @param timeValue - A time structure object containing calendar information
 * @returns The day of the week (0-6, where 0 is Sunday)
 * 
 * @remarks
 * The tm_wday field represents the number of days since Sunday, in the range 0 to 6.
 * This is a standard component of the tm structure used in time manipulation.
 */
declare function getWeekday(timeValue: TimeStruct): number;

/**
 * Represents a time structure containing broken-down calendar time.
 * 
 * @remarks
 * This interface models the standard tm structure used in C/POSIX time functions.
 */
interface TimeStruct {
  /** Seconds after the minute (0-60, allowing for leap seconds) */
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
  
  /** Daylight Saving Time flag (positive if DST is in effect, 0 if not, negative if unknown) */
  tm_isdst?: number;
}

export { getWeekday, TimeStruct };