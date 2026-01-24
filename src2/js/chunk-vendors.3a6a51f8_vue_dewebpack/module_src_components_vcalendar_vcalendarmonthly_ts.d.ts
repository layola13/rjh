/**
 * Vue Calendar Monthly Component
 * Extends VCalendarWeekly to provide monthly calendar view functionality
 */

import VCalendarWeekly from './VCalendarWeekly';
import { VCalendarTimestamp } from './util/timestamp';

/**
 * Parsed timestamp result with start/end of month
 */
interface ParsedTimestamp extends VCalendarTimestamp {
  /** Year value */
  year: number;
  /** Month value (1-12) */
  month: number;
  /** Day of month */
  day: number;
  /** Hour (0-23) */
  hour: number;
  /** Minute (0-59) */
  minute: number;
  /** Weekday (0-6, Sunday = 0) */
  weekday: number;
  /** Whether this is the current date */
  hasDay: boolean;
  /** Whether this has time information */
  hasTime: boolean;
  /** ISO date string (YYYY-MM-DD) */
  date: string;
  /** ISO time string (HH:mm) */
  time: string;
}

/**
 * Computed properties for VCalendarMonthly component
 */
interface VCalendarMonthlyComputed {
  /**
   * Returns the static CSS class names for the monthly calendar
   * @returns Combined class string for monthly and weekly calendar styles
   */
  staticClass(): string;

  /**
   * Parses and returns the start timestamp adjusted to the beginning of the month
   * @returns Timestamp object representing the first day of the month
   */
  parsedStart(): ParsedTimestamp;

  /**
   * Parses and returns the end timestamp adjusted to the end of the month
   * @returns Timestamp object representing the last day of the month
   */
  parsedEnd(): ParsedTimestamp;
}

/**
 * Props for VCalendarMonthly component
 */
interface VCalendarMonthlyProps {
  /** Start date string (ISO format or timestamp) */
  start: string | number | Date;
  /** End date string (ISO format or timestamp) */
  end: string | number | Date;
}

/**
 * VCalendarMonthly Component
 * Displays a monthly calendar view by extending the weekly calendar functionality
 */
declare const VCalendarMonthly: {
  /** Component name identifier */
  name: 'v-calendar-monthly';
  /** Computed properties */
  computed: VCalendarMonthlyComputed;
} & typeof VCalendarWeekly;

export default VCalendarMonthly;

/**
 * Timestamp utility functions used by the component
 */
export declare namespace TimestampUtils {
  /**
   * Parses a timestamp input into a structured timestamp object
   * @param input - Date string, number, or Date object
   * @param required - Whether the timestamp is required (throws if invalid)
   * @returns Parsed timestamp object
   */
  function parseTimestamp(input: string | number | Date, required: boolean): ParsedTimestamp;

  /**
   * Gets the timestamp for the start of the month
   * @param timestamp - Input timestamp
   * @returns Timestamp adjusted to the first day of the month at 00:00:00
   */
  function getStartOfMonth(timestamp: ParsedTimestamp): ParsedTimestamp;

  /**
   * Gets the timestamp for the end of the month
   * @param timestamp - Input timestamp
   * @returns Timestamp adjusted to the last day of the month at 23:59:59
   */
  function getEndOfMonth(timestamp: ParsedTimestamp): ParsedTimestamp;
}