/**
 * Tree selection display strategy constants and formatting utilities.
 * Controls how selected nodes are displayed in tree components.
 */

/**
 * Display all selected nodes regardless of parent-child relationships.
 */
export const SHOW_ALL = "SHOW_ALL";

/**
 * Display only parent nodes when all children are selected.
 */
export const SHOW_PARENT = "SHOW_PARENT";

/**
 * Display only child nodes, hiding parents even when all children are selected.
 */
export const SHOW_CHILD = "SHOW_CHILD";

/**
 * Valid strategy types for tree node display.
 */
export type ShowStrategy = typeof SHOW_ALL | typeof SHOW_PARENT | typeof SHOW_CHILD;

/**
 * Tree node structure.
 */
export interface TreeNode {
  /** Unique identifier for the node */
  key: string;
  [key: string]: unknown;
}

/**
 * Entity record containing parent-child relationships.
 */
export interface EntityRecord {
  /** Parent node reference */
  parent: { node: TreeNode } | null;
  /** Child node references */
  children?: Array<{ node: TreeNode }>;
}

/**
 * Map of node keys to their entity records.
 */
export type EntityMap = Record<string, EntityRecord | undefined>;

/**
 * Check if a tree node is disabled for selection.
 * @param node - The tree node to check
 * @returns True if the node is disabled
 */
export declare function isCheckDisabled(node: TreeNode): boolean;

/**
 * Format selected keys based on the display strategy.
 * Filters the selected keys according to parent-child relationships and disabled states.
 * 
 * @param selectedKeys - Array of currently selected node keys
 * @param strategy - Display strategy to apply (SHOW_ALL, SHOW_PARENT, or SHOW_CHILD)
 * @param entityMap - Map of node keys to their entity records with parent-child data
 * @returns Filtered array of keys according to the strategy
 * 
 * @example
 * // Show only parent nodes
 * const keys = formatStrategyKeys(['parent', 'child1', 'child2'], SHOW_PARENT, entities);
 * 
 * @example
 * // Show only child nodes
 * const keys = formatStrategyKeys(['parent', 'child1'], SHOW_CHILD, entities);
 */
export declare function formatStrategyKeys(
  selectedKeys: string[],
  strategy: ShowStrategy,
  entityMap: EntityMap
): string[];