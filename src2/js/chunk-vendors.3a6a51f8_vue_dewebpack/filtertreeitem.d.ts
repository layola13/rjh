/**
 * Utility functions for filtering tree view items
 * @module filterTreeItems
 */

/**
 * Filters a single tree item based on a search query
 * @param item - The tree item to filter
 * @param search - The search query string
 * @param itemText - The property path to extract text from the item
 * @returns True if the item matches the search query, false otherwise
 */
export declare function filterTreeItem(
  item: Record<string, any>,
  search: string,
  itemText: string
): boolean;

/**
 * Recursively filters tree items and their children
 * @param filterFn - The filter function to apply to each item
 * @param item - The current tree item being filtered
 * @param search - The search query string
 * @param itemKey - The property path used as the item's unique identifier
 * @param itemText - The property path to extract text from the item
 * @param itemChildren - The property path to access child items
 * @param excludedSet - A Set to track excluded item keys that don't match the filter
 * @returns True if the item or any of its children match the filter, false otherwise
 */
export declare function filterTreeItems(
  filterFn: (
    item: Record<string, any>,
    search: string,
    itemText: string
  ) => boolean,
  item: Record<string, any>,
  search: string,
  itemKey: string,
  itemText: string,
  itemChildren: string,
  excludedSet: Set<any>
): boolean;