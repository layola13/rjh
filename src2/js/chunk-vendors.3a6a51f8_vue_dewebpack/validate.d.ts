/**
 * Validation utilities for VCalendar component props
 * @module VCalendar/util/props
 */

import type { VTimestampInput, VTimeInput } from './timestamp';
import type { CalendarEventOverlapMode } from '../modes';

/**
 * Validates if a value can be parsed as a finite number
 * @param value - The value to validate
 * @returns True if the value is a valid finite number
 */
export declare function validateNumber(value: string | number): boolean;

/**
 * Validates weekdays array or comma-separated string
 * Ensures:
 * - Contains 1-7 unique weekday numbers (0-6)
 * - No duplicates
 * - Values are in valid range [0, 6]
 * - At most one direction change (wrapping from 6 to 0)
 * 
 * @param value - Array of weekday numbers or comma-separated string
 * @returns True if weekdays configuration is valid
 */
export declare function validateWeekdays(value: number[] | string): boolean;

/**
 * Base calendar configuration props
 */
export interface BaseCalendarProps {
  /** Starting date for the calendar view */
  start: {
    type: [StringConstructor, NumberConstructor, DateConstructor];
    validate: (value: VTimestampInput) => boolean;
    default: () => string;
  };
  
  /** Ending date for the calendar view */
  end: {
    type: [StringConstructor, NumberConstructor, DateConstructor];
    validate: (value: VTimestampInput) => boolean;
  };
  
  /** Array of weekday numbers (0-6) to display, where 0 is Sunday */
  weekdays: {
    type: [ArrayConstructor, StringConstructor];
    default: () => [0, 1, 2, 3, 4, 5, 6];
    validate: typeof validateWeekdays;
  };
  
  /** Whether to hide the calendar header */
  hideHeader: {
    type: BooleanConstructor;
  };
  
  /** Whether to use abbreviated weekday names */
  shortWeekdays: {
    type: BooleanConstructor;
    default: true;
  };
  
  /** Custom formatter function for weekday labels */
  weekdayFormat: {
    type: FunctionConstructor;
    default: null;
  };
  
  /** Custom formatter function for day labels */
  dayFormat: {
    type: FunctionConstructor;
    default: null;
  };
}

/**
 * Interval-based calendar view props (day/week views with time slots)
 */
export interface IntervalCalendarProps {
  /** Maximum number of days to display */
  maxDays: {
    type: NumberConstructor;
    default: 7;
  };
  
  /** Whether to use short interval labels */
  shortIntervals: {
    type: BooleanConstructor;
    default: true;
  };
  
  /** Height in pixels for each time interval row */
  intervalHeight: {
    type: [NumberConstructor, StringConstructor];
    default: 48;
    validate: typeof validateNumber;
  };
  
  /** Width in pixels for the interval label column */
  intervalWidth: {
    type: [NumberConstructor, StringConstructor];
    default: 60;
    validate: typeof validateNumber;
  };
  
  /** Duration in minutes for each interval */
  intervalMinutes: {
    type: [NumberConstructor, StringConstructor];
    default: 60;
    validate: typeof validateNumber;
  };
  
  /** Index of the first interval to display (0-based) */
  firstInterval: {
    type: [NumberConstructor, StringConstructor];
    default: 0;
    validate: typeof validateNumber;
  };
  
  /** Time value for the first interval (alternative to firstInterval) */
  firstTime: {
    type: [NumberConstructor, StringConstructor, ObjectConstructor];
    validate: (value: VTimeInput) => boolean;
  };
  
  /** Total number of intervals to display */
  intervalCount: {
    type: [NumberConstructor, StringConstructor];
    default: 24;
    validate: typeof validateNumber;
  };
  
  /** Custom formatter function for interval labels */
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
 * Week-based calendar view props
 */
export interface WeekCalendarProps {
  /** First day of year for locale (0 = Sunday, 1 = Monday, etc.) */
  localeFirstDayOfYear: {
    type: [StringConstructor, NumberConstructor];
    default: 0;
  };
  
  /** Minimum number of weeks to display */
  minWeeks: {
    validate: typeof validateNumber;
    default: 1;
  };
  
  /** Whether to use abbreviated month names */
  shortMonths: {
    type: BooleanConstructor;
    default: true;
  };
  
  /** Whether to show month name on the first day of month */
  showMonthOnFirst: {
    type: BooleanConstructor;
    default: true;
  };
  
  /** Whether to show week numbers */
  showWeek: BooleanConstructor;
  
  /** Custom formatter function for month labels */
  monthFormat: {
    type: FunctionConstructor;
    default: null;
  };
}

/**
 * General calendar props
 */
export interface GeneralCalendarProps {
  /** Calendar view type (month, week, day, etc.) */
  type: {
    type: StringConstructor;
    default: 'month';
  };
  
  /** Currently selected date value */
  value: {
    type: [StringConstructor, NumberConstructor, DateConstructor];
    validate: (value: VTimestampInput) => boolean;
  };
}

/**
 * Category-based calendar props (for multi-resource/category views)
 */
export interface CategoryCalendarProps {
  /** Array of category names or comma-separated string */
  categories: {
    type: [ArrayConstructor, StringConstructor];
    default: '';
  };
  
  /** Whether to hide dynamically generated categories */
  categoryHideDynamic: {
    type: BooleanConstructor;
  };
  
  /** Whether to show all categories regardless of events */
  categoryShowAll: {
    type: BooleanConstructor;
  };
  
  /** Category name to use for events without a valid category */
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
 * Event-related calendar props
 */
export interface EventCalendarProps {
  /** Array of event objects to display */
  events: {
    type: ArrayConstructor;
    default: () => [];
  };
  
  /** Property name or getter function for event start time */
  eventStart: {
    type: StringConstructor;
    default: 'start';
  };
  
  /** Property name or getter function for event end time */
  eventEnd: {
    type: StringConstructor;
    default: 'end';
  };
  
  /** Property name or getter function to determine if event is timed */
  eventTimed: {
    type: [StringConstructor, FunctionConstructor];
    default: 'timed';
  };
  
  /** Property name or getter function for event category */
  eventCategory: {
    type: [StringConstructor, FunctionConstructor];
    default: 'category';
  };
  
  /** Height in pixels for all-day events */
  eventHeight: {
    type: NumberConstructor;
    default: 20;
  };
  
  /** Property name or function to determine event background color */
  eventColor: {
    type: [StringConstructor, FunctionConstructor];
    default: 'primary';
  };
  
  /** Property name or function to determine event text color */
  eventTextColor: {
    type: [StringConstructor, FunctionConstructor];
    default: 'white';
  };
  
  /** Property name or function to get event display name */
  eventName: {
    type: [StringConstructor, FunctionConstructor];
    default: 'name';
  };
  
  /** Threshold in minutes for considering events as overlapping */
  eventOverlapThreshold: {
    type: [StringConstructor, NumberConstructor];
    default: 60;
  };
  
  /** Strategy for handling overlapping events (stack, column, etc.) */
  eventOverlapMode: {
    type: [StringConstructor, FunctionConstructor];
    default: 'stack';
    validate: (value: CalendarEventOverlapMode | Function) => boolean;
  };
  
  /** Whether to show "+X more" indicator for overflow events */
  eventMore: {
    type: BooleanConstructor;
    default: true;
  };
  
  /** Text template for "more events" indicator (supports i18n key) */
  eventMoreText: {
    type: StringConstructor;
    default: '$vuetify.calendar.moreEvents';
  };
  
  /** Ripple effect configuration for event clicks */
  eventRipple: {
    type: [BooleanConstructor, ObjectConstructor];
    default: null;
  };
  
  /** Bottom margin in pixels between stacked events */
  eventMarginBottom: {
    type: NumberConstructor;
    default: 1;
  };
}

/**
 * Complete VCalendar props definition
 */
export interface VCalendarPropsDefinition {
  base: BaseCalendarProps;
  intervals: IntervalCalendarProps;
  weeks: WeekCalendarProps;
  calendar: GeneralCalendarProps;
  category: CategoryCalendarProps;
  events: EventCalendarProps;
}

/**
 * Default export: VCalendar component props configuration
 */
declare const propsDefinition: VCalendarPropsDefinition;

export default propsDefinition;