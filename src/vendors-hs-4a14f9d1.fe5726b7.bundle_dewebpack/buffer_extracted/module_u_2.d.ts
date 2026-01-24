/**
 * Time structure interface based on C's struct tm
 */
interface TimeStruct {
  /** Day of week (0-6, where 0 is Sunday) */
  tm_wday?: number;
  /** Seconds (0-60) */
  tm_sec?: number;
  /** Minutes (0-59) */
  tm_min?: number;
  /** Hours (0-23) */
  tm_hour?: number;
  /** Day of month (1-31) */
  tm_mday?: number;
  /** Month (0-11) */
  tm_mon?: number;
  /** Year since 1900 */
  tm_year?: number;
  /** Day of year (0-365) */
  tm_yday?: number;
  /** Daylight saving time flag */
  tm_isdst?: number;
}

/**
 * Gets the day of week from a time structure, defaulting to 7 (Sunday in ISO-8601) if not set
 * @param timeStruct - Time structure object
 * @returns Day of week (1-7, where 7 represents Sunday)
 */
declare function getWeekDay(timeStruct: TimeStruct): number;

export { TimeStruct, getWeekDay };