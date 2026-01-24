/**
 * Calendar Base Mixin
 * Provides core functionality for calendar components including date parsing,
 * weekday handling, and formatting utilities.
 */

import { VueConstructor } from 'vue';

/**
 * Timestamp object representing a specific date/time
 */
export interface CalendarTimestamp {
  /** Full date string (YYYY-MM-DD) */
  date: string;
  /** Time string (HH:mm) */
  time: string;
  /** Year */
  year: number;
  /** Month (1-12) */
  month: number;
  /** Day of month */
  day: number;
  /** Hour (0-23) */
  hour: number;
  /** Minute (0-59) */
  minute: number;
  /** Day of week (0-6, Sunday=0) */
  weekday: number;
  /** Whether this is today */
  present: boolean;
  /** Whether this is in the past */
  past: boolean;
  /** Whether this is in the future */
  future: boolean;
}

/**
 * Day formatter function
 * @param timestamp - The timestamp to format
 * @param short - Whether to use short format
 * @returns Formatted date string
 */
export type DayFormatterFunction = (timestamp: CalendarTimestamp, short: boolean) => string;

/**
 * Weekday formatter function
 * @param timestamp - The timestamp to format
 * @param short - Whether to use short format
 * @returns Formatted weekday string
 */
export type WeekdayFormatterFunction = (timestamp: CalendarTimestamp, short: boolean) => string;

/**
 * Native locale formatter options callback
 */
export type LocaleFormatterCallback = (
  timestamp: CalendarTimestamp,
  short: boolean
) => Intl.DateTimeFormatOptions;

/**
 * Props for calendar base component
 */
export interface CalendarBaseProps {
  /** Starting date (YYYY-MM-DD) */
  start?: string;
  /** Ending date (YYYY-MM-DD) */
  end?: string;
  /** Weekdays to display (0-6 or comma-separated string) */
  weekdays?: number[] | string;
  /** Custom day format function */
  dayFormat?: DayFormatterFunction;
  /** Custom weekday format function */
  weekdayFormat?: WeekdayFormatterFunction;
  /** Locale string (e.g., 'en-US') */
  locale?: string;
}

/**
 * Computed properties for calendar base
 */
export interface CalendarBaseComputed {
  /** Parsed array of weekday numbers */
  parsedWeekdays: number[];
  /** Array indicating which weekdays to skip */
  weekdaySkips: number[];
  /** Reversed weekday skips array */
  weekdaySkipsReverse: number[];
  /** Parsed start timestamp */
  parsedStart: CalendarTimestamp;
  /** Parsed end timestamp */
  parsedEnd: CalendarTimestamp;
  /** List of day timestamps between start and end */
  days: CalendarTimestamp[];
  /** Day formatter function */
  dayFormatter: DayFormatterFunction;
  /** Weekday formatter function */
  weekdayFormatter: WeekdayFormatterFunction;
  /** Current locale string */
  currentLocale: string;
  /** Times object containing today's date */
  times: {
    today: CalendarTimestamp;
    [key: string]: unknown;
  };
}

/**
 * CSS classes for relative date states
 */
export interface RelativeDateClasses {
  /** Current date */
  'v-present': boolean;
  /** Past date */
  'v-past': boolean;
  /** Future date */
  'v-future': boolean;
  /** Outside current range */
  'v-outside': boolean;
}

/**
 * Methods for calendar base component
 */
export interface CalendarBaseMethods {
  /**
   * Get CSS classes for relative date position
   * @param timestamp - The timestamp to evaluate
   * @param isOutside - Whether the date is outside the current range
   * @returns Object with CSS class names as keys
   */
  getRelativeClasses(
    timestamp: CalendarTimestamp,
    isOutside?: boolean
  ): RelativeDateClasses;

  /**
   * Get the start of week for a given timestamp
   * @param timestamp - The timestamp to evaluate
   * @returns Timestamp representing start of week
   */
  getStartOfWeek(timestamp: CalendarTimestamp): CalendarTimestamp;

  /**
   * Get the end of week for a given timestamp
   * @param timestamp - The timestamp to evaluate
   * @returns Timestamp representing end of week
   */
  getEndOfWeek(timestamp: CalendarTimestamp): CalendarTimestamp;

  /**
   * Create a locale formatter with custom options
   * @param options - Intl.DateTimeFormatOptions to use
   * @returns Formatter function
   */
  getFormatter(options: Intl.DateTimeFormatOptions): DayFormatterFunction;
}

/**
 * Calendar Base Mixin
 * Combines colorable, localable, mouse, themeable, and times mixins
 * to provide comprehensive calendar functionality
 */
declare const CalendarBase: VueConstructor<
  Vue & CalendarBaseComputed & CalendarBaseMethods
>;

export default CalendarBase;