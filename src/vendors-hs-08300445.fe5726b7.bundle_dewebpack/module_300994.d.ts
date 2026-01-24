/**
 * Utility functions for managing expanded tree node keys
 * @module ExpandedKeysUtils
 */

/**
 * Result of comparing two key arrays to determine expansion change
 */
export interface FindExpandedKeysResult {
  /** Whether a key was added (true) or removed (false) */
  add: boolean;
  /** The key that was added or removed, null if no single change detected */
  key: string | number | null;
}

/**
 * Generic tree node structure
 */
export interface TreeNode<T = any> {
  /** Node data containing at minimum a key property */
  data: {
    /** Unique identifier for the node */
    key: string | number;
    [key: string]: any;
  };
  [key: string]: any;
}

/**
 * Finds which key was added or removed between two arrays of expanded keys
 * Detects single key differences to identify expand/collapse actions
 * 
 * @param prevKeys - Previous array of expanded keys
 * @param currentKeys - Current array of expanded keys
 * @returns Object indicating whether a key was added and which key changed
 * 
 * @example
 * findExpandedKeys([1, 2], [1, 2, 3]) // { add: true, key: 3 }
 * findExpandedKeys([1, 2, 3], [1, 2]) // { add: false, key: 3 }
 */
export function findExpandedKeys(
  prevKeys: Array<string | number> = [],
  currentKeys: Array<string | number> = []
): FindExpandedKeysResult;

/**
 * Gets the range of nodes that should be expanded between a parent and its next sibling
 * Used to determine which child nodes fall under a newly expanded parent
 * 
 * @param prevFlatList - Previous flattened tree structure
 * @param currentFlatList - Current flattened tree structure after expansion
 * @param expandedKey - The key of the node that was expanded
 * @returns Array of nodes within the expansion range
 * 
 * @example
 * // Returns child nodes between parent and next sibling
 * getExpandRange(prevList, currentList, 'parent-1')
 */
export function getExpandRange<T = any>(
  prevFlatList: Array<TreeNode<T>>,
  currentFlatList: Array<TreeNode<T>>,
  expandedKey: string | number
): Array<TreeNode<T>>;