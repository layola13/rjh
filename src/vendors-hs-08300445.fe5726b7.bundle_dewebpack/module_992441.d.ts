/**
 * Range picker hook for managing view dates in a date range picker component.
 * Handles the logic for determining which date to display in each panel of a range picker.
 */

import type { GenerateConfig } from './generateConfig';
import type { PickerMode } from './pickerMode';

/**
 * Represents a tuple of two dates for start and end of a range.
 * Either value can be null if not yet selected.
 */
export type RangeDates<DateType> = [DateType | null, DateType | null];

/**
 * Index type for accessing range values (0 for start, 1 for end).
 */
export type RangeIndex = 0 | 1;

/**
 * Parameters for the useRangeViewDate hook.
 */
export interface UseRangeViewDateParams<DateType> {
  /**
   * Currently selected date values in the range picker.
   */
  values: RangeDates<DateType>;

  /**
   * Current picker mode (e.g., 'date', 'month', 'year', 'quarter').
   */
  picker: PickerMode;

  /**
   * Default dates to display when no values are selected.
   */
  defaultDates?: RangeDates<DateType>;

  /**
   * Configuration object for date generation and manipulation.
   */
  generateConfig: GenerateConfig<DateType>;
}

/**
 * Return type of the useRangeViewDate hook.
 * Returns a tuple of [getViewDate, setViewDate] functions.
 */
export type UseRangeViewDateResult<DateType> = [
  /**
   * Gets the appropriate view date for the specified panel index.
   * @param index - The panel index (0 for start, 1 for end)
   * @returns The date to display in the specified panel
   */
  getViewDate: (index: RangeIndex) => DateType,

  /**
   * Sets the view date for a specific panel.
   * @param date - The date to set, or null to clear
   * @param index - The panel index (0 for start, 1 for end)
   */
  setViewDate: (date: DateType | null, index: RangeIndex) => void
];

/**
 * Hook for managing view dates in a range picker component.
 * Handles the display logic for both start and end date panels,
 * ensuring proper synchronization and fallback behavior.
 *
 * @param params - Configuration parameters for the hook
 * @returns Tuple of [getViewDate, setViewDate] functions
 *
 * @example
 *