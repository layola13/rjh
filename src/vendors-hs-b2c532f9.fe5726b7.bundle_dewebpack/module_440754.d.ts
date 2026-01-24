/**
 * QuickSelect algorithm implementation for finding the k-th smallest element in an array.
 * Uses Floyd-Rivest selection algorithm for improved performance on large datasets.
 * 
 * @module QuickSelect
 */

/**
 * Comparison function type that compares two values.
 * @template T - The type of values being compared
 * @param a - First value to compare
 * @param b - Second value to compare
 * @returns Negative if a < b, positive if a > b, zero if equal
 */
type CompareFn<T> = (a: T, b: T) => number;

/**
 * Swaps two elements in an array at the specified indices.
 * 
 * @template T - The type of array elements
 * @param array - The array containing elements to swap
 * @param leftIndex - Index of the first element
 * @param rightIndex - Index of the second element
 */
declare function swap<T>(array: T[], leftIndex: number, rightIndex: number): void;

/**
 * Default comparison function for primitive values.
 * 
 * @template T - The type of values being compared
 * @param a - First value to compare
 * @param b - Second value to compare
 * @returns -1 if a < b, 1 if a > b, 0 if equal
 */
declare function defaultCompare<T>(a: T, b: T): number;

/**
 * Internal implementation of the Floyd-Rivest selection algorithm.
 * Rearranges elements in array so that the k-th element is in its final sorted position.
 * 
 * @template T - The type of array elements
 * @param array - The array to partition
 * @param k - The target index to find
 * @param left - Left boundary of the partition range
 * @param right - Right boundary of the partition range
 * @param compareFn - Comparison function to determine element ordering
 */
declare function quickSelectStep<T>(
    array: T[],
    k: number,
    left: number,
    right: number,
    compareFn: CompareFn<T>
): void;

/**
 * QuickSelect algorithm for partial sorting.
 * Rearranges array elements so that the element at index k is in its final sorted position,
 * with all smaller elements before it and all larger elements after it.
 * 
 * @template T - The type of array elements
 * @param array - The array to partition (modified in-place)
 * @param k - The target index (0-based)
 * @param left - Optional left boundary (default: 0)
 * @param right - Optional right boundary (default: array.length - 1)
 * @param compareFn - Optional comparison function (default: numeric/lexicographic comparison)
 * 
 * @example
 * const arr = [3, 1, 4, 1, 5, 9, 2, 6];
 * quickSelect(arr, 4); // Finds the 5th smallest element
 * // arr[4] is now in its sorted position
 */
declare function quickSelect<T>(
    array: T[],
    k: number,
    left?: number,
    right?: number,
    compareFn?: CompareFn<T>
): void;

export = quickSelect;
export as namespace quickSelect;