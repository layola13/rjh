/**
 * Date picker table mixin for Vuetify VDatePicker component
 * Provides common functionality for date, month, and year picker tables
 */

import Vue, { VNode, PropType } from 'vue';
import { DirectiveOptions } from 'vue/types/options';

/**
 * Event color value type - can be a single color or array of colors
 */
type EventColorValue = string | string[] | boolean;

/**
 * Events prop type - supports multiple formats for defining date events
 */
type EventsProp = string[] | ((date: string) => boolean) | Record<string, EventColorValue>;

/**
 * Event color prop type - supports static or dynamic event coloring
 */
type EventColorProp = string | string[] | ((date: string) => EventColorValue) | Record<string, EventColorValue>;

/**
 * Touch event data from touch directive
 */
interface TouchEvent {
  offsetX: number;
  offsetY: number;
}

/**
 * Wheel event handler function type
 */
type WheelHandler = (event: WheelEvent, callback: (delta: number) => string) => void;

/**
 * Date formatter function type
 */
type DateFormatter = (date: string) => string;

/**
 * Date allowed checker function type
 */
type AllowedDatesFunction = (date: string) => boolean;

/**
 * Table date update callback function type
 */
type TableDateCallback = (delta: number) => string;

declare const DatePickerTableMixin: Vue & {
  // Directives
  directives: {
    Touch: DirectiveOptions;
  };

  // Props
  /**
   * Function to determine which dates are selectable
   */
  allowedDates?: AllowedDatesFunction;

  /**
   * Current date value (typically today's date)
   */
  current?: string;

  /**
   * Disables interaction with the picker
   */
  disabled: boolean;

  /**
   * Formatting function for date display
   */
  format?: DateFormatter;

  /**
   * Dates that have events (array of dates, function, or object mapping)
   */
  events: EventsProp;

  /**
   * Color(s) to use for event indicators
   * @default 'warning'
   */
  eventColor: EventColorProp;

  /**
   * Minimum selectable date (ISO 8601 format)
   */
  min?: string;

  /**
   * Maximum selectable date (ISO 8601 format)
   */
  max?: string;

  /**
   * Enables range selection mode
   */
  range: boolean;

  /**
   * Makes the picker read-only (view only, no selection)
   */
  readonly: boolean;

  /**
   * Enables mouse wheel scrolling to change months/years
   */
  scrollable: boolean;

  /**
   * Currently displayed table date (YYYY-MM format)
   */
  tableDate: string;

  /**
   * Selected date value(s) - single date string or array for range/multiple
   */
  value: string | string[];

  // Data
  /**
   * Tracks direction of table transition (for animation)
   */
  isReversing: boolean;

  /**
   * Throttled wheel event handler
   */
  wheelThrottle: WheelHandler | null;

  // Computed
  /**
   * Determines transition direction based on RTL and navigation direction
   */
  readonly computedTransition: 'tab-transition' | 'tab-reverse-transition';

  /**
   * Extracts month (0-11) from tableDate
   */
  readonly displayedMonth: number;

  /**
   * Extracts year from tableDate
   */
  readonly displayedYear: number;

  // Methods
  /**
   * Generates CSS classes for date button
   * @param isAllowed - Whether the date is selectable
   * @param useEvents - Whether to show event indicators
   * @param isSelected - Whether the date is currently selected
   * @param isCurrent - Whether the date is today
   * @returns Object containing CSS class names
   */
  genButtonClasses(
    isAllowed: boolean,
    useEvents: boolean,
    isSelected: boolean,
    isCurrent: boolean
  ): Record<string, boolean>;

  /**
   * Generates event listeners for date button
   * @param date - The date string
   * @param isAllowed - Whether the date is selectable
   * @param type - Type identifier for the picker (day/month/year)
   * @returns Event listener object
   */
  genButtonEvents(
    date: string,
    isAllowed: boolean,
    type: string
  ): Record<string, Function> | undefined;

  /**
   * Generates a date button VNode
   * @param date - The date string
   * @param useEvents - Whether to show event indicators
   * @param type - Type identifier for the picker
   * @param formatter - Function to format the button content
   * @returns VNode for the button
   */
  genButton(
    date: string,
    useEvents: boolean,
    type: string,
    formatter: (date: string) => VNode | string
  ): VNode;

  /**
   * Gets array of event colors for a specific date
   * @param date - The date string
   * @returns Array of color strings
   */
  getEventColors(date: string): string[];

  /**
   * Generates event indicator VNode for a date
   * @param date - The date string
   * @returns VNode for event indicators or null
   */
  genEvents(date: string): VNode | null;

  /**
   * Handles mouse wheel events for scrolling
   * @param event - The wheel event
   * @param callback - Function to calculate new table date
   */
  wheel(event: WheelEvent, callback: TableDateCallback): void;

  /**
   * Handles touch/swipe events for navigation
   * @param direction - Direction multiplier (1 or -1)
   * @param callback - Function to calculate new table date
   */
  touch(direction: number, callback: TableDateCallback): void;

  /**
   * Generates the table wrapper VNode with transitions and directives
   * @param className - CSS class for the table wrapper
   * @param content - Table content VNodes
   * @param callback - Function to calculate new table date
   * @returns VNode for the table wrapper
   */
  genTable(
    className: string,
    content: VNode[],
    callback: TableDateCallback
  ): VNode;

  /**
   * Checks if a date is currently selected
   * Handles single selection, multiple selection, and range selection
   * @param date - The date string to check
   * @returns True if the date is selected
   */
  isSelected(date: string): boolean;
};

export default DatePickerTableMixin;