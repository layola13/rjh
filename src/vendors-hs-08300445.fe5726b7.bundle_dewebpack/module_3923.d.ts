/**
 * Type definitions for date range picker disabled date hook
 * Module: Range picker disabled date utilities
 */

/**
 * Date value type - can be any date representation handled by the generator
 */
type DateValue<T = any> = T | null | undefined;

/**
 * Tuple representing a date range [start, end]
 */
type RangeValue<T = any> = [DateValue<T>, DateValue<T>] | null;

/**
 * Picker mode type - determines the granularity of date selection
 */
type PickerMode = 'date' | 'week' | 'month' | 'quarter' | 'year';

/**
 * Locale configuration for date formatting and week start day
 */
interface Locale {
  locale: string;
  [key: string]: any;
}

/**
 * Date generation and manipulation configuration
 * Provides methods for date operations across different date libraries
 */
interface GenerateConfig<DateType = any> {
  /**
   * Get the year from a date
   */
  getYear(date: DateType): number;
  
  /**
   * Get the month from a date (0-indexed)
   */
  getMonth(date: DateType): number;
  
  /**
   * Check if first date is after second date
   */
  isAfter(date1: DateType, date2: DateType): boolean;
  
  /**
   * Locale-specific utilities
   */
  locale: {
    /**
     * Get the first date of the week for a given date
     * @param locale - Locale string (e.g., 'en-US', 'zh-CN')
     * @param date - The date to get week start from
     */
    getWeekFirstDate(locale: string, date: DateType): DateType;
  };
}

/**
 * Disabled state for start and end dates in range picker
 * [isStartDisabled, isEndDisabled]
 */
type DisabledState = [boolean, boolean];

/**
 * Function to determine if a specific date should be disabled
 * @param date - The date to check
 * @returns true if the date should be disabled
 */
type DisabledDateFunc<DateType = any> = (date: DateType) => boolean;

/**
 * Hook parameters for range picker disabled date logic
 */
interface UseRangeDisabledParams<DateType = any> {
  /**
   * Current picker mode (date, week, month, quarter, year)
   */
  picker: PickerMode;
  
  /**
   * Locale configuration for date operations
   */
  locale: Locale;
  
  /**
   * Currently selected date range [start, end]
   */
  selectedValue: RangeValue<DateType>;
  
  /**
   * Custom function to disable specific dates
   */
  disabledDate?: DisabledDateFunc<DateType>;
  
  /**
   * Disabled state for start and end inputs
   */
  disabled: DisabledState;
  
  /**
   * Date generation configuration (adapter for different date libraries)
   */
  generateConfig: GenerateConfig<DateType>;
}

/**
 * Hook return type - tuple of two disabled date checkers
 * [disabledStartDate, disabledEndDate]
 */
type UseRangeDisabledReturn<DateType = any> = [
  DisabledDateFunc<DateType>,
  DisabledDateFunc<DateType>
];

/**
 * Custom hook for managing disabled dates in a range picker
 * 
 * Returns two functions:
 * - First function: Checks if a date should be disabled for the START date input
 * - Second function: Checks if a date should be disabled for the END date input
 * 
 * The logic ensures:
 * 1. Custom disabled dates are always respected
 * 2. When end date is selected, start dates after it are disabled
 * 3. When start date is selected, end dates before it are disabled
 * 4. Disabled state of each input is considered
 * 
 * @param params - Configuration object for the hook
 * @param hasEndValue - Whether an end value exists (second parameter in original)
 * @param hasStartValue - Whether a start value exists (third parameter in original)
 * @returns Tuple of [disabledStartDate, disabledEndDate] functions
 * 
 * @example
 *