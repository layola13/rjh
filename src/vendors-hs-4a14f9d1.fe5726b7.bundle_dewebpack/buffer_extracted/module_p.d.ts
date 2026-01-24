/**
 * Time structure interface representing time components
 */
interface TimeStruct {
  /** Hour of the day (0-23) */
  tm_hour: number;
  /** Minute of the hour (0-59) */
  tm_min?: number;
  /** Second of the minute (0-59) */
  tm_sec?: number;
}

/**
 * Determines the period of day (AM/PM) based on hour
 * @param time - Time structure containing hour information
 * @returns "AM" for hours 0-11, "PM" for hours 12-23
 */
declare function getPeriod(time: TimeStruct): "AM" | "PM";

export { TimeStruct, getPeriod };