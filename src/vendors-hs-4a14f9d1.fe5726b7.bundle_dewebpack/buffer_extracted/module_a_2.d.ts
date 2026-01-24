/**
 * Time structure interface (similar to C's struct tm)
 */
interface TimeStruct {
  /** Day of week (0-6, Sunday = 0) */
  tm_wday: number;
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
 * Weekday names or values indexed by day number
 */
type WeekdayMap<T = string> = readonly T[];

/**
 * Gets the weekday value from a map using the time structure's day of week
 * @param timeStruct - Time structure containing tm_wday property
 * @param weekdayMap - Array of weekday values indexed by day number (0-6)
 * @returns The weekday value at the specified index
 */
declare function getWeekdayValue<T>(
  timeStruct: TimeStruct,
  weekdayMap: WeekdayMap<T>
): T;

/**
 * Module: module__A
 * Maps a time structure's weekday index to a corresponding value
 */
export { TimeStruct, WeekdayMap, getWeekdayValue };