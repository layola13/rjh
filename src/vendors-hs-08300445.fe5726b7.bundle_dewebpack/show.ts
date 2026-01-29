/**
 * Tree selection display strategy constants and formatting utilities.
 * 
 * This module provides three display strategies for tree selection:
 * - SHOW_ALL: Display all selected nodes
 * - SHOW_PARENT: Display only parent nodes when all children are selected
 * - SHOW_CHILD: Display only child nodes, hiding parents when all children are selected
 */

/**
 * Display all selected nodes regardless of parent-child relationships.
 */
export const SHOW_ALL = "SHOW_ALL";

/**
 * Display only parent nodes when all their children are selected.
 * Hides child nodes if their parent is selected.
 */
export const SHOW_PARENT = "SHOW_PARENT";

/**
 * Display only child nodes, hiding parent nodes when all children are selected.
 */
export const SHOW_CHILD = "SHOW_CHILD";

/**
 * Tree selection display strategy type.
 */
export type ShowStrategy = typeof SHOW_ALL | typeof SHOW_PARENT | typeof SHOW_CHILD;

/**
 * Tree node structure with key identifier.
 */
export interface TreeNode {
  key: string;
  [key: string]: unknown;
}

/**
 * Entity wrapper containing tree node and relationships.
 */
export interface TreeEntity {
  node: TreeNode;
  parent?: TreeEntity | null;
  children?: TreeEntity[];
  [key: string]: unknown;
}

/**
 * Map of node keys to their corresponding entities.
 */
export type KeyEntities = Record<string, TreeEntity>;

/**
 * Check if a tree node is disabled for selection.
 * 
 * @param node - The tree node to check
 * @returns True if the node is disabled, false otherwise
 */
declare function isCheckDisabled(node: TreeNode): boolean;

/**
 * Format and filter selected keys based on the display strategy.
 * 
 * This function processes the selected keys according to the specified strategy:
 * - SHOW_CHILD: Filters out parent nodes if all their non-disabled children are selected
 * - SHOW_PARENT: Filters out child nodes if their non-disabled parent is selected
 * - SHOW_ALL: Returns all keys without filtering
 * 
 * @param keys - Array of selected node keys
 * @param strategy - The display strategy to apply
 * @param keyEntities - Map of node keys to their entity objects containing relationships
 * @returns Filtered array of keys according to the strategy
 */
export function formatStrategyKeys(
  keys: string[],
  strategy: ShowStrategy,
  keyEntities: KeyEntities
): string[];