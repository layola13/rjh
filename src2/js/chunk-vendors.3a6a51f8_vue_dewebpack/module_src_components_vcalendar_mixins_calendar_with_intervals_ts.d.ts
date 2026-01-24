/**
 * Calendar with intervals mixin - Provides time-based interval functionality for calendar components
 * @module calendar-with-intervals
 */

import Vue, { VueConstructor } from 'vue';
import CalendarBase from './calendar-base';
import { VTimestamp, VTimestampInput, VTime } from '../types';

/**
 * Interval formatter function type
 * @param time - Timestamp to format
 * @param short - Whether to use short format
 * @returns Formatted time string
 */
export type IntervalFormatter = (time: VTimestamp, short: boolean) => string;

/**
 * Slot scope for calendar intervals
 */
export interface CalendarIntervalSlotScope extends VTimestamp {
  /** Convert time to Y coordinate */
  timeToY: (time: VTime, clamp?: boolean) => number | false;
  /** Calculate time delta as ratio */
  timeDelta: (time: VTime) => number | false;
  /** Convert minutes to pixel height */
  minutesToPixels: (minutes: number) => number;
  /** Array of days in the current view */
  week: VTimestamp[];
}

/**
 * Props interface for calendar with intervals
 */
export interface CalendarWithIntervalsProps {
  /** First interval to display (hour) */
  firstInterval: number | string;
  /** Minutes per interval */
  intervalMinutes: number | string;
  /** Number of intervals to display */
  intervalCount: number | string;
  /** Height of each interval in pixels */
  intervalHeight: number | string;
  /** First time to display (HH:mm format) */
  firstTime?: string;
  /** Custom interval formatter function */
  intervalFormat?: IntervalFormatter;
}

/**
 * Computed properties interface
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
  /** Parsed first time in minutes */
  parsedFirstTime: number | false;
  /** First minute to display */
  firstMinute: number;
  /** Total body height in pixels */
  bodyHeight: number;
  /** Array of day timestamps */
  days: VTimestamp[];
  /** 2D array of intervals for each day */
  intervals: VTimestamp[][];
  /** Interval formatter function */
  intervalFormatter: IntervalFormatter;
}

/**
 * Methods interface
 */
export interface CalendarWithIntervalsMethods {
  /**
   * Default logic for showing interval labels
   * @param interval - Interval timestamp to check
   * @returns Whether to show the label
   */
  showIntervalLabelDefault(interval: VTimestamp): boolean;

  /**
   * Default styling for intervals
   * @param interval - Interval timestamp
   * @returns Style object or undefined
   */
  intervalStyleDefault(interval: VTimestamp): Record<string, any> | undefined;

  /**
   * Get timestamp at mouse/touch event position
   * @param event - Mouse or touch event
   * @param day - Day timestamp
   * @returns Timestamp at event position
   */
  getTimestampAtEvent(event: MouseEvent | TouchEvent, day: VTimestamp): VTimestamp;

  /**
   * Get slot scope data for interval
   * @param timestamp - Base timestamp
   * @returns Slot scope with helper methods
   */
  getSlotScope(timestamp: VTimestamp): CalendarIntervalSlotScope;

  /**
   * Scroll to specific time
   * @param time - Time to scroll to (HH:mm format or minutes)
   * @returns Whether scroll was successful
   */
  scrollToTime(time: VTime): boolean;

  /**
   * Convert minutes to pixel height
   * @param minutes - Number of minutes
   * @returns Pixel height
   */
  minutesToPixels(minutes: number): number;

  /**
   * Convert time to Y coordinate
   * @param time - Time in HH:mm format or minutes
   * @param clamp - Whether to clamp value to body height
   * @returns Y coordinate in pixels, or false if invalid
   */
  timeToY(time: VTime, clamp?: boolean): number | false;

  /**
   * Calculate time delta as ratio of total time range
   * @param time - Time in HH:mm format or minutes
   * @returns Ratio (0-1) or false if invalid
   */
  timeDelta(time: VTime): number | false;
}

/**
 * Calendar with intervals mixin component
 * Extends CalendarBase with time interval functionality
 */
export interface CalendarWithIntervals extends Vue,
  CalendarWithIntervalsProps,
  CalendarWithIntervalsComputed,
  CalendarWithIntervalsMethods {
  /** Reference to scroll area element */
  $refs: {
    scrollArea?: HTMLElement;
  };
}

declare const CalendarWithIntervals: VueConstructor<CalendarWithIntervals>;

export default CalendarWithIntervals;