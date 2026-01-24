/**
 * Calendar mixin that provides interval-based time display functionality.
 * Handles time intervals, scrolling, and coordinate calculations for calendar views.
 */

import type { VueConstructor } from 'vue';
import type CalendarBase from './calendar-base';
import type { Timestamp, Time } from '../util/timestamp';

/**
 * Formatter function for interval time display
 * @param timestamp - The timestamp object to format
 * @param short - Whether to use short format
 * @returns Formatted time string
 */
export type IntervalFormatter = (timestamp: Timestamp, short: boolean) => string;

/**
 * Locale formatter configuration for time display
 */
export interface LocaleFormatterOptions {
  timeZone: string;
  hour?: 'numeric' | '2-digit';
  minute?: '2-digit';
}

/**
 * Enhanced timestamp with calendar utility methods
 */
export interface SlotScope extends Timestamp {
  /** Convert time value to Y-axis pixel position */
  timeToY: (time: Time, clamp?: boolean) => number | false;
  /** Calculate time delta as fraction of total interval range */
  timeDelta: (time: Time) => number | false;
  /** Convert minutes to pixel height */
  minutesToPixels: (minutes: number) => number;
  /** Array of day timestamps in current calendar view */
  week: Timestamp[];
}

/**
 * Props interface for calendar with intervals
 */
export interface CalendarWithIntervalsProps {
  /** First visible interval (hour) */
  firstInterval: string | number;
  /** Minutes per interval slot */
  intervalMinutes: string | number;
  /** Total number of intervals to display */
  intervalCount: string | number;
  /** Height of each interval in pixels */
  intervalHeight: string | number;
  /** Start time for the calendar (HH:mm format) */
  firstTime?: string | number;
  /** Custom formatter for interval labels */
  intervalFormat?: IntervalFormatter;
}

/**
 * Computed properties for calendar with intervals
 */
export interface CalendarWithIntervalsComputed {
  /** Parsed first interval as integer */
  parsedFirstInterval: number;
  /** Parsed interval minutes as integer */
  parsedIntervalMinutes: number;
  /** Parsed interval count as integer */
  parsedIntervalCount: number;
  /** Parsed interval height as float */
  parsedIntervalHeight: number;
  /** Parsed first time value */
  parsedFirstTime: number | false;
  /** First minute of the day to display */
  firstMinute: number;
  /** Total height of calendar body in pixels */
  bodyHeight: number;
  /** Array of day timestamps in current view */
  days: Timestamp[];
  /** 2D array of interval timestamps for each day */
  intervals: Timestamp[][];
  /** Formatter function for interval labels */
  intervalFormatter: IntervalFormatter;
}

/**
 * Methods for calendar with intervals
 */
export interface CalendarWithIntervalsMethods {
  /**
   * Default logic to determine if interval label should be shown
   * @param interval - The interval timestamp to check
   * @returns True if label should be displayed
   */
  showIntervalLabelDefault(interval: Timestamp): boolean;

  /**
   * Default style object for intervals
   * @param interval - The interval timestamp
   * @returns Style object (empty by default)
   */
  intervalStyleDefault(interval: Timestamp): Record<string, unknown>;

  /**
   * Get timestamp at mouse/touch event position
   * @param event - Mouse or touch event
   * @param day - Base day timestamp
   * @returns Timestamp at event position
   */
  getTimestampAtEvent(event: MouseEvent | TouchEvent, day: Timestamp): Timestamp;

  /**
   * Create slot scope object with utility methods
   * @param timestamp - Base timestamp
   * @returns Enhanced timestamp with utility methods
   */
  getSlotScope(timestamp: Timestamp): SlotScope;

  /**
   * Scroll calendar to specific time
   * @param time - Time value to scroll to
   * @returns True if scroll was successful
   */
  scrollToTime(time: Time): boolean;

  /**
   * Convert minutes to pixel height
   * @param minutes - Number of minutes
   * @returns Pixel height
   */
  minutesToPixels(minutes: number): number;

  /**
   * Convert time to Y-axis pixel position
   * @param time - Time value
   * @param clamp - Whether to clamp result to valid range (default: true)
   * @returns Y position in pixels, or false if invalid
   */
  timeToY(time: Time, clamp?: boolean): number | false;

  /**
   * Calculate time delta as fraction of total interval range
   * @param time - Time value
   * @returns Delta value between 0-1, or false if invalid
   */
  timeDelta(time: Time): number | false;
}

/**
 * Calendar mixin with interval-based time functionality
 * Extends CalendarBase with time interval calculations and rendering
 */
declare const CalendarWithIntervals: VueConstructor<
  Vue & CalendarWithIntervalsProps & CalendarWithIntervalsComputed & CalendarWithIntervalsMethods
>;

export default CalendarWithIntervals;