/**
 * Calendar event parsing and date range utilities
 * @module VCalendar/util/events
 */

/**
 * Represents a timestamp with date and optional time information
 */
export interface Timestamp {
  /** Year (e.g., 2024) */
  year: number;
  /** Month (1-12) */
  month: number;
  /** Day of month (1-31) */
  day: number;
  /** Hour in 24-hour format (0-23), undefined if no time */
  hour?: number;
  /** Minute (0-59), undefined if no time */
  minute?: number;
  /** Whether this timestamp includes time information */
  hasTime: boolean;
  /** Day of week (0-6, where 0 is Sunday) */
  weekday: number;
  /** Date object representation */
  date: Date;
}

/**
 * Represents a parsed calendar event with computed date/time boundaries
 */
export interface ParsedEvent<T = any> {
  /** Original input event object */
  input: T;
  /** Parsed start timestamp */
  start: Timestamp;
  /** Start date identifier (YYYYMMDD format as number) */
  startIdentifier: number;
  /** Start timestamp identifier including time (YYYYMMDDHHmm format as number) */
  startTimestampIdentifier: number;
  /** Parsed end timestamp */
  end: Timestamp;
  /** End date identifier (YYYYMMDD format as number) */
  endIdentifier: number;
  /** End timestamp identifier including time (YYYYMMDDHHmm format as number) */
  endTimestampIdentifier: number;
  /** Whether this is an all-day event (no specific time) */
  allDay: boolean;
  /** Index position of this event in the original collection */
  index: number;
  /** Event category for classification/filtering */
  category: string;
}

/**
 * Parses a raw event object into a structured event with computed date ranges
 * 
 * @template T - Type of the input event object
 * @param eventInput - The raw event object to parse
 * @param index - Index position of this event in the collection
 * @param startKey - Property name containing the start date/time string
 * @param endKey - Property name containing the end date/time string
 * @param forceTimedEvent - If true, treats dateless events as timed (default: false)
 * @param category - Category label for the event (default: empty string)
 * @returns Parsed event with normalized timestamps and identifiers
 */
export function parseEvent<T = any>(
  eventInput: T,
  index: number,
  startKey: keyof T,
  endKey: keyof T,
  forceTimedEvent?: boolean,
  category?: string
): ParsedEvent<T>;

/**
 * Checks if an event is active/occurring on a specific day
 * 
 * @param event - The parsed event to check
 * @param dayIdentifier - Day identifier to test (YYYYMMDD format as number)
 * @returns True if the event spans or occurs on the given day
 */
export function isEventOn(event: ParsedEvent, dayIdentifier: number): boolean;

/**
 * Determines if an event starts on a specific day or week boundary
 * 
 * @param event - The parsed event to check
 * @param day - Day object with weekday information
 * @param dayIdentifier - Day identifier to test (YYYYMMDD format as number)
 * @param firstWeekday - First day of the week (0-6, where 0 is Sunday)
 * @returns True if the event starts on the given day or is the first occurrence in a week view
 */
export function isEventStart(
  event: ParsedEvent,
  day: { weekday: number },
  dayIdentifier: number,
  firstWeekday: number
): boolean;

/**
 * Checks if an event overlaps with a given date range
 * 
 * @param event - The parsed event to check
 * @param startIdentifier - Range start day identifier (YYYYMMDD format as number)
 * @param endIdentifier - Range end day identifier (YYYYMMDD format as number)
 * @returns True if the event overlaps with the specified range
 */
export function isEventOverlapping(
  event: ParsedEvent,
  startIdentifier: number,
  endIdentifier: number
): boolean;