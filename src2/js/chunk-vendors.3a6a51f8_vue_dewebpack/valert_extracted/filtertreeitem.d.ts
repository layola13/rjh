/**
 * Utility functions for filtering tree view items
 * @module filterTreeItems
 */

/**
 * Represents a tree item with arbitrary properties
 */
export interface TreeItem {
  [key: string]: any;
}

/**
 * Filter function type for tree items
 * @param item - The tree item to filter
 * @param searchText - The search text to match against
 * @param itemKey - The property key to search in
 * @returns True if the item matches the search criteria
 */
export type TreeItemFilterFunction = (
  item: TreeItem,
  searchText: string,
  itemKey: string
) => boolean;

/**
 * Filters a single tree item by searching for text in a specified property
 * 
 * @param item - The tree item to filter
 * @param searchText - The text to search for (case-insensitive)
 * @param itemKey - The property path to search in (supports nested paths)
 * @returns True if the item's property contains the search text (case-insensitive)
 * 
 * @example
 *