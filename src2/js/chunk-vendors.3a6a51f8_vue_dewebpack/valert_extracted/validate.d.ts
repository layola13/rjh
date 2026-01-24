/**
 * VCalendar component prop validation utilities and default configurations
 * Provides type-safe prop definitions for calendar, intervals, weeks, categories, and events
 */

import type { PropValidator } from 'vue';

/**
 * Validates if a value can be parsed as a finite number
 * @param value - Value to validate (typically string or number)
 * @returns True if the value is a valid finite number
 */
export declare function validateNumber(value: string | number): boolean;

/**
 * Validates weekday configuration
 * Accepts array of weekday indices (0-6) or comma-separated string
 * Ensures no duplicates, valid range, and proper ordering
 * @param value - Array of numbers or comma-separated string of weekday indices
 * @returns True if weekdays configuration is valid
 */
export declare function validateWeekdays(value: number[] | string): boolean;

/**
 * Calendar event overlap display modes
 */
export declare enum CalendarEventOverlapMode {
  Stack = 'stack',
  Column = 'column',
}

/**
 * Timestamp-like value that can be a date string, Unix timestamp, or Date object
 */
export type TimestampInput = string | number | Date;

/**
 * Time value representation (number, string, or structured object)
 */
export type TimeInput = number | string | object;

/**
 * Function type for event property extraction
 */
export type EventPropertyExtractor<T = any> = string | ((event: any) => T);

/**
 * Base calendar prop definitions
 * Common properties shared across all calendar view modes
 */
export interface BaseCalendarProps {
  /** Starting date for the calendar view */
  start: {
    type: [StringConstructor, NumberConstructor, DateConstructor];
    validate: (value: TimestampInput) => boolean;
    default: () => string;
  };
  
  /** Ending date for the calendar view (optional) */
  end: {
    type: [StringConstructor, NumberConstructor, DateConstructor];
    validate: (value: TimestampInput) => boolean;
  };
  
  /** Days of week to display (0=Sunday, 6=Saturday) */
  weekdays: {
    type: [ArrayConstructor, StringConstructor];
    default: () => [0, 1, 2, 3, 4, 5, 6];
    validate: typeof validateWeekdays;
  };
  
  /** Hide the calendar header */
  hideHeader: {
    type: BooleanConstructor;
  };
  
  /** Use abbreviated weekday names */
  shortWeekdays: {
    type: BooleanConstructor;
    default: true;
  };
  
  /** Custom formatter for weekday labels */
  weekdayFormat: {
    type: FunctionConstructor;
    default: null;
  };
  
  /** Custom formatter for day labels */
  dayFormat: {
    type: FunctionConstructor;
    default: null;
  };
}

/**
 * Interval-based view prop definitions
 * Used for day/week views with time intervals
 */
export interface IntervalCalendarProps {
  /** Maximum number of days to display */
  maxDays: {
    type: NumberConstructor;
    default: 7;
  };
  
  /** Use short interval labels */
  shortIntervals: {
    type: BooleanConstructor;
    default: true;
  };
  
  /** Height of each interval row in pixels */
  intervalHeight: {
    type: [NumberConstructor, StringConstructor];
    default: 48;
    validate: typeof validateNumber;
  };
  
  /** Width of interval label column in pixels */
  intervalWidth: {
    type: [NumberConstructor, StringConstructor];
    default: 60;
    validate: typeof validateNumber;
  };
  
  /** Duration of each interval in minutes */
  intervalMinutes: {
    type: [NumberConstructor, StringConstructor];
    default: 60;
    validate: typeof validateNumber;
  };
  
  /** Index of the first interval to display */
  firstInterval: {
    type: [NumberConstructor, StringConstructor];
    default: 0;
    validate: typeof validateNumber;
  };
  
  /** Start time for intervals (timestamp object) */
  firstTime: {
    type: [NumberConstructor, StringConstructor, ObjectConstructor];
    validate: (value: TimeInput) => boolean;
  };
  
  /** Total number of intervals to display */
  intervalCount: {
    type: [NumberConstructor, StringConstructor];
    default: 24;
    validate: typeof validateNumber;
  };
  
  /** Custom formatter for interval labels */
  intervalFormat: {
    type: FunctionConstructor;
    default: null;
  };
  
  /** Custom style function for intervals */
  intervalStyle: {
    type: FunctionConstructor;
    default: null;
  };
  
  /** Function to determine if interval label should be shown */
  showIntervalLabel: {
    type: FunctionConstructor;
    default: null;
  };
}

/**
 * Week-based view prop definitions
 * Used for month views and week number displays
 */
export interface WeekCalendarProps {
  /** First day of year for locale (ISO 8601) */
  localeFirstDayOfYear: {
    type: [StringConstructor, NumberConstructor];
    default: 0;
  };
  
  /** Minimum number of weeks to display */
  minWeeks: {
    validate: typeof validateNumber;
    default: 1;
  };
  
  /** Use abbreviated month names */
  shortMonths: {
    type: BooleanConstructor;
    default: true;
  };
  
  /** Show month label on first day of month */
  showMonthOnFirst: {
    type: BooleanConstructor;
    default: true;
  };
  
  /** Display week numbers */
  showWeek: BooleanConstructor;
  
  /** Custom formatter for month labels */
  monthFormat: {
    type: FunctionConstructor;
    default: null;
  };
}

/**
 * Core calendar type and value props
 */
export interface CalendarTypeProps {
  /** Calendar view type (month, week, day, etc.) */
  type: {
    type: StringConstructor;
    default: 'month';
  };
  
  /** Currently selected date value */
  value: {
    type: [StringConstructor, NumberConstructor, DateConstructor];
    validate: (value: TimestampInput) => boolean;
  };
}

/**
 * Category-based grouping prop definitions
 * Enables categorized event display
 */
export interface CategoryCalendarProps {
  /** List of category identifiers */
  categories: {
    type: [ArrayConstructor, StringConstructor];
    default: '';
  };
  
  /** Hide dynamically created categories */
  categoryHideDynamic: {
    type: BooleanConstructor;
  };
  
  /** Show all categories regardless of events */
  categoryShowAll: {
    type: BooleanConstructor;
  };
  
  /** Category name for invalid/uncategorized events */
  categoryForInvalid: {
    type: StringConstructor;
    default: '';
  };
  
  /** Number of days to display per category */
  categoryDays: {
    type: [NumberConstructor, StringConstructor];
    default: 1;
    validate: (value: string | number) => boolean;
  };
}

/**
 * Event rendering and behavior prop definitions
 */
export interface EventCalendarProps {
  /** Array of event objects to display */
  events: {
    type: ArrayConstructor;
    default: () => any[];
  };
  
  /** Property name or extractor for event start time */
  eventStart: {
    type: StringConstructor;
    default: 'start';
  };
  
  /** Property name or extractor for event end time */
  eventEnd: {
    type: StringConstructor;
    default: 'end';
  };
  
  /** Property or function to determine if event is timed */
  eventTimed: {
    type: [StringConstructor, FunctionConstructor];
    default: 'timed';
  };
  
  /** Property or function to get event category */
  eventCategory: {
    type: [StringConstructor, FunctionConstructor];
    default: 'category';
  };
  
  /** Height of event elements in pixels */
  eventHeight: {
    type: NumberConstructor;
    default: 20;
  };
  
  /** Background color property or function for events */
  eventColor: {
    type: [StringConstructor, FunctionConstructor];
    default: 'primary';
  };
  
  /** Text color property or function for events */
  eventTextColor: {
    type: [StringConstructor, FunctionConstructor];
    default: 'white';
  };
  
  /** Property or function to get event display name */
  eventName: {
    type: [StringConstructor, FunctionConstructor];
    default: 'name';
  };
  
  /** Overlap threshold in minutes for event collision detection */
  eventOverlapThreshold: {
    type: [StringConstructor, NumberConstructor];
    default: 60;
  };
  
  /** Strategy for displaying overlapping events */
  eventOverlapMode: {
    type: [StringConstructor, FunctionConstructor];
    default: 'stack';
    validate: (value: string | Function) => boolean;
  };
  
  /** Show "X more events" indicator */
  eventMore: {
    type: BooleanConstructor;
    default: true;
  };
  
  /** Text template for "more events" indicator */
  eventMoreText: {
    type: StringConstructor;
    default: '$vuetify.calendar.moreEvents';
  };
  
  /** Enable ripple effect on event click */
  eventRipple: {
    type: [BooleanConstructor, ObjectConstructor];
    default: null;
  };
  
  /** Bottom margin between stacked events in pixels */
  eventMarginBottom: {
    type: NumberConstructor;
    default: 1;
  };
}

/**
 * Complete VCalendar prop configuration object
 * Organized by feature category
 */
declare const VCalendarProps: {
  base: BaseCalendarProps;
  intervals: IntervalCalendarProps;
  weeks: WeekCalendarProps;
  calendar: CalendarTypeProps;
  category: CategoryCalendarProps;
  events: EventCalendarProps;
};

export default VCalendarProps;