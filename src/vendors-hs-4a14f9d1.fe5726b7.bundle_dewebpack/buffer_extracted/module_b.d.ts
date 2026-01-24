/**
 * Module: module__B
 * Original ID: %B
 */

/**
 * Represents a time structure, typically from C's tm struct
 */
interface TimeStruct {
  /** Month (0-11, where 0 = January) */
  tm_mon: number;
  /** Seconds (0-60, allowing for leap seconds) */
  tm_sec?: number;
  /** Minutes (0-59) */
  tm_min?: number;
  /** Hours (0-23) */
  tm_hour?: number;
  /** Day of month (1-31) */
  tm_mday?: number;
  /** Year (since 1900) */
  tm_year?: number;
  /** Day of week (0-6, where 0 = Sunday) */
  tm_wday?: number;
  /** Day of year (0-365) */
  tm_yday?: number;
  /** Daylight saving time flag */
  tm_isdst?: number;
}

/**
 * Array or collection indexed by month values
 * Maps month indices to their corresponding values
 */
type MonthIndexedCollection<T> = T[];

/**
 * Retrieves a value from a month-indexed collection based on the month field of a TimeStruct
 * 
 * @param timeStruct - The time structure containing the month value
 * @returns The value corresponding to the month index from the collection
 * 
 * @example
 * const monthNames = ['Jan', 'Feb', 'Mar', ...];
 * const time = { tm_mon: 0 };
 * const result = getMonthValue(time); // Returns 'Jan'
 */
declare function getMonthValue<T>(timeStruct: TimeStruct): T;

export { TimeStruct, MonthIndexedCollection, getMonthValue };