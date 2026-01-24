/**
 * VDatePicker Component Type Definitions
 * A comprehensive date picker component with support for date, month, and year selection
 */

import Vue, { VNode, PropType } from 'vue';
import { VuetifyLocale } from 'vuetify/types/services/lang';

/**
 * Date picker type options
 */
export type DatePickerType = 'date' | 'month' | 'year';

/**
 * Active picker state
 */
export type ActivePickerType = 'DATE' | 'MONTH' | 'YEAR';

/**
 * Event configuration types
 */
export type EventConfig = string[] | ((date: string) => boolean) | Record<string, boolean>;

/**
 * Event color configuration types
 */
export type EventColorConfig = string | string[] | ((date: string) => string) | Record<string, string>;

/**
 * Date formatter function type
 */
export type DateFormatter = (date: string) => string;

/**
 * Multiple date formatter function type
 */
export type MultipleDateFormatter = (dates: string[]) => string;

/**
 * Allowed dates validator function type
 */
export type AllowedDatesFunction = (date: string) => boolean;

/**
 * Formatters configuration object
 */
interface DatePickerFormatters {
  /** Year formatter function */
  year: DateFormatter;
  /** Title date formatter function */
  titleDate: DateFormatter | MultipleDateFormatter;
}

/**
 * VDatePicker component data state
 */
interface VDatePickerData {
  /** Currently active picker view */
  activePicker: ActivePickerType;
  /** Selected day input value */
  inputDay: number | null;
  /** Selected month input value (0-indexed) */
  inputMonth: number | null;
  /** Selected year input value */
  inputYear: number | null;
  /** Flag indicating if picker is transitioning in reverse */
  isReversing: boolean;
  /** Current date object */
  now: Date;
  /** Current table date string (format: YYYY-MM or YYYY) */
  tableDate: string;
}

/**
 * VDatePicker component computed properties
 */
interface VDatePickerComputed {
  /** Array of selected values (normalized from single or multiple values) */
  multipleValue: string[];
  /** Flag indicating if multiple selection mode is active */
  isMultiple: boolean;
  /** Last selected value in the selection */
  lastValue: string | undefined;
  /** Selected months (for month type picker) */
  selectedMonths: string | string[];
  /** Current date to highlight */
  current: string | null;
  /** Full input date string in ISO format */
  inputDate: string;
  /** Current table month (0-indexed) */
  tableMonth: number;
  /** Current table year */
  tableYear: number;
  /** Minimum allowed month string */
  minMonth: string | null;
  /** Maximum allowed month string */
  maxMonth: string | null;
  /** Minimum allowed year string */
  minYear: string | null;
  /** Maximum allowed year string */
  maxYear: string | null;
  /** Formatter functions configuration */
  formatters: DatePickerFormatters;
  /** Default title formatter for multiple dates */
  defaultTitleMultipleDateFormatter: MultipleDateFormatter;
  /** Default title formatter for single date */
  defaultTitleDateFormatter: DateFormatter;
}

/**
 * VDatePicker component methods
 */
interface VDatePickerMethods {
  /**
   * Emit input event with selected date(s)
   * @param date - Selected date string
   */
  emitInput(date: string): void;

  /**
   * Validate multiple prop configuration
   */
  checkMultipleProp(): void;

  /**
   * Check if a date is allowed based on min, max, and allowedDates
   * @param date - Date string to validate
   * @returns True if date is allowed
   */
  isDateAllowed(date: string): boolean;

  /**
   * Handle year selection click
   * @param year - Selected year
   */
  yearClick(year: number): void;

  /**
   * Handle month selection click
   * @param month - Selected month string (format: YYYY-MM)
   */
  monthClick(month: string): void;

  /**
   * Handle date selection click
   * @param date - Selected date string (format: YYYY-MM-DD)
   */
  dateClick(date: string): void;

  /**
   * Generate picker title component
   * @returns VNode for picker title
   */
  genPickerTitle(): VNode;

  /**
   * Generate table header component
   * @returns VNode for table header
   */
  genTableHeader(): VNode;

  /**
   * Generate date table component
   * @returns VNode for date table
   */
  genDateTable(): VNode;

  /**
   * Generate month table component
   * @returns VNode for month table
   */
  genMonthTable(): VNode;

  /**
   * Generate years list component
   * @returns VNode for years list
   */
  genYears(): VNode;

  /**
   * Generate picker body component
   * @returns VNode for picker body
   */
  genPickerBody(): VNode;

  /**
   * Initialize input date from value prop
   */
  setInputDate(): void;

  /**
   * Render the date picker component
   * @returns VNode for complete picker
   */
  render(): VNode;
}

/**
 * VDatePicker component props
 */
interface VDatePickerProps {
  /** Function to determine which dates are selectable */
  allowedDates?: AllowedDatesFunction;
  /** Custom day formatting function */
  dayFormat?: DateFormatter;
  /** Disable the picker */
  disabled?: boolean;
  /** Event dates or event configuration */
  events?: EventConfig;
  /** Color for event indicators */
  eventColor?: EventColorConfig;
  /** First day of week (0 = Sunday, 1 = Monday, etc.) */
  firstDayOfWeek?: string | number;
  /** Custom header date formatting function */
  headerDateFormat?: DateFormatter;
  /** First day of year for locale */
  localeFirstDayOfYear?: string | number;
  /** Maximum allowed date */
  max?: string;
  /** Minimum allowed date */
  min?: string;
  /** Custom month formatting function */
  monthFormat?: DateFormatter;
  /** Enable multiple date selection */
  multiple?: boolean;
  /** Next navigation icon */
  nextIcon?: string;
  /** Aria label for next month button */
  nextMonthAriaLabel?: string;
  /** Aria label for next year button */
  nextYearAriaLabel?: string;
  /** Controlled picker date (for current view) */
  pickerDate?: string;
  /** Previous navigation icon */
  prevIcon?: string;
  /** Aria label for previous month button */
  prevMonthAriaLabel?: string;
  /** Aria label for previous year button */
  prevYearAriaLabel?: string;
  /** Enable range selection mode */
  range?: boolean;
  /** Update model reactively on selection */
  reactive?: boolean;
  /** Set picker to readonly state */
  readonly?: boolean;
  /** Enable scrollable year/month selection */
  scrollable?: boolean;
  /** Show current date indicator */
  showCurrent?: boolean | string;
  /** Text for selected items count */
  selectedItemsText?: string;
  /** Show week numbers */
  showWeek?: boolean;
  /** Custom title date formatting function */
  titleDateFormat?: DateFormatter | MultipleDateFormatter;
  /** Picker type (date, month, or year) */
  type?: DatePickerType;
  /** Selected date value(s) */
  value?: string | string[];
  /** Custom weekday formatting function */
  weekdayFormat?: DateFormatter;
  /** Custom year formatting function */
  yearFormat?: DateFormatter;
  /** Icon for year selector button */
  yearIcon?: string;
  /** Apply dark theme */
  dark?: boolean;
  /** Apply light theme */
  light?: boolean;
  /** Component color */
  color?: string;
  /** Locale for date formatting */
  locale?: string;
  /** Landscape orientation */
  landscape?: boolean;
}

/**
 * VDatePicker component events
 */
interface VDatePickerEvents {
  /**
   * Emitted when date selection changes
   * @param value - Selected date(s)
   */
  input: string | string[];

  /**
   * Emitted when date selection is confirmed
   * @param value - Selected date(s)
   */
  change: string | string[];

  /**
   * Emitted when picker date (current view) changes
   * @param date - New picker date
   */
  'update:picker-date': string;

  /**
   * Emitted on date item click
   * @param date - Clicked date
   */
  'click:date': string;

  /**
   * Emitted on month item click
   * @param month - Clicked month
   */
  'click:month': string;

  /**
   * Emitted on year item click
   * @param year - Clicked year
   */
  'click:year': number;

  /**
   * Emitted on date item double-click
   * @param date - Double-clicked date
   */
  'dblclick:date': string;

  /**
   * Emitted on month item double-click
   * @param month - Double-clicked month
   */
  'dblclick:month': string;

  /**
   * Emitted on year item double-click
   * @param year - Double-clicked year
   */
  'dblclick:year': number;
}

/**
 * VDatePicker - Vuetify Date Picker Component
 * 
 * A feature-rich date picker component supporting single/multiple date selection,
 * date ranges, month selection, year selection, and extensive customization options.
 * 
 * @example
 *