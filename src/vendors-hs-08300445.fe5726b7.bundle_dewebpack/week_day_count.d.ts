/**
 * Week day count constant and date utility functions
 * @module DateUtils
 */

/**
 * Number of days in a week
 */
export const WEEK_DAY_COUNT = 7;

/**
 * Picker mode types
 */
export type PickerMode = 'date' | 'week' | 'month' | 'quarter' | 'year' | 'decade';

/**
 * Generic date type parameter
 */
export type DateType = any;

/**
 * Date generation and manipulation interface
 */
export interface GenerateConfig<T = DateType> {
  /**
   * Get the year from a date
   */
  getYear(date: T): number;
  
  /**
   * Get the month from a date (0-11)
   */
  getMonth(date: T): number;
  
  /**
   * Get the day of month from a date
   */
  getDate(date: T): number;
  
  /**
   * Get the hour from a date
   */
  getHour(date: T): number;
  
  /**
   * Get the minute from a date
   */
  getMinute(date: T): number;
  
  /**
   * Get the second from a date
   */
  getSecond(date: T): number;
  
  /**
   * Get the day of week from a date
   */
  getWeekDay(date: T): number;
  
  /**
   * Get the end date of a month
   */
  getEndDate(date: T): T;
  
  /**
   * Set the year of a date
   */
  setYear(date: T, year: number): T;
  
  /**
   * Set the month of a date
   */
  setMonth(date: T, month: number): T;
  
  /**
   * Set the day of a date
   */
  setDate(date: T, day: number): T;
  
  /**
   * Add years to a date
   */
  addYear(date: T, years: number): T;
  
  /**
   * Add months to a date
   */
  addMonth(date: T, months: number): T;
  
  /**
   * Add days to a date
   */
  addDate(date: T, days: number): T;
  
  /**
   * Locale-specific operations
   */
  locale: {
    /**
     * Format a date according to locale
     */
    format(locale: string, date: T, format: string): string;
    
    /**
     * Parse a string to date according to locale
     */
    parse(locale: string, text: string, formats: string[]): T | null;
    
    /**
     * Get week number for a date
     */
    getWeek(locale: string, date: T): number;
    
    /**
     * Get the first day of week (0-6, where 0 is Sunday)
     */
    getWeekFirstDay(locale: string): number;
  };
  
  /**
   * Check if date is after another date
   */
  isAfter(date1: T, date2: T): boolean;
}

/**
 * Locale configuration interface
 */
export interface Locale {
  /**
   * Locale identifier (e.g., 'en-US', 'zh-CN')
   */
  locale: string;
  
  /**
   * Number of years in a decade unit
   */
  DECADE_UNIT_DIFF: number;
  
  /**
   * Get the first day of week
   */
  getWeekFirstDay(locale: string): number;
}

/**
 * Format value configuration
 */
export interface FormatValueConfig<T = DateType> {
  /**
   * Date generation config
   */
  generateConfig: GenerateConfig<T>;
  
  /**
   * Locale configuration
   */
  locale: Locale;
  
  /**
   * Format string or custom formatter function
   */
  format: string | ((date: T) => string);
}

/**
 * Parse value configuration
 */
export interface ParseValueConfig<T = DateType> {
  /**
   * Date generation config
   */
  generateConfig: GenerateConfig<T>;
  
  /**
   * Locale configuration
   */
  locale: Locale;
  
  /**
   * List of format strings or custom parser functions
   */
  formatList: (string | ((value: string) => T | null))[];
}

/**
 * Cell date disabled check configuration
 */
export interface CellDateDisabledConfig<T = DateType> {
  /**
   * The date of the cell to check
   */
  cellDate: T;
  
  /**
   * Picker mode
   */
  mode: PickerMode;
  
  /**
   * Function to check if a date is disabled
   */
  disabledDate?: (date: T) => boolean;
  
  /**
   * Date generation config
   */
  generateConfig: GenerateConfig<T>;
}

/**
 * Format a date value according to configuration
 * @param date - The date to format
 * @param config - Format configuration
 * @returns Formatted date string
 */
export function formatValue<T = DateType>(date: T, config: FormatValueConfig<T>): string;

/**
 * Parse a string value to date according to configuration
 * @param value - The string value to parse
 * @param config - Parse configuration
 * @returns Parsed date or null if parsing fails
 */
export function parseValue<T = DateType>(value: string, config: ParseValueConfig<T>): T | null;

/**
 * Check if a cell date is disabled based on mode and disabled date function
 * @param config - Cell date disabled check configuration
 * @returns True if the cell date is disabled
 */
export function getCellDateDisabled<T = DateType>(config: CellDateDisabledConfig<T>): boolean;

/**
 * Get the closing view date based on current date, mode and offset
 * @param date - Current date
 * @param mode - Picker mode
 * @param generateConfig - Date generation config
 * @param offset - Number of units to offset (default: 1)
 * @returns The closing view date
 */
export function getClosingViewDate<T = DateType>(
  date: T,
  mode: PickerMode,
  generateConfig: GenerateConfig<T>,
  offset?: number
): T;

/**
 * Get the quarter number (1-4) for a date
 * @param generateConfig - Date generation config
 * @param date - The date to get quarter from
 * @returns Quarter number (1-4)
 */
export function getQuarter<T = DateType>(generateConfig: GenerateConfig<T>, date: T): number;

/**
 * Get the start date of the week for a given date
 * @param locale - Locale string
 * @param generateConfig - Date generation config
 * @param date - The date to get week start from
 * @returns The start date of the week
 */
export function getWeekStartDate<T = DateType>(
  locale: string,
  generateConfig: GenerateConfig<T>,
  date: T
): T;

/**
 * Check if two dates are equal (same date and time)
 * @param generateConfig - Date generation config
 * @param date1 - First date
 * @param date2 - Second date
 * @returns True if dates are equal
 */
export function isEqual<T = DateType>(
  generateConfig: GenerateConfig<T>,
  date1: T | null | undefined,
  date2: T | null | undefined
): boolean;

/**
 * Check if a date is in range between two dates
 * @param generateConfig - Date generation config
 * @param startDate - Range start date
 * @param endDate - Range end date
 * @param targetDate - Date to check
 * @returns True if target date is in range
 */
export function isInRange<T = DateType>(
  generateConfig: GenerateConfig<T>,
  startDate: T | null | undefined,
  endDate: T | null | undefined,
  targetDate: T
): boolean;

/**
 * Check if two nullable dates are equal (both null/undefined or both have values)
 * @param date1 - First date
 * @param date2 - Second date
 * @returns True if both null, false if one null, undefined if both have values
 */
export function isNullEqual<T = DateType>(
  date1: T | null | undefined,
  date2: T | null | undefined
): boolean | undefined;

/**
 * Check if two dates are on the same date (ignoring time)
 * @param generateConfig - Date generation config
 * @param date1 - First date
 * @param date2 - Second date
 * @returns True if dates are the same
 */
export function isSameDate<T = DateType>(
  generateConfig: GenerateConfig<T>,
  date1: T | null | undefined,
  date2: T | null | undefined
): boolean;

/**
 * Check if two dates are in the same decade
 * @param generateConfig - Date generation config
 * @param date1 - First date
 * @param date2 - Second date
 * @returns True if dates are in the same decade
 */
export function isSameDecade<T = DateType>(
  generateConfig: GenerateConfig<T>,
  date1: T | null | undefined,
  date2: T | null | undefined
): boolean;

/**
 * Check if two dates are in the same month
 * @param generateConfig - Date generation config
 * @param date1 - First date
 * @param date2 - Second date
 * @returns True if dates are in the same month
 */
export function isSameMonth<T = DateType>(
  generateConfig: GenerateConfig<T>,
  date1: T | null | undefined,
  date2: T | null | undefined
): boolean;

/**
 * Check if two dates are in the same quarter
 * @param generateConfig - Date generation config
 * @param date1 - First date
 * @param date2 - Second date
 * @returns True if dates are in the same quarter
 */
export function isSameQuarter<T = DateType>(
  generateConfig: GenerateConfig<T>,
  date1: T | null | undefined,
  date2: T | null | undefined
): boolean;

/**
 * Check if two dates have the same time (hour, minute, second)
 * @param generateConfig - Date generation config
 * @param date1 - First date
 * @param date2 - Second date
 * @returns True if times are the same
 */
export function isSameTime<T = DateType>(
  generateConfig: GenerateConfig<T>,
  date1: T | null | undefined,
  date2: T | null | undefined
): boolean;

/**
 * Check if two dates are in the same week
 * @param generateConfig - Date generation config
 * @param locale - Locale string
 * @param date1 - First date
 * @param date2 - Second date
 * @returns True if dates are in the same week
 */
export function isSameWeek<T = DateType>(
  generateConfig: GenerateConfig<T>,
  locale: string,
  date1: T | null | undefined,
  date2: T | null | undefined
): boolean;

/**
 * Check if two dates are in the same year
 * @param generateConfig - Date generation config
 * @param date1 - First date
 * @param date2 - Second date
 * @returns True if dates are in the same year
 */
export function isSameYear<T = DateType>(
  generateConfig: GenerateConfig<T>,
  date1: T | null | undefined,
  date2: T | null | undefined
): boolean;