/**
 * Calendar event parsing and checking utilities
 * @module events
 */

import type { 
  CalendarTimestamp, 
  TimestampIdentifier, 
  DayIdentifier 
} from './timestamp';

/**
 * Parsed calendar event with computed timestamp identifiers
 */
export interface ParsedEvent<T = any> {
  /** Original input event object */
  input: T;
  /** Parsed start timestamp */
  start: CalendarTimestamp;
  /** Day identifier for start date (YYYYMMDD format) */
  startIdentifier: DayIdentifier;
  /** Full timestamp identifier for start (includes time) */
  startTimestampIdentifier: TimestampIdentifier;
  /** Parsed end timestamp */
  end: CalendarTimestamp;
  /** Day identifier for end date (YYYYMMDD format) */
  endIdentifier: DayIdentifier;
  /** Full timestamp identifier for end (includes time, adjusted for all-day events) */
  endTimestampIdentifier: TimestampIdentifier;
  /** Whether this is an all-day event (no specific time) */
  allDay: boolean;
  /** Index of this event in the event list */
  index: number;
  /** Optional category classification for the event */
  category?: string;
}

/**
 * Raw event input object with at minimum start/end properties
 */
export interface EventInput {
  [key: string]: any;
}

/**
 * Parse a raw event object into a structured ParsedEvent
 * 
 * @param event - Raw event object containing date/time properties
 * @param index - Position index of this event in a collection
 * @param startPropertyName - Name of the property containing start date/time
 * @param endPropertyName - Name of the property containing end date/time
 * @param updateHasTime - Whether to force time presence on timeless events
 * @param category - Optional category to assign to the event
 * @returns Parsed event with computed identifiers and metadata
 */
export function parseEvent<T extends EventInput>(
  event: T,
  index: number,
  startPropertyName: string,
  endPropertyName: string,
  updateHasTime?: boolean,
  category?: string
): ParsedEvent<T>;

/**
 * Check if an event occurs on a specific day
 * 
 * @param event - Parsed event to check
 * @param dayIdentifier - Day identifier to check (YYYYMMDD format)
 * @returns True if the event spans or occurs on the given day
 */
export function isEventOn(
  event: ParsedEvent,
  dayIdentifier: DayIdentifier
): boolean;

/**
 * Check if an event starts on a specific day or weekday
 * 
 * @param event - Parsed event to check
 * @param timestamp - Timestamp object with weekday information
 * @param dayIdentifier - Day identifier to check (YYYYMMDD format)
 * @param weekday - Weekday number (0-6) to match against
 * @returns True if event starts on the given day or matching weekday
 */
export function isEventStart(
  event: ParsedEvent,
  timestamp: CalendarTimestamp,
  dayIdentifier: DayIdentifier,
  weekday: number
): boolean;

/**
 * Check if an event overlaps with a given date range
 * 
 * @param event - Parsed event to check
 * @param rangeStart - Start day identifier of the range (YYYYMMDD format)
 * @param rangeEnd - End day identifier of the range (YYYYMMDD format)
 * @returns True if the event overlaps with the specified range
 */
export function isEventOverlapping(
  event: ParsedEvent,
  rangeStart: DayIdentifier,
  rangeEnd: DayIdentifier
): boolean;