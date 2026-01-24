/**
 * MotionEntity Module - Tree component motion and virtual list management
 * Handles animated expand/collapse transitions and virtual scrolling for tree nodes
 */

import type { Key, CSSProperties, RefObject } from 'react';

/**
 * Motion key constant used to identify motion placeholder nodes
 */
export const MOTION_KEY: string;

/**
 * Tree node position string (e.g., "0-1-2")
 */
export type NodePosition = string;

/**
 * Basic tree node data structure
 */
export interface TreeNodeData {
  key: Key;
  [key: string]: any;
}

/**
 * Motion entity representing a placeholder node during animations
 */
export interface MotionEntity {
  /** Unique key for the motion placeholder */
  key: string;
  /** Depth level in the tree hierarchy */
  level: number;
  /** Index position among siblings */
  index: number;
  /** Position string in tree structure */
  pos: NodePosition;
  /** Node data object */
  node: TreeNodeData;
}

/**
 * Flattened tree node structure used in virtual list
 */
export interface FlattenNode {
  /** Parent node reference */
  parent: FlattenNode | null;
  /** Child nodes */
  children: FlattenNode[];
  /** Position string */
  pos: NodePosition;
  /** Associated data */
  data: TreeNodeData;
  /** Whether this is the first node at each level */
  isStart: boolean[];
  /** Whether this is the last node at each level */
  isEnd: boolean[];
}

/**
 * Tree state containing key-based node tracking
 */
export interface TreeState {
  /** Expanded node keys */
  expandedKeys: Key[];
  /** Selected node keys */
  selectedKeys: Key[];
  /** Loaded (lazy-loaded) node keys */
  loadedKeys: Key[];
  /** Currently loading node keys */
  loadingKeys: Key[];
  /** Checked node keys */
  checkedKeys: Key[];
  /** Half-checked (indeterminate) node keys */
  halfCheckedKeys: Key[];
  /** Key of node being dragged over */
  dragOverNodeKey: Key | null;
  /** Drop position indicator (-1: before, 0: on, 1: after) */
  dropPosition: number | null;
  /** Map of keys to node entities */
  keyEntities: Record<Key, any>;
}

/**
 * Motion configuration for expand/collapse animations
 */
export interface MotionConfig {
  /** Motion animation name or configuration */
  motionName?: string;
  /** Motion animation duration */
  motionAppear?: boolean;
  /** Custom motion props */
  [key: string]: any;
}

/**
 * Props for the NodeList component
 */
export interface NodeListProps extends TreeState {
  /** CSS class prefix */
  prefixCls: string;
  /** Flattened tree data array */
  data: FlattenNode[];
  /** Whether nodes are selectable */
  selectable?: boolean;
  /** Whether nodes are checkable */
  checkable?: boolean;
  /** Whether tree is disabled */
  disabled?: boolean;
  /** Whether currently dragging */
  dragging?: boolean;
  /** Motion animation configuration */
  motion?: MotionConfig | null;
  /** Fixed height for virtual scrolling */
  height?: number;
  /** Height of each item */
  itemHeight?: number;
  /** Enable virtual scrolling */
  virtual?: boolean;
  /** Whether tree is focusable */
  focusable?: boolean;
  /** Currently active (focused) item */
  activeItem?: FlattenNode | null;
  /** Whether tree has focus */
  focused?: boolean;
  /** Tab index for keyboard navigation */
  tabIndex?: number;
  /** Keyboard event handler */
  onKeyDown?: (e: React.KeyboardEvent) => void;
  /** Focus event handler */
  onFocus?: (e: React.FocusEvent) => void;
  /** Blur event handler */
  onBlur?: (e: React.FocusEvent) => void;
  /** Active item change callback */
  onActiveChange?: (item: FlattenNode | null) => void;
  /** Called when list animation starts */
  onListChangeStart?: () => void;
  /** Called when list animation ends */
  onListChangeEnd?: () => void;
}

/**
 * NodeList component ref methods
 */
export interface NodeListRef {
  /** Scroll to specific position or index */
  scrollTo: (config: { index?: number; offset?: number; key?: Key }) => void;
  /** Get the width of tree indent unit */
  getIndentWidth: () => number;
}

/**
 * Calculate minimum range for virtual scrolling with transitions
 * @param dataList - Full list of tree nodes
 * @param virtual - Whether virtual scrolling is enabled
 * @param height - Container height
 * @param itemHeight - Height of each item
 * @returns Sliced array for rendering range
 */
export function getMinimumRangeTransitionRange(
  dataList: FlattenNode[],
  virtual: boolean | undefined,
  height: number | undefined,
  itemHeight: number | undefined
): FlattenNode[];

/**
 * NodeList component for rendering tree with motion and virtual scrolling
 */
declare const NodeList: React.ForwardRefExoticComponent<
  NodeListProps & React.RefAttributes<NodeListRef>
>;

export default NodeList;
export { NodeList };