/**
 * Date Picker Locale Configuration Module
 * Provides localized strings and configuration for date picker components
 * @module DatePickerLocale
 */

/**
 * Locale configuration for date picker component
 */
export interface DatePickerLocale {
  /**
   * Language-specific date picker strings and format options
   */
  lang: DatePickerLangConfig;
  
  /**
   * Language-specific time picker configuration
   */
  timePickerLocale: TimePickerLocale;
}

/**
 * Language configuration for date picker strings
 */
export interface DatePickerLangConfig {
  /**
   * Placeholder text for single date selection
   * @example "Select date"
   */
  placeholder: string;
  
  /**
   * Placeholder text for year picker
   * @example "Select year"
   */
  yearPlaceholder: string;
  
  /**
   * Placeholder text for quarter picker
   * @example "Select quarter"
   */
  quarterPlaceholder: string;
  
  /**
   * Placeholder text for month picker
   * @example "Select month"
   */
  monthPlaceholder: string;
  
  /**
   * Placeholder text for week picker
   * @example "Select week"
   */
  weekPlaceholder: string;
  
  /**
   * Placeholder texts for date range selection [start, end]
   * @example ["Start date", "End date"]
   */
  rangePlaceholder: [string, string];
  
  /**
   * Placeholder texts for year range selection [start, end]
   * @example ["Start year", "End year"]
   */
  rangeYearPlaceholder: [string, string];
  
  /**
   * Placeholder texts for month range selection [start, end]
   * @example ["Start month", "End month"]
   */
  rangeMonthPlaceholder: [string, string];
  
  /**
   * Placeholder texts for week range selection [start, end]
   * @example ["Start week", "End week"]
   */
  rangeWeekPlaceholder: [string, string];
  
  /**
   * Additional locale-specific properties inherited from base locale
   */
  [key: string]: unknown;
}

/**
 * Time picker locale configuration
 */
export interface TimePickerLocale {
  /**
   * Placeholder text for time selection
   * @example "Select time"
   */
  placeholder?: string;
  
  /**
   * Placeholder text for range time selection
   * @example ["Start time", "End time"]
   */
  rangePlaceholder?: [string, string];
  
  /**
   * Additional time picker locale properties
   */
  [key: string]: unknown;
}

/**
 * Default date picker locale configuration
 * Combines date picker and time picker locale settings
 */
declare const defaultLocale: DatePickerLocale;

export default defaultLocale;