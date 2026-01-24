/**
 * Tree data node structure
 */
export interface TreeNode {
  /** Unique identifier for the node */
  key: string;
  /** Child nodes */
  children?: TreeNode[];
  /** Additional node properties */
  [key: string]: any;
}

/**
 * Parameters for calculating range keys
 */
export interface CalcRangeKeysParams {
  /** Array of tree nodes */
  treeData: TreeNode[];
  /** Array of expanded node keys */
  expandedKeys: string[];
  /** Starting key of the range */
  startKey?: string;
  /** Ending key of the range */
  endKey?: string;
}

/**
 * Range selection state enum
 */
export enum RangeState {
  /** No range selected */
  None = 0,
  /** Range start found */
  Start = 1,
  /** Range end reached */
  End = 2
}

/**
 * Callback function for traversing tree nodes
 * @param key - The node key
 * @param node - The tree node
 * @returns false to stop traversing this branch, true to continue
 */
export type TraverseCallback = (key: string, node: TreeNode) => boolean | void;

/**
 * Calculate all keys within a range defined by start and end keys
 * @param params - Range calculation parameters
 * @returns Array of keys within the specified range
 */
export function calcRangeKeys(params: CalcRangeKeysParams): string[];

/**
 * Convert an array of directory keys to their corresponding tree nodes
 * @param treeData - Array of tree nodes to search
 * @param keys - Array of keys to find
 * @returns Array of matching tree nodes
 */
export function convertDirectoryKeysToNodes(
  treeData: TreeNode[],
  keys: string[]
): TreeNode[];