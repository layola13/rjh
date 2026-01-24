/**
 * Array.prototype.sort polyfill module
 * Provides cross-browser compatible array sorting functionality with proper compareFn handling
 */

/**
 * Comparator function type for array sorting
 * @template T - The type of elements being compared
 * @param a - First element to compare
 * @param b - Second element to compare
 * @returns Negative if a < b, positive if a > b, zero if equal
 */
type CompareFn<T> = (a: T, b: T) => number;

/**
 * Internal sortable item structure used during sorting operations
 * @internal
 */
interface SortableItem {
  /** Key identifier for the item */
  k: string;
  /** Sort priority value */
  v: number;
}

/**
 * Extended Array interface with enhanced sort method
 * @template T - The type of elements in the array
 */
declare global {
  interface Array<T> {
    /**
     * Sorts an array in place using an optional comparison function.
     * This implementation provides consistent cross-browser behavior and handles edge cases.
     * 
     * @param compareFn - Optional comparison function that defines sort order.
     *                    If omitted, elements are converted to strings and sorted in Unicode order.
     *                    Must return:
     *                    - Negative number if first argument should come before second
     *                    - Positive number if first argument should come after second  
     *                    - Zero if arguments are considered equal
     * 
     * @returns The sorted array (same reference, sorted in place)
     * 
     * @remarks
     * - Handles undefined values by placing them at the end
     * - Validates compareFn is callable if provided
     * - Uses stable sort algorithm for consistent results
     * - Compatible with legacy browsers (pre-ES2019)
     * 
     * @example
     *