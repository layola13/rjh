/**
 * VDatePickerMonthTable Component Type Definitions
 * A month picker table component for date selection
 */

import Vue from 'vue';
import { VNode } from 'vue/types/umd';

/**
 * Formatter function type for month display
 * @param date - ISO date string to format
 * @returns Formatted month string
 */
type MonthFormatter = (date: string) => string;

/**
 * Native locale formatter options for month display
 */
interface NativeLocaleFormatterOptions {
  /** Month display format */
  month: 'numeric' | '2-digit' | 'narrow' | 'short' | 'long';
  /** Timezone for date formatting */
  timeZone: string;
}

/**
 * Formatter substring extraction options
 */
interface FormatterSubstringOptions {
  /** Starting position in formatted string */
  start: number;
  /** Length of substring to extract */
  length: number;
}

/**
 * VDatePickerMonthTable Component
 * Displays a table of months for date picker selection
 */
export default interface VDatePickerMonthTable extends Vue {
  /** Component name identifier */
  readonly name: 'v-date-picker-month-table';

  // Props (inherited from date-picker-table mixin)
  
  /** Custom format function for month display */
  format?: MonthFormatter;
  
  /** Current locale for internationalization */
  currentLocale: string;
  
  /** Currently displayed table date (year) */
  tableDate: string;
  
  /** Currently displayed year */
  displayedYear: number;

  // Computed Properties
  
  /**
   * Month formatter function
   * Returns custom format or creates native locale formatter
   */
  readonly formatter: MonthFormatter;

  // Methods
  
  /**
   * Calculate new table date based on offset
   * @param offset - Number of years to offset (positive or negative)
   * @returns New year as string
   */
  calculateTableDate(offset: number): string;

  /**
   * Generate table body with month cells
   * Creates 3 rows × 4 columns grid of months (12 total)
   * @returns VNode representing tbody element
   */
  genTBody(): VNode;

  /**
   * Generate button for month selection
   * @param value - ISO date string for the month
   * @param isFloating - Whether button is floating
   * @param mouseEventType - Type of mouse event to handle
   * @param formatter - Function to format button text
   * @returns VNode representing button element
   */
  genButton(
    value: string,
    isFloating: boolean,
    mouseEventType: 'month' | 'date' | 'year',
    formatter: MonthFormatter
  ): VNode;

  /**
   * Generate complete table element
   * @param className - CSS class names for table
   * @param children - Child VNodes (tbody, etc.)
   * @param tableDate - Function to calculate table navigation
   * @returns VNode representing complete table
   */
  genTable(
    className: string,
    children: VNode[],
    tableDate: (offset: number) => string
  ): VNode;

  /**
   * Render function for component
   * @returns VNode representing the complete month picker table
   */
  render(): VNode;
}

/**
 * Utility function to create native locale formatter
 * @param locale - Locale identifier (e.g., 'en-US')
 * @param options - Intl.DateTimeFormat options
 * @param substringOptions - Options for extracting substring from formatted result
 * @returns Formatter function
 */
export function createNativeLocaleFormatter(
  locale: string,
  options: NativeLocaleFormatterOptions,
  substringOptions: FormatterSubstringOptions
): MonthFormatter;

/**
 * Utility function to pad numbers with leading zeros
 * @param value - Number to pad
 * @param length - Desired string length (default: 2)
 * @returns Zero-padded string
 */
export function pad(value: number, length?: number): string;