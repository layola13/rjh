/**
 * Virtual scrolling utility hook for calculating item positions and sizes.
 * Provides efficient size calculation for virtualized lists by caching measurements.
 */

/**
 * Function to extract a unique key from an item.
 * @template T - The type of items in the list
 */
export type GetItemKey<T> = (item: T) => string | number;

/**
 * Size calculation result containing top and bottom positions.
 */
export interface SizeResult {
  /** The top position (offset from start) in pixels */
  top: number;
  /** The bottom position (offset from start) in pixels */
  bottom: number;
}

/**
 * Size calculator function that computes positions for virtual scrolling.
 * @param startKey - The key of the starting item
 * @param endKey - The key of the ending item (defaults to startKey if not provided)
 * @returns An object containing the top and bottom positions
 */
export type SizeCalculator = (
  startKey: string | number,
  endKey?: string | number
) => SizeResult;

/**
 * Custom React hook for calculating and caching item sizes in a virtualized list.
 * 
 * This hook maintains a cache of item positions and provides an efficient way to
 * calculate the cumulative height/size of items in a list. It's particularly useful
 * for implementing virtual scrolling where not all items are rendered at once.
 * 
 * @template T - The type of items in the data array
 * @param data - Array of items to measure
 * @param getItemKey - Function to extract a unique key from each item
 * @param sizeMap - Map containing pre-measured sizes for specific items
 * @param defaultSize - Default size to use when an item's size is not in the sizeMap
 * @returns A calculator function that computes top and bottom positions for given item keys
 * 
 * @example
 *