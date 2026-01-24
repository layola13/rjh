/**
 * Calendar timestamp utility module
 * Provides functions for parsing, validating, and manipulating calendar timestamps
 */

/**
 * Represents a calendar timestamp with date and time information
 */
export interface CalendarTimestamp {
  /** ISO date string (YYYY-MM-DD) */
  date: string;
  /** Time string (HH:mm) */
  time: string;
  /** Four-digit year */
  year: number;
  /** Month (1-12) */
  month: number;
  /** Day of month (1-31) */
  day: number;
  /** Day of week (0-6, where 0 is Sunday) */
  weekday: number;
  /** Hour (0-23) */
  hour: number;
  /** Minute (0-59) */
  minute: number;
  /** Whether the timestamp includes a day component */
  hasDay: boolean;
  /** Whether the timestamp includes time information */
  hasTime: boolean;
  /** Whether this timestamp is in the past relative to a reference timestamp */
  past: boolean;
  /** Whether this timestamp is the same as a reference timestamp */
  present: boolean;
  /** Whether this timestamp is in the future relative to a reference timestamp */
  future: boolean;
}

/**
 * Time input as an object
 */
export interface TimeObject {
  hour: number;
  minute: number;
}

/**
 * Valid time input types
 */
export type TimeInput = number | string | TimeObject;

/**
 * Valid timestamp input types
 */
export type TimestampInput = number | string | Date;

/**
 * Weekday array (typically [0-6] representing days to display)
 */
export type WeekdayArray = number[];

/**
 * Function that formats a timestamp for a given locale
 */
export type LocaleFormatter = (timestamp: CalendarTimestamp, short: boolean) => string;

/**
 * Formatter options function
 */
export type FormatterOptions = (timestamp: CalendarTimestamp, short: boolean) => Intl.DateTimeFormatOptions;

/**
 * Regular expression for parsing timestamp strings (YYYY-MM-DD HH:mm:ss)
 */
export declare const PARSE_REGEX: RegExp;

/**
 * Regular expression for parsing time strings (HH:mm:ss)
 */
export declare const PARSE_TIME: RegExp;

/**
 * Days in each month for non-leap years (index 0 is unused, 1-12 for Jan-Dec)
 */
export declare const DAYS_IN_MONTH: readonly number[];

/**
 * Days in each month for leap years (index 0 is unused, 1-12 for Jan-Dec)
 */
export declare const DAYS_IN_MONTH_LEAP: readonly number[];

/**
 * Minimum days in any month
 */
export declare const DAYS_IN_MONTH_MIN: 28;

/**
 * Maximum days in any month
 */
export declare const DAYS_IN_MONTH_MAX: 31;

/**
 * Maximum month value
 */
export declare const MONTH_MAX: 12;

/**
 * Minimum month value
 */
export declare const MONTH_MIN: 1;

/**
 * Minimum day value
 */
export declare const DAY_MIN: 1;

/**
 * Number of days in a week
 */
export declare const DAYS_IN_WEEK: 7;

/**
 * Number of minutes in an hour
 */
export declare const MINUTES_IN_HOUR: 60;

/**
 * Maximum minute value
 */
export declare const MINUTE_MAX: 59;

/**
 * Total minutes in a day (24 * 60)
 */
export declare const MINUTES_IN_DAY: 1440;

/**
 * Number of hours in a day
 */
export declare const HOURS_IN_DAY: 24;

/**
 * Maximum hour value
 */
export declare const HOUR_MAX: 23;

/**
 * First hour of the day
 */
export declare const FIRST_HOUR: 0;

/**
 * Offset multiplier for year in identifier calculations
 */
export declare const OFFSET_YEAR: 10000;

/**
 * Offset multiplier for month in identifier calculations
 */
export declare const OFFSET_MONTH: 100;

/**
 * Offset multiplier for hour in identifier calculations
 */
export declare const OFFSET_HOUR: 100;

/**
 * Offset multiplier for time in identifier calculations
 */
export declare const OFFSET_TIME: 10000;

/**
 * Get the start of the week for a given timestamp
 * @param timestamp - The reference timestamp
 * @param weekdays - Array of weekday numbers representing the week
 * @param now - Optional current timestamp for relative calculations
 * @returns Timestamp representing the start of the week
 */
export declare function getStartOfWeek(
  timestamp: CalendarTimestamp,
  weekdays: WeekdayArray,
  now?: CalendarTimestamp
): CalendarTimestamp;

/**
 * Get the end of the week for a given timestamp
 * @param timestamp - The reference timestamp
 * @param weekdays - Array of weekday numbers representing the week
 * @param now - Optional current timestamp for relative calculations
 * @returns Timestamp representing the end of the week
 */
export declare function getEndOfWeek(
  timestamp: CalendarTimestamp,
  weekdays: WeekdayArray,
  now?: CalendarTimestamp
): CalendarTimestamp;

/**
 * Get the start of the month for a given timestamp
 * @param timestamp - The reference timestamp
 * @returns Timestamp representing the first day of the month
 */
export declare function getStartOfMonth(timestamp: CalendarTimestamp): CalendarTimestamp;

/**
 * Get the end of the month for a given timestamp
 * @param timestamp - The reference timestamp
 * @returns Timestamp representing the last day of the month
 */
export declare function getEndOfMonth(timestamp: CalendarTimestamp): CalendarTimestamp;

/**
 * Validate whether the input is a valid time value
 * @param input - Time value to validate
 * @returns True if valid, false otherwise
 */
export declare function validateTime(input: unknown): boolean;

/**
 * Parse time input into total minutes since midnight
 * @param input - Time input (number of minutes, time string, or time object)
 * @returns Total minutes since midnight, or false if invalid
 */
export declare function parseTime(input: TimeInput): number | false;

/**
 * Validate whether the input is a valid timestamp
 * @param input - Timestamp value to validate
 * @returns True if valid, false otherwise
 */
export declare function validateTimestamp(input: unknown): boolean;

/**
 * Parse timestamp input into a CalendarTimestamp object
 * @param input - Timestamp input (Date, seconds since epoch, or date string)
 * @param required - If true, throws error on invalid input; if false, returns null
 * @param now - Optional current timestamp for relative calculations
 * @returns Parsed CalendarTimestamp or null if invalid and not required
 * @throws Error if input is invalid and required is true
 */
export declare function parseTimestamp(
  input: TimestampInput,
  required?: boolean,
  now?: CalendarTimestamp
): CalendarTimestamp | null;

/**
 * Parse a Date object into a CalendarTimestamp
 * @param date - JavaScript Date object
 * @returns CalendarTimestamp representation of the date
 */
export declare function parseDate(date: Date): CalendarTimestamp;

/**
 * Get a unique numeric identifier for a day (ignoring time)
 * @param timestamp - The timestamp
 * @returns Unique day identifier
 */
export declare function getDayIdentifier(timestamp: CalendarTimestamp): number;

/**
 * Get a unique numeric identifier for time within a day
 * @param timestamp - The timestamp
 * @returns Unique time identifier
 */
export declare function getTimeIdentifier(timestamp: CalendarTimestamp): number;

/**
 * Get a unique numeric identifier for a full timestamp (date + time)
 * @param timestamp - The timestamp
 * @returns Unique timestamp identifier
 */
export declare function getTimestampIdentifier(timestamp: CalendarTimestamp): number;

/**
 * Update the relative flags (past/present/future) of a timestamp
 * @param timestamp - The timestamp to update
 * @param now - Reference timestamp to compare against
 * @param includeTime - Whether to include time in the comparison
 * @returns The updated timestamp
 */
export declare function updateRelative(
  timestamp: CalendarTimestamp,
  now: CalendarTimestamp,
  includeTime?: boolean
): CalendarTimestamp;

/**
 * Check if the input represents a timeless value (Date or epoch seconds)
 * @param input - Value to check
 * @returns True if the input is a Date or finite number
 */
export declare function isTimedless(input: unknown): boolean;

/**
 * Update whether a timestamp has time information
 * @param timestamp - The timestamp to update
 * @param hasTime - Whether the timestamp should have time
 * @param now - Optional reference timestamp for relative calculations
 * @returns The updated timestamp
 */
export declare function updateHasTime(
  timestamp: CalendarTimestamp,
  hasTime: boolean,
  now?: CalendarTimestamp
): CalendarTimestamp;

/**
 * Update the time of a timestamp using total minutes since midnight
 * @param timestamp - The timestamp to update
 * @param minutes - Total minutes since midnight
 * @param now - Optional reference timestamp for relative calculations
 * @returns The updated timestamp
 */
export declare function updateMinutes(
  timestamp: CalendarTimestamp,
  minutes: number,
  now?: CalendarTimestamp
): CalendarTimestamp;

/**
 * Update the weekday field of a timestamp based on its date
 * @param timestamp - The timestamp to update
 * @returns The updated timestamp
 */
export declare function updateWeekday(timestamp: CalendarTimestamp): CalendarTimestamp;

/**
 * Update the formatted date and time strings of a timestamp
 * @param timestamp - The timestamp to update
 * @returns The updated timestamp
 */
export declare function updateFormatted(timestamp: CalendarTimestamp): CalendarTimestamp;

/**
 * Calculate the weekday (0-6) for a given timestamp using Zeller's congruence
 * @param timestamp - The timestamp
 * @returns Weekday number (0 = Sunday, 6 = Saturday)
 */
export declare function getWeekday(timestamp: CalendarTimestamp): number;

/**
 * Get the number of days in a specific month
 * @param year - The year
 * @param month - The month (1-12)
 * @returns Number of days in the month
 */
export declare function daysInMonth(year: number, month: number): number;

/**
 * Create a shallow copy of a timestamp
 * @param timestamp - The timestamp to copy
 * @returns A new timestamp object with the same values
 */
export declare function copyTimestamp(timestamp: CalendarTimestamp): CalendarTimestamp;

/**
 * Pad a number with leading zeros
 * @param value - The number to pad
 * @param length - The desired string length
 * @returns Zero-padded string
 */
export declare function padNumber(value: number, length: number): string;

/**
 * Get the formatted date string (YYYY-MM-DD or YYYY-MM)
 * @param timestamp - The timestamp
 * @returns ISO date string
 */
export declare function getDate(timestamp: CalendarTimestamp): string;

/**
 * Get the formatted time string (HH:mm)
 * @param timestamp - The timestamp
 * @returns Time string or empty string if no time
 */
export declare function getTime(timestamp: CalendarTimestamp): string;

/**
 * Add minutes to a timestamp, rolling over to the next day if necessary
 * @param timestamp - The timestamp to modify
 * @param minutes - Number of minutes to add
 * @returns The modified timestamp
 */
export declare function nextMinutes(
  timestamp: CalendarTimestamp,
  minutes: number
): CalendarTimestamp;

/**
 * Move a timestamp to the next day
 * @param timestamp - The timestamp to modify
 * @returns The modified timestamp
 */
export declare function nextDay(timestamp: CalendarTimestamp): CalendarTimestamp;

/**
 * Move a timestamp to the previous day
 * @param timestamp - The timestamp to modify
 * @returns The modified timestamp
 */
export declare function prevDay(timestamp: CalendarTimestamp): CalendarTimestamp;

/**
 * Move a timestamp forward or backward by a number of days
 * @param timestamp - The timestamp to modify
 * @param mover - Function to move the timestamp (nextDay or prevDay)
 * @param days - Number of days to move (default: 1)
 * @returns The modified timestamp
 */
export declare function relativeDays(
  timestamp: CalendarTimestamp,
  mover?: (timestamp: CalendarTimestamp) => CalendarTimestamp,
  days?: number
): CalendarTimestamp;

/**
 * Calculate the difference in minutes between two timestamps
 * @param start - The start timestamp
 * @param end - The end timestamp
 * @returns Number of minutes between the timestamps
 */
export declare function diffMinutes(
  start: CalendarTimestamp,
  end: CalendarTimestamp
): number;

/**
 * Find the next occurrence of a specific weekday
 * @param timestamp - The timestamp to modify
 * @param weekday - Target weekday (0-6)
 * @param mover - Function to move the timestamp (default: nextDay)
 * @param maxDays - Maximum days to search (default: 6)
 * @returns The modified timestamp
 */
export declare function findWeekday(
  timestamp: CalendarTimestamp,
  weekday: number,
  mover?: (timestamp: CalendarTimestamp) => CalendarTimestamp,
  maxDays?: number
): CalendarTimestamp;

/**
 * Calculate skip distances for each weekday based on enabled weekdays
 * @param weekdays - Array of enabled weekday numbers
 * @returns Array of skip distances for each weekday
 */
export declare function getWeekdaySkips(weekdays: WeekdayArray): number[];

/**
 * Convert a CalendarTimestamp to a JavaScript Date object
 * @param timestamp - The timestamp to convert
 * @returns JavaScript Date object
 */
export declare function timestampToDate(timestamp: CalendarTimestamp): Date;

/**
 * Create a list of timestamps for a date range
 * @param start - Start timestamp
 * @param end - End timestamp
 * @param now - Current timestamp for relative calculations
 * @param weekdaySkips - Array indicating which weekdays to include
 * @param maxDays - Maximum number of days to generate (default: 42)
 * @param minDays - Minimum number of days to generate (default: 0)
 * @returns Array of CalendarTimestamp objects
 * @throws Error if end date is before start date or no valid dates found
 */
export declare function createDayList(
  start: CalendarTimestamp,
  end: CalendarTimestamp,
  now: CalendarTimestamp,
  weekdaySkips: number[],
  maxDays?: number,
  minDays?: number
): CalendarTimestamp[];

/**
 * Create a list of time intervals within a day
 * @param start - Starting timestamp for the day
 * @param startMinute - Starting minute within the day
 * @param intervalMinutes - Interval length in minutes
 * @param intervalCount - Number of intervals to create
 * @param now - Current timestamp for relative calculations
 * @returns Array of CalendarTimestamp objects representing intervals
 */
export declare function createIntervalList(
  start: CalendarTimestamp,
  startMinute: number,
  intervalMinutes: number,
  intervalCount: number,
  now: CalendarTimestamp
): CalendarTimestamp[];

/**
 * Create a native locale formatter function using Intl.DateTimeFormat
 * @param locale - BCP 47 locale identifier (e.g., 'en-US')
 * @param options - Function that returns DateTimeFormat options
 * @returns Formatter function that formats timestamps according to the locale
 */
export declare function createNativeLocaleFormatter(
  locale: string | undefined,
  options: FormatterOptions
): LocaleFormatter;