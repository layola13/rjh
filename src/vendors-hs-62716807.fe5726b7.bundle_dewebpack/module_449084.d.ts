/**
 * Date Picker Locale Configuration Module
 * 
 * This module provides internationalization (i18n) configuration for date picker components,
 * including placeholder text for various date selection modes and time picker locale settings.
 * 
 * @module DatePickerLocale
 */

/**
 * Date picker language configuration interface
 */
interface DatePickerLang {
  /** Placeholder text for single date selection */
  placeholder: string;
  
  /** Placeholder text for year selection */
  yearPlaceholder: string;
  
  /** Placeholder text for quarter selection */
  quarterPlaceholder: string;
  
  /** Placeholder text for month selection */
  monthPlaceholder: string;
  
  /** Placeholder text for week selection */
  weekPlaceholder: string;
  
  /** Placeholder text pair for date range selection [start, end] */
  rangePlaceholder: [string, string];
  
  /** Placeholder text pair for year range selection [start year, end year] */
  rangeYearPlaceholder: [string, string];
  
  /** Placeholder text pair for month range selection [start month, end month] */
  rangeMonthPlaceholder: [string, string];
  
  /** Placeholder text pair for week range selection [start week, end week] */
  rangeWeekPlaceholder: [string, string];
}

/**
 * Time picker locale configuration interface
 */
interface TimePickerLocale {
  /** Additional time picker specific locale settings */
  [key: string]: unknown;
}

/**
 * Complete date picker locale configuration
 */
interface DatePickerLocale {
  /** Language-specific text configurations for date picker */
  lang: DatePickerLang;
  
  /** Time picker locale settings */
  timePickerLocale: TimePickerLocale;
}

/**
 * Default date picker locale configuration with English placeholders
 * 
 * Combines base date picker language settings with time picker locale settings
 */
declare const datePickerLocale: DatePickerLocale;

export default datePickerLocale;