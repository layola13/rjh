/**
 * VDatePicker Component Type Definitions
 * A date picker component that supports multiple selection modes, date ranges, and various display types
 */

import Vue, { VNode, PropType } from 'vue';
import { VueConstructor } from 'vue/types/vue';

/**
 * Date picker type - determines the granularity of date selection
 */
export type DatePickerType = 'date' | 'month';

/**
 * Active picker view state
 */
export type ActivePicker = 'DATE' | 'MONTH' | 'YEAR';

/**
 * Event configuration - can be an array of dates, a function, or an object mapping dates to boolean
 */
export type DatePickerEvents = string[] | ((date: string) => boolean) | Record<string, boolean>;

/**
 * Event color configuration - can be a static color or dynamic based on date
 */
export type DatePickerEventColor = string | string[] | ((date: string) => string) | Record<string, string>;

/**
 * Date formatter function signature
 */
export type DateFormatter = (date: string) => string;

/**
 * Date validation function - returns true if the date is allowed
 */
export type AllowedDatesFunction = (date: string) => boolean;

/**
 * Multiple date formatter function signature
 */
export type MultipleDateFormatter = (dates: string[]) => string;

/**
 * VDatePicker component props interface
 */
export interface VDatePickerProps {
  /** Function to determine which dates are selectable */
  allowedDates?: AllowedDatesFunction;
  
  /** Custom formatter for day display */
  dayFormat?: DateFormatter;
  
  /** Disables the date picker */
  disabled?: boolean;
  
  /** Events to display on specific dates */
  events?: DatePickerEvents;
  
  /** Color(s) for event indicators */
  eventColor?: DatePickerEventColor;
  
  /** First day of the week (0 = Sunday, 1 = Monday, etc.) */
  firstDayOfWeek?: string | number;
  
  /** Custom formatter for the header date display */
  headerDateFormat?: DateFormatter;
  
  /** First day of the year for locale-specific calculations */
  localeFirstDayOfYear?: string | number;
  
  /** Maximum selectable date (ISO 8601 format) */
  max?: string;
  
  /** Minimum selectable date (ISO 8601 format) */
  min?: string;
  
  /** Custom formatter for month display */
  monthFormat?: DateFormatter;
  
  /** Allows selecting multiple dates */
  multiple?: boolean;
  
  /** Icon for next navigation button */
  nextIcon?: string;
  
  /** ARIA label for next month button */
  nextMonthAriaLabel?: string;
  
  /** ARIA label for next year button */
  nextYearAriaLabel?: string;
  
  /** Controls the currently displayed month/year (ISO 8601 format) */
  pickerDate?: string;
  
  /** Icon for previous navigation button */
  prevIcon?: string;
  
  /** ARIA label for previous month button */
  prevMonthAriaLabel?: string;
  
  /** ARIA label for previous year button */
  prevYearAriaLabel?: string;
  
  /** Enables date range selection mode */
  range?: boolean;
  
  /** Updates the model reactively as the user navigates */
  reactive?: boolean;
  
  /** Makes the picker read-only */
  readonly?: boolean;
  
  /** Enables scrollable month/year selection */
  scrollable?: boolean;
  
  /** Shows or hides the current date indicator, or sets a specific date as current */
  showCurrent?: boolean | string;
  
  /** Text template for displaying number of selected items */
  selectedItemsText?: string;
  
  /** Shows week numbers in date view */
  showWeek?: boolean;
  
  /** Custom formatter for title date display */
  titleDateFormat?: DateFormatter | MultipleDateFormatter;
  
  /** Picker type - 'date' for day selection, 'month' for month selection */
  type?: DatePickerType;
  
  /** Selected date value(s) - string for single selection, array for multiple */
  value?: string | string[];
  
  /** Custom formatter for weekday headers */
  weekdayFormat?: DateFormatter;
  
  /** Custom formatter for year display */
  yearFormat?: DateFormatter;
  
  /** Icon to display next to the year in the title */
  yearIcon?: string;
  
  /** Component color theme */
  color?: string;
  
  /** Applies dark theme */
  dark?: boolean;
  
  /** Applies light theme */
  light?: boolean;
  
  /** Locale string for date formatting */
  locale?: string;
  
  /** Displays picker in landscape orientation */
  landscape?: boolean;
}

/**
 * VDatePicker component data interface
 */
export interface VDatePickerData {
  /** Currently active picker view */
  activePicker: ActivePicker;
  
  /** Selected day (1-31) */
  inputDay: number | null;
  
  /** Selected month (0-11) */
  inputMonth: number | null;
  
  /** Selected year */
  inputYear: number | null;
  
  /** Whether the picker is animating in reverse */
  isReversing: boolean;
  
  /** Current date/time reference */
  now: Date;
  
  /** Currently displayed table date (ISO 8601 format) */
  tableDate: string;
}

/**
 * VDatePicker component computed properties interface
 */
export interface VDatePickerComputed {
  /** Value normalized as array */
  multipleValue: string[];
  
  /** Whether multiple selection is enabled */
  isMultiple: boolean;
  
  /** Last selected value */
  lastValue: string | undefined;
  
  /** Selected months (YYYY-MM format) */
  selectedMonths: string | string[];
  
  /** Current date to highlight */
  current: string | null;
  
  /** Full input date in ISO 8601 format */
  inputDate: string;
  
  /** Month displayed in the table (0-11) */
  tableMonth: number;
  
  /** Year displayed in the table */
  tableYear: number;
  
  /** Minimum selectable month */
  minMonth: string | null;
  
  /** Maximum selectable month */
  maxMonth: string | null;
  
  /** Minimum selectable year */
  minYear: string | null;
  
  /** Maximum selectable year */
  maxYear: string | null;
  
  /** Date formatter functions */
  formatters: {
    year: DateFormatter;
    titleDate: DateFormatter | MultipleDateFormatter;
  };
  
  /** Default formatter for multiple date titles */
  defaultTitleMultipleDateFormatter: MultipleDateFormatter;
  
  /** Default formatter for single date titles */
  defaultTitleDateFormatter: DateFormatter;
  
  /** Current locale from Vuetify */
  currentLocale: string;
}

/**
 * VDatePicker component methods interface
 */
export interface VDatePickerMethods {
  /**
   * Emits the input event with the new date value
   * @param date - The selected date in ISO 8601 format
   */
  emitInput(date: string): void;
  
  /**
   * Validates that the value prop matches the expected type
   */
  checkMultipleProp(): void;
  
  /**
   * Checks if a date is allowed based on min, max, and allowedDates
   * @param date - The date to validate
   */
  isDateAllowed(date: string): boolean;
  
  /**
   * Handles year selection
   * @param year - The selected year
   */
  yearClick(year: number): void;
  
  /**
   * Handles month selection
   * @param month - The selected month in YYYY-MM format
   */
  monthClick(month: string): void;
  
  /**
   * Handles date selection
   * @param date - The selected date in ISO 8601 format
   */
  dateClick(date: string): void;
  
  /**
   * Generates the picker title VNode
   */
  genPickerTitle(): VNode;
  
  /**
   * Generates the table header VNode
   */
  genTableHeader(): VNode;
  
  /**
   * Generates the date table VNode
   */
  genDateTable(): VNode;
  
  /**
   * Generates the month table VNode
   */
  genMonthTable(): VNode;
  
  /**
   * Generates the years list VNode
   */
  genYears(): VNode;
  
  /**
   * Generates the picker body VNode
   */
  genPickerBody(): VNode;
  
  /**
   * Sets the internal input date from the value prop
   */
  setInputDate(): void;
  
  /**
   * Renders the picker with the given class
   * @param className - CSS class to apply
   */
  genPicker(className: string): VNode;
}

/**
 * VDatePicker component interface
 */
export interface VDatePicker extends Vue, VDatePickerProps, VDatePickerData, VDatePickerComputed, VDatePickerMethods {
  /** Vuetify instance */
  $vuetify: {
    lang: {
      t(key: string, ...params: unknown[]): string;
    };
  };
}

/**
 * VDatePicker component constructor
 */
declare const VDatePicker: VueConstructor<VDatePicker>;

export default VDatePicker;