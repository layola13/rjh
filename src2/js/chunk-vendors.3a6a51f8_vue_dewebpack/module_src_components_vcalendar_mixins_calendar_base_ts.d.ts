/**
 * Module: calendar-base mixin
 * Calendar base component mixin providing core calendar functionality
 */

import { VNode } from 'vue';
import { PropType } from 'vue';

/**
 * Timestamp object representing a specific date and time
 */
export interface Timestamp {
  /** Full date string (YYYY-MM-DD) */
  date: string;
  /** Time string (HH:mm) */
  time: string;
  /** Year number */
  year: number;
  /** Month number (1-12) */
  month: number;
  /** Day of month */
  day: number;
  /** Hour (0-23) */
  hour: number;
  /** Minute (0-59) */
  minute: number;
  /** Day of week (0-6, Sunday=0) */
  weekday: number;
  /** Whether this is the current day */
  present: boolean;
  /** Whether this is before the current day */
  past: boolean;
  /** Whether this is after the current day */
  future: boolean;
}

/**
 * Day object with temporal state
 */
export interface CalendarDay extends Timestamp {
  /** Whether the day is in the current month */
  outside?: boolean;
}

/**
 * Formatter function for dates
 */
export type DateFormatter = (timestamp: Timestamp, short: boolean) => string;

/**
 * Formatter options for native locale formatting
 */
export interface FormatterOptions {
  /** IANA timezone identifier */
  timeZone?: string;
  /** Weekday format */
  weekday?: 'narrow' | 'short' | 'long';
  /** Day format */
  day?: 'numeric' | '2-digit';
  /** Month format */
  month?: 'numeric' | '2-digit' | 'narrow' | 'short' | 'long';
  /** Year format */
  year?: 'numeric' | '2-digit';
}

/**
 * Times object containing current time information
 */
export interface CalendarTimes {
  /** Current timestamp */
  today: Timestamp;
  /** Start time in minutes */
  start: number;
  /** End time in minutes */
  end: number;
}

/**
 * CSS classes for relative date states
 */
export interface RelativeClasses {
  /** Applied to current day */
  'v-present': boolean;
  /** Applied to past days */
  'v-past': boolean;
  /** Applied to future days */
  'v-future': boolean;
  /** Applied to days outside the current view */
  'v-outside': boolean;
}

/**
 * Calendar base mixin component definition
 * Provides core calendar functionality including date parsing, formatting, and weekday handling
 */
declare const CalendarBase: {
  name: 'calendar-base';
  
  directives: {
    Resize: any;
  };
  
  props: {
    /** Starting date (YYYY-MM-DD format or Timestamp) */
    start: {
      type: PropType<string | Timestamp>;
      required: false;
    };
    /** Ending date (YYYY-MM-DD format or Timestamp) */
    end: {
      type: PropType<string | Timestamp>;
      required: false;
    };
    /** Array of weekday numbers (0-6) or comma-separated string */
    weekdays: {
      type: PropType<number[] | string>;
      default: () => [0, 1, 2, 3, 4, 5, 6];
    };
    /** Custom day formatter function */
    dayFormat: {
      type: PropType<DateFormatter>;
      required: false;
    };
    /** Custom weekday formatter function */
    weekdayFormat: {
      type: PropType<DateFormatter>;
      required: false;
    };
  };
  
  computed: {
    /** Parsed array of weekday numbers to display */
    parsedWeekdays(): number[];
    
    /** Array indicating which weekdays to skip (1=skip, 0=show) */
    weekdaySkips(): number[];
    
    /** Reversed weekday skips array */
    weekdaySkipsReverse(): number[];
    
    /** Parsed start timestamp */
    parsedStart(): Timestamp;
    
    /** Parsed end timestamp (defaults to start if not provided or invalid) */
    parsedEnd(): Timestamp;
    
    /** Array of calendar days between start and end */
    days(): CalendarDay[];
    
    /** Formatter function for day display */
    dayFormatter(): DateFormatter;
    
    /** Formatter function for weekday display */
    weekdayFormatter(): DateFormatter;
  };
  
  methods: {
    /**
     * Get CSS classes for relative date states
     * @param timestamp - The timestamp to check
     * @param outside - Whether the day is outside the current view
     * @returns Object with CSS class names
     */
    getRelativeClasses(timestamp: Timestamp, outside?: boolean): RelativeClasses;
    
    /**
     * Get the start of the week for a given timestamp
     * @param timestamp - The timestamp to find the week start for
     * @returns Timestamp representing the first day of the week
     */
    getStartOfWeek(timestamp: Timestamp): Timestamp;
    
    /**
     * Get the end of the week for a given timestamp
     * @param timestamp - The timestamp to find the week end for
     * @returns Timestamp representing the last day of the week
     */
    getEndOfWeek(timestamp: Timestamp): Timestamp;
    
    /**
     * Create a formatter function with custom options
     * @param options - Intl.DateTimeFormat options
     * @returns Formatter function
     */
    getFormatter(options: FormatterOptions): DateFormatter;
  };
};

export default CalendarBase;