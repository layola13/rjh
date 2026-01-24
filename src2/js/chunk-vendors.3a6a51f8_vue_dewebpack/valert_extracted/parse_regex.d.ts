/**
 * Timestamp utility module for VCalendar component
 * Provides date/time parsing, manipulation, and formatting functions
 */

/**
 * Regular expression to parse timestamp strings in format: YYYY-MM-DD hh:mm:ss
 */
export const PARSE_REGEX: RegExp;

/**
 * Regular expression to parse time strings in format: hh:mm:ss
 */
export const PARSE_TIME: RegExp;

/**
 * Array of days in each month for non-leap years (index 0 is unused)
 */
export const DAYS_IN_MONTH: ReadonlyArray<number>;

/**
 * Array of days in each month for leap years (index 0 is unused)
 */
export const DAYS_IN_MONTH_LEAP: ReadonlyArray<number>;

/**
 * Minimum number of days in any month
 */
export const DAYS_IN_MONTH_MIN: 28;

/**
 * Maximum number of days in any month
 */
export const DAYS_IN_MONTH_MAX: 31;

/**
 * Maximum month value (December)
 */
export const MONTH_MAX: 12;

/**
 * Minimum month value (January)
 */
export const MONTH_MIN: 1;

/**
 * Minimum day value
 */
export const DAY_MIN: 1;

/**
 * Number of days in a week
 */
export const DAYS_IN_WEEK: 7;

/**
 * Number of minutes in an hour
 */
export const MINUTES_IN_HOUR: 60;

/**
 * Maximum minute value
 */
export const MINUTE_MAX: 59;

/**
 * Number of minutes in a day
 */
export const MINUTES_IN_DAY: 1440;

/**
 * Number of hours in a day
 */
export const HOURS_IN_DAY: 24;

/**
 * Maximum hour value (23:00)
 */
export const HOUR_MAX: 23;

/**
 * First hour of the day (00:00)
 */
export const FIRST_HOUR: 0;

/**
 * Offset multiplier for year in day identifier calculations
 */
export const OFFSET_YEAR: 10000;

/**
 * Offset multiplier for month in day identifier calculations
 */
export const OFFSET_MONTH: 100;

/**
 * Offset multiplier for hour in time identifier calculations
 */
export const OFFSET_HOUR: 100;

/**
 * Offset multiplier for time in timestamp identifier calculations
 */
export const OFFSET_TIME: 10000;

/**
 * Represents a parsed timestamp with date and time components
 */
export interface VTimestamp {
  /** Formatted date string (YYYY-MM-DD) */
  date: string;
  /** Formatted time string (HH:mm) */
  time: string;
  /** Year (e.g., 2024) */
  year: number;
  /** Month (1-12) */
  month: number;
  /** Day of month (1-31) */
  day: number;
  /** Day of week (0-6, 0=Sunday) */
  weekday: number;
  /** Hour (0-23) */
  hour: number;
  /** Minute (0-59) */
  minute: number;
  /** Whether day component is specified */
  hasDay: boolean;
  /** Whether time component is specified */
  hasTime: boolean;
  /** Whether timestamp is in the past relative to now */
  past: boolean;
  /** Whether timestamp is present (same as now) */
  present: boolean;
  /** Whether timestamp is in the future relative to now */
  future: boolean;
}

/**
 * Time input - can be minutes since midnight, time string, or object with hour/minute
 */
export type TimeInput = number | string | { hour: number; minute: number };

/**
 * Timestamp input - can be Date object, milliseconds since epoch, or ISO date string
 */
export type TimestampInput = Date | number | string;

/**
 * Weekday array - typically contains weekday indices that are enabled (0-6)
 */
export type WeekdayArray = number[];

/**
 * Get the start of the week for a given timestamp
 * @param timestamp - The reference timestamp
 * @param weekdays - Array of enabled weekdays
 * @param now - Optional current timestamp for relative calculations
 * @returns New timestamp representing start of week
 */
export function getStartOfWeek(
  timestamp: VTimestamp,
  weekdays: WeekdayArray,
  now?: VTimestamp
): VTimestamp;

/**
 * Get the end of the week for a given timestamp
 * @param timestamp - The reference timestamp
 * @param weekdays - Array of enabled weekdays
 * @param now - Optional current timestamp for relative calculations
 * @returns New timestamp representing end of week
 */
export function getEndOfWeek(
  timestamp: VTimestamp,
  weekdays: WeekdayArray,
  now?: VTimestamp
): VTimestamp;

/**
 * Get the start of the month for a given timestamp
 * @param timestamp - The reference timestamp
 * @returns New timestamp with day set to 1
 */
export function getStartOfMonth(timestamp: VTimestamp): VTimestamp;

/**
 * Get the end of the month for a given timestamp
 * @param timestamp - The reference timestamp
 * @returns New timestamp with day set to last day of month
 */
export function getEndOfMonth(timestamp: VTimestamp): VTimestamp;

/**
 * Validate if input is a valid time value
 * @param time - Time value to validate
 * @returns True if valid time input
 */
export function validateTime(time: unknown): time is TimeInput;

/**
 * Parse time input into minutes since midnight
 * @param time - Time to parse (number, string, or object)
 * @returns Minutes since midnight, or false if invalid
 */
export function parseTime(time: TimeInput): number | false;

/**
 * Validate if input is a valid timestamp value
 * @param timestamp - Timestamp value to validate
 * @returns True if valid timestamp input
 */
export function validateTimestamp(timestamp: unknown): timestamp is TimestampInput;

/**
 * Parse timestamp input into VTimestamp object
 * @param input - Timestamp to parse (Date, number, or string)
 * @param strict - If true, throws error on invalid input
 * @param now - Optional current timestamp for relative calculations
 * @returns Parsed VTimestamp object, or null if invalid and not strict
 * @throws Error if strict mode and input is invalid
 */
export function parseTimestamp(
  input: TimestampInput,
  strict?: boolean,
  now?: VTimestamp
): VTimestamp | null;

/**
 * Parse a Date object into VTimestamp
 * @param date - JavaScript Date object
 * @returns VTimestamp representation of the date
 */
export function parseDate(date: Date): VTimestamp;

/**
 * Get unique day identifier for a timestamp
 * @param timestamp - The timestamp
 * @returns Numeric identifier based on year, month, and day
 */
export function getDayIdentifier(timestamp: VTimestamp): number;

/**
 * Get unique time identifier for a timestamp
 * @param timestamp - The timestamp
 * @returns Numeric identifier based on hour and minute
 */
export function getTimeIdentifier(timestamp: VTimestamp): number;

/**
 * Get unique timestamp identifier combining date and time
 * @param timestamp - The timestamp
 * @returns Numeric identifier for the complete timestamp
 */
export function getTimestampIdentifier(timestamp: VTimestamp): number;

/**
 * Update the relative time flags (past, present, future) of a timestamp
 * @param timestamp - Timestamp to update (modified in-place)
 * @param now - Reference timestamp to compare against
 * @param includeTime - Whether to include time in comparison
 * @returns The modified timestamp
 */
export function updateRelative(
  timestamp: VTimestamp,
  now: VTimestamp,
  includeTime?: boolean
): VTimestamp;

/**
 * Check if input is a timeless value (Date or timestamp number)
 * @param input - Value to check
 * @returns True if input is Date or finite number
 */
export function isTimedless(input: unknown): input is Date | number;

/**
 * Update the hasTime flag and adjust time values accordingly
 * @param timestamp - Timestamp to update (modified in-place)
 * @param hasTime - New hasTime value
 * @param now - Optional reference timestamp for relative update
 * @returns The modified timestamp
 */
export function updateHasTime(
  timestamp: VTimestamp,
  hasTime: boolean,
  now?: VTimestamp
): VTimestamp;

/**
 * Update timestamp to specific minute of day
 * @param timestamp - Timestamp to update (modified in-place)
 * @param minutes - Minutes since midnight
 * @param now - Optional reference timestamp for relative update
 * @returns The modified timestamp
 */
export function updateMinutes(
  timestamp: VTimestamp,
  minutes: number,
  now?: VTimestamp
): VTimestamp;

/**
 * Update the weekday field based on date
 * @param timestamp - Timestamp to update (modified in-place)
 * @returns The modified timestamp
 */
export function updateWeekday(timestamp: VTimestamp): VTimestamp;

/**
 * Update the formatted date and time strings
 * @param timestamp - Timestamp to update (modified in-place)
 * @returns The modified timestamp
 */
export function updateFormatted(timestamp: VTimestamp): VTimestamp;

/**
 * Calculate weekday (0-6) for a timestamp using Zeller's congruence
 * @param timestamp - The timestamp
 * @returns Weekday index (0=Sunday, 6=Saturday)
 */
export function getWeekday(timestamp: VTimestamp): number;

/**
 * Get number of days in a specific month
 * @param year - The year
 * @param month - The month (1-12)
 * @returns Number of days in the month
 */
export function daysInMonth(year: number, month: number): number;

/**
 * Create a shallow copy of a timestamp
 * @param timestamp - Timestamp to copy
 * @returns New VTimestamp object with same values
 */
export function copyTimestamp(timestamp: VTimestamp): VTimestamp;

/**
 * Pad a number with leading zeros
 * @param value - Number to pad
 * @param length - Desired string length
 * @returns Zero-padded string
 */
export function padNumber(value: number, length: number): string;

/**
 * Get formatted date string (YYYY-MM-DD)
 * @param timestamp - The timestamp
 * @returns Formatted date string
 */
export function getDate(timestamp: VTimestamp): string;

/**
 * Get formatted time string (HH:mm)
 * @param timestamp - The timestamp
 * @returns Formatted time string, or empty string if no time
 */
export function getTime(timestamp: VTimestamp): string;

/**
 * Add minutes to a timestamp, rolling over to next day if needed
 * @param timestamp - Timestamp to modify (modified in-place)
 * @param minutes - Minutes to add
 * @returns The modified timestamp
 */
export function nextMinutes(timestamp: VTimestamp, minutes: number): VTimestamp;

/**
 * Advance timestamp to next day
 * @param timestamp - Timestamp to modify (modified in-place)
 * @returns The modified timestamp
 */
export function nextDay(timestamp: VTimestamp): VTimestamp;

/**
 * Move timestamp to previous day
 * @param timestamp - Timestamp to modify (modified in-place)
 * @returns The modified timestamp
 */
export function prevDay(timestamp: VTimestamp): VTimestamp;

/**
 * Move timestamp by relative number of days
 * @param timestamp - Timestamp to modify (modified in-place)
 * @param dayFunc - Function to move one day (nextDay or prevDay)
 * @param count - Number of days to move
 * @returns The modified timestamp
 */
export function relativeDays(
  timestamp: VTimestamp,
  dayFunc?: (timestamp: VTimestamp) => VTimestamp,
  count?: number
): VTimestamp;

/**
 * Calculate difference in minutes between two timestamps
 * @param start - Start timestamp
 * @param end - End timestamp
 * @returns Difference in minutes (end - start)
 */
export function diffMinutes(start: VTimestamp, end: VTimestamp): number;

/**
 * Find next occurrence of a specific weekday
 * @param timestamp - Timestamp to modify (modified in-place)
 * @param targetWeekday - Target weekday (0-6)
 * @param dayFunc - Function to move one day (default: nextDay)
 * @param maxIterations - Maximum iterations to prevent infinite loop
 * @returns The modified timestamp
 */
export function findWeekday(
  timestamp: VTimestamp,
  targetWeekday: number,
  dayFunc?: (timestamp: VTimestamp) => VTimestamp,
  maxIterations?: number
): VTimestamp;

/**
 * Calculate skip counts for each weekday based on enabled weekdays
 * @param weekdays - Array of enabled weekday indices
 * @returns Array of skip counts for each weekday (0-6)
 */
export function getWeekdaySkips(weekdays: WeekdayArray): number[];

/**
 * Convert VTimestamp to JavaScript Date object
 * @param timestamp - The timestamp
 * @returns JavaScript Date object
 */
export function timestampToDate(timestamp: VTimestamp): Date;

/**
 * Create list of timestamps for calendar day display
 * @param start - Start timestamp
 * @param end - End timestamp
 * @param now - Reference timestamp for relative calculations
 * @param weekdaySkips - Array indicating which weekdays to include
 * @param maxDays - Maximum number of days to generate
 * @param minDays - Minimum number of days to generate
 * @returns Array of VTimestamp objects for each day
 * @throws Error if end is before start or no valid dates found
 */
export function createDayList(
  start: VTimestamp,
  end: VTimestamp,
  now: VTimestamp,
  weekdaySkips: number[],
  maxDays?: number,
  minDays?: number
): VTimestamp[];

/**
 * Create list of timestamps at regular intervals within a day
 * @param timestamp - Base timestamp
 * @param startMinutes - Starting minute of day
 * @param intervalMinutes - Interval between timestamps in minutes
 * @param count - Number of intervals to generate
 * @param now - Reference timestamp for relative calculations
 * @returns Array of VTimestamp objects at each interval
 */
export function createIntervalList(
  timestamp: VTimestamp,
  startMinutes: number,
  intervalMinutes: number,
  count: number,
  now: VTimestamp
): VTimestamp[];

/**
 * Formatter function returned by createNativeLocaleFormatter
 */
export type NativeLocaleFormatter = (
  timestamp: VTimestamp,
  short: boolean
) => string;

/**
 * Options callback for Intl.DateTimeFormat
 */
export type FormatterOptions = (
  timestamp: VTimestamp,
  short: boolean
) => Intl.DateTimeFormatOptions;

/**
 * Create a locale-aware date/time formatter using Intl.DateTimeFormat
 * @param locale - BCP 47 locale identifier (e.g., 'en-US')
 * @param getOptions - Function that returns format options based on timestamp
 * @returns Formatter function that formats timestamps to localized strings
 */
export function createNativeLocaleFormatter(
  locale: string | undefined,
  getOptions: FormatterOptions
): NativeLocaleFormatter;