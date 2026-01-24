/**
 * VCalendar Component Type Definitions
 * 
 * A versatile calendar component supporting multiple view types:
 * - month, week, day, 4day views
 * - custom-weekly, custom-daily views
 * - category-based view
 */

import { VueConstructor } from 'vue';
import { VNode, CreateElement } from 'vue';
import CalendarWithEvents from './mixins/calendar-with-events';

/**
 * Timestamp object representing a specific date/time
 */
export interface CalendarTimestamp {
  date: string;
  time: string;
  year: number;
  month: number;
  day: number;
  weekday: number;
  hour: number;
  minute: number;
  hasDay: boolean;
  hasTime: boolean;
  past: boolean;
  present: boolean;
  future: boolean;
}

/**
 * Calendar view type
 */
export type CalendarType = 
  | 'month' 
  | 'week' 
  | 'day' 
  | '4day' 
  | 'custom-weekly' 
  | 'custom-daily' 
  | 'category';

/**
 * Category item with index and event count
 */
export interface CategoryItem {
  index: number;
  count: number;
}

/**
 * Dictionary mapping category names to their metadata
 */
export interface CategoryMap {
  [categoryName: string]: CategoryItem;
}

/**
 * Props passed to the rendered calendar component
 */
export interface RenderProps {
  component: VueConstructor;
  start: CalendarTimestamp;
  end: CalendarTimestamp;
  maxDays: number;
  weekdays: number[];
  categories: string[];
}

/**
 * Date change event payload
 */
export interface DateChangeEvent {
  start: CalendarTimestamp;
  end: CalendarTimestamp;
}

/**
 * Date click event payload
 */
export interface DateClickEvent {
  date: string;
  [key: string]: unknown;
}

/**
 * Formatter options for date display
 */
export interface FormatterOptions {
  timeZone: string;
  month: 'long' | 'short' | 'narrow' | 'numeric' | '2-digit';
}

/**
 * Component data structure
 */
export interface VCalendarData {
  lastStart: CalendarTimestamp | null;
  lastEnd: CalendarTimestamp | null;
}

/**
 * VCalendar component definition
 * 
 * Main calendar component that renders different calendar views based on type.
 * Supports events, categories, and various navigation methods.
 */
declare const VCalendar: {
  name: 'v-calendar';
  
  /**
   * Component props merged from multiple prop definitions
   */
  props: {
    /** Current date value (Date, number timestamp, or string) */
    value?: Date | number | string | CalendarTimestamp;
    
    /** Calendar view type */
    type?: CalendarType;
    
    /** Maximum number of days to display */
    maxDays?: number;
    
    /** Array of weekday indices (0-6) to display */
    weekdays?: number[];
    
    /** Custom start date for custom views */
    start?: string | CalendarTimestamp;
    
    /** Custom end date for custom views */
    end?: string | CalendarTimestamp;
    
    /** Number of days to show in category view */
    categoryDays?: number | string;
    
    /** List of category names */
    categories?: string | string[];
    
    /** Hide categories with no events */
    categoryHideDynamic?: boolean;
    
    /** Show all categories regardless of events */
    categoryShowAll?: boolean;
    
    /** Default category for events without a category */
    categoryForInvalid?: string;
    
    /** Disable event rendering */
    noEvents?: boolean;
    
    [key: string]: unknown;
  };
  
  data(): VCalendarData;
  
  computed: {
    /**
     * Parsed and validated current date value
     */
    parsedValue(): CalendarTimestamp;
    
    /**
     * Number of days to display in category view
     */
    parsedCategoryDays(): number;
    
    /**
     * Properties needed to render the current calendar view
     */
    renderProps(): RenderProps;
    
    /**
     * Weekdays that should show events
     */
    eventWeekdays(): number[];
    
    /**
     * Whether calendar is in category mode
     */
    categoryMode(): boolean;
    
    /**
     * Formatted title for the current calendar view
     */
    title(): string;
    
    /**
     * Formatter for long month names
     */
    monthLongFormatter(): (timestamp: CalendarTimestamp, short: boolean) => string;
    
    /**
     * Formatter for short month names
     */
    monthShortFormatter(): (timestamp: CalendarTimestamp, short: boolean) => string;
    
    /**
     * Parsed array of category names
     */
    parsedCategories(): string[];
  };
  
  watch: {
    renderProps: 'checkChange';
  };
  
  mounted(): void;
  updated(): void;
  
  methods: {
    /**
     * Check if start/end dates have changed and emit change event
     */
    checkChange(): void;
    
    /**
     * Move the calendar view forward or backward
     * @param amount - Number of periods to move (positive = forward, negative = backward)
     */
    move(amount?: number): void;
    
    /**
     * Move to the next period
     * @param amount - Number of periods to move forward (default: 1)
     */
    next(amount?: number): void;
    
    /**
     * Move to the previous period
     * @param amount - Number of periods to move backward (default: 1)
     */
    prev(amount?: number): void;
    
    /**
     * Convert a time string to Y pixel position
     * @param time - Time string or timestamp
     * @param clamp - Whether to clamp the value within bounds
     * @returns Y position in pixels, or false if not supported
     */
    timeToY(time: string | CalendarTimestamp, clamp?: boolean): number | false;
    
    /**
     * Calculate time difference
     * @param time - Time value
     * @returns Time delta, or false if not supported
     */
    timeDelta(time: string | CalendarTimestamp): number | false;
    
    /**
     * Convert minutes to pixel height
     * @param minutes - Number of minutes
     * @returns Pixel height, or -1 if not supported
     */
    minutesToPixels(minutes: number): number;
    
    /**
     * Scroll the calendar to a specific time
     * @param time - Time to scroll to
     * @returns true if successful, false otherwise
     */
    scrollToTime(time: string | CalendarTimestamp): boolean;
    
    /**
     * Parse a timestamp value
     * @param timestamp - Raw timestamp value
     * @param required - Whether time is required
     * @returns Parsed timestamp object
     */
    parseTimestamp(timestamp: string | Date | number, required?: boolean): CalendarTimestamp;
    
    /**
     * Convert timestamp to Date object
     * @param timestamp - Timestamp to convert
     * @returns Date object
     */
    timestampToDate(timestamp: CalendarTimestamp): Date;
    
    /**
     * Get processed list of categories with metadata
     * @param categories - Array of category names
     * @returns Filtered and sorted category list
     */
    getCategoryList(categories: string[]): string[];
  };
  
  /**
   * Render function
   * @param createElement - Vue createElement function
   * @returns VNode representing the calendar
   */
  render(createElement: CreateElement): VNode;
};

export default VCalendar;