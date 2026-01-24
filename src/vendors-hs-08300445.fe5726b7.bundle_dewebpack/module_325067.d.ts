/**
 * Tree utility functions for drag-and-drop, selection, and data manipulation
 */

import type { ReactElement } from 'react';

// ============================================================================
// Type Definitions
// ============================================================================

/**
 * Event key type for tree nodes
 */
export type EventKey = string | number;

/**
 * Position string format: "0-0-1" (level-index hierarchy)
 */
export type Position = string;

/**
 * Tree node data structure
 */
export interface TreeNodeData {
  key: EventKey;
  children?: TreeNodeData[];
  disabled?: boolean;
  [key: string]: any;
}

/**
 * Internal tree node with computed properties
 */
export interface TreeNode {
  key: EventKey;
  pos: Position;
  node: TreeNodeData;
  parent: TreeNode | null;
  children?: TreeNode[];
  level: number;
  data: TreeNodeData;
}

/**
 * Key-indexed map of tree nodes
 */
export interface KeyEntities {
  [key: string]: TreeNode;
}

/**
 * Mouse event with client coordinates
 */
export interface DragEvent {
  clientX: number;
  clientY: number;
  target: HTMLElement;
}

/**
 * Previous drag position coordinates
 */
export interface PreviousPosition {
  x?: number;
  y?: number;
}

/**
 * Drop position validation function
 */
export type AllowDropFunction = (options: {
  dropNode: TreeNodeData;
  dropPosition: number;
}) => boolean;

/**
 * Result of drop position calculation
 */
export interface DropPositionResult {
  /** Drop position relative to target: -1 (before), 0 (inside), 1 (after) */
  dropPosition: number;
  /** Number of levels the drop target was adjusted */
  dropLevelOffset: number;
  /** Key of the final drop target node */
  dropTargetKey: EventKey;
  /** Position string of the drop target */
  dropTargetPos: Position;
  /** Key of the node being dragged over */
  dragOverNodeKey: EventKey;
  /** Key of the container node (parent), null if root level */
  dropContainerKey: EventKey | null;
  /** Whether the drop operation is allowed */
  dropAllowed: boolean;
}

/**
 * Checked keys configuration
 */
export interface CheckedKeys {
  checkedKeys?: EventKey[];
  halfCheckedKeys?: EventKey[];
}

/**
 * Props processor function for data conversion
 */
export type PropsProcessor<T = any> = (props: T) => T;

/**
 * Options for data-to-tree conversion
 */
export interface ConvertDataOptions<T = any> {
  processProps?: PropsProcessor<T>;
}

// ============================================================================
// Array Manipulation
// ============================================================================

/**
 * Add an item to an array if it doesn't already exist
 * @param array - Source array
 * @param item - Item to add
 * @returns New array with item added
 */
export function arrAdd<T>(array: T[], item: T): T[];

/**
 * Remove an item from an array
 * @param array - Source array
 * @param item - Item to remove
 * @returns New array with item removed
 */
export function arrDel<T>(array: T[], item: T): T[];

// ============================================================================
// Position Utilities
// ============================================================================

/**
 * Generate position string from level and index
 * @param level - Tree level
 * @param index - Index within level
 * @returns Position string (e.g., "0-2")
 */
export function getPosition(level: string | number, index: string | number): Position;

/**
 * Parse position string into array of indices
 * @param position - Position string (e.g., "0-1-2")
 * @returns Array of numeric indices
 */
export function posToArr(position: Position): number[];

/**
 * Check if a node is the first child of its parent
 * @param node - Tree node to check
 * @returns True if node is first child
 */
export function isFirstChild(node: TreeNode): boolean;

/**
 * Check if a node is the last child of its parent
 * @param node - Tree node to check
 * @returns True if node is last child
 */
export function isLastChild(node: TreeNode): boolean;

// ============================================================================
// Selection Utilities
// ============================================================================

/**
 * Calculate selected keys based on selection mode
 * @param keys - Currently selected keys
 * @param options - Selection options
 * @returns Adjusted selected keys array
 */
export function calcSelectedKeys(
  keys: EventKey[] | undefined,
  options: { multiple: boolean }
): EventKey[] | undefined;

/**
 * Parse checked keys from various input formats
 * @param keys - Checked keys as array or object
 * @returns Normalized checked keys structure or null
 */
export function parseCheckedKeys(
  keys: EventKey[] | CheckedKeys | undefined | null
): CheckedKeys | null;

/**
 * Expand all parent nodes of the given keys
 * @param keys - Keys to expand parents for
 * @param keyEntities - Map of all tree nodes
 * @returns Array of keys to expand
 */
export function conductExpandParent(
  keys: EventKey[] | undefined,
  keyEntities: KeyEntities
): EventKey[];

// ============================================================================
// Drag & Drop
// ============================================================================

/**
 * Calculate drop position and target during drag operation
 * @param event - Mouse drag event
 * @param dragNode - The node being dragged (React component)
 * @param nodeKey - Key of the node being dragged over
 * @param indent - Indentation width per level
 * @param previousPosition - Previous mouse position
 * @param allowDrop - Function to validate drop operations
 * @param flattenedNodes - Flattened array of visible nodes
 * @param keyEntities - Map of all tree nodes
 * @param expandedKeys - Currently expanded node keys
 * @param direction - Layout direction ('ltr' or 'rtl')
 * @returns Calculated drop position information
 */
export function calcDropPosition(
  event: DragEvent,
  dragNode: any,
  nodeKey: EventKey,
  indent: number,
  previousPosition: PreviousPosition | undefined,
  allowDrop: AllowDropFunction,
  flattenedNodes: Array<{ data: TreeNodeData }>,
  keyEntities: KeyEntities,
  expandedKeys: EventKey[],
  direction: 'ltr' | 'rtl'
): DropPositionResult;

/**
 * Get all child keys of a dragged node
 * @param dragKey - Key of the dragged node
 * @param keyEntities - Map of all tree nodes
 * @returns Array of all descendant keys
 */
export function getDragChildrenKeys(
  dragKey: EventKey,
  keyEntities: KeyEntities
): EventKey[];

// ============================================================================
// Data Conversion
// ============================================================================

/**
 * Check if a React element is a TreeNode component
 * @param element - React element to check
 * @returns True if element is a TreeNode
 */
export function isTreeNode(element: any): boolean;

/**
 * Convert raw data to Tree component structure
 * @param data - Raw tree data (single object or array)
 * @param options - Conversion options
 * @returns React elements representing tree nodes
 */
export function convertDataToTree<T = any>(
  data: T | T[],
  options?: ConvertDataOptions<T>
): ReactElement[];

/**
 * Extract data-* and aria-* attributes from props
 * @param props - Component props object
 * @returns Object containing only data/aria attributes
 */
export function getDataAndAria(props: Record<string, any>): Record<string, any>;