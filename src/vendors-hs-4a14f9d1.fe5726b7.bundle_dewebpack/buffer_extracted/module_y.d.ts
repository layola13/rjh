/**
 * Time structure representing date/time components
 */
interface TimeStruct {
  /** Years since 1900 */
  tm_year: number;
  /** Other time fields would go here */
}

/**
 * Converts a TimeStruct's tm_year field to an actual calendar year
 * @param timeStruct - The time structure containing tm_year
 * @returns The actual calendar year (e.g., 2024)
 */
declare function getCalendarYear(timeStruct: TimeStruct): number;

export { TimeStruct, getCalendarYear };