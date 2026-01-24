/**
 * Sort-by update handler for internal options
 * Compares current and new sort values, emits update event if they differ
 * 
 * @module internalOptions.sortBy
 */

/**
 * Type definition for sort-by value (single string or array of strings)
 */
type SortByValue = string | string[];

/**
 * Interface for deep equality comparison utility
 */
interface DeepEqualUtil {
  /**
   * Performs deep equality comparison between two values
   * @param a - First value to compare
   * @param b - Second value to compare
   * @returns True if values are deeply equal
   */
  deepEqual<T>(a: T, b: T): boolean;
}

/**
 * Vue component context interface for sort-by handler
 */
interface SortByComponentContext {
  /**
   * Current sort-by value
   */
  sortBy: SortByValue;
  
  /**
   * Emits Vue component events
   * @param event - Event name
   * @param payload - Event payload
   */
  $emit(event: 'update:sort-by', payload: SortByValue): void;
}

/**
 * Handles sort-by value updates
 * Compares new value with previous value and emits update event if changed
 * Normalizes array/single value based on current sortBy type
 * 
 * @param newValue - New sort-by value (string or array)
 * @param previousValue - Previous sort-by value for comparison
 * @this SortByComponentContext - Vue component instance
 */
declare function updateSortBy(
  this: SortByComponentContext,
  newValue: SortByValue | string[],
  previousValue: SortByValue
): void;

export { SortByValue, DeepEqualUtil, SortByComponentContext, updateSortBy };