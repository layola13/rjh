/**
 * Tree utility functions for data manipulation and position calculation
 * @module TreeUtils
 */

/**
 * Position tuple type: [level, ...indices]
 */
type Position = string;

/**
 * Tree node key identifier
 */
type NodeKey = string | number;

/**
 * Drop position indicator
 * -1: before node, 0: inside node, 1: after node
 */
type DropPosition = -1 | 0 | 1;

/**
 * Direction for RTL support
 */
type Direction = 'ltr' | 'rtl';

/**
 * Checked keys configuration
 */
export interface CheckedKeys {
  /** Fully checked keys */
  checked?: NodeKey[];
  /** Half checked keys (partial selection) */
  halfChecked?: NodeKey[];
}

/**
 * Parsed checked keys result
 */
export interface ParsedCheckedKeys {
  /** Fully checked keys */
  checkedKeys?: NodeKey[];
  /** Half checked keys */
  halfCheckedKeys?: NodeKey[];
}

/**
 * Tree node data structure
 */
export interface TreeNodeData {
  /** Unique key */
  key: NodeKey;
  /** Position string (e.g. "0-1-2") */
  pos: Position;
  /** Nesting level */
  level: number;
  /** Parent node reference */
  parent?: TreeNodeData;
  /** Child nodes */
  children?: TreeNodeData[];
  /** Disabled state */
  disabled?: boolean;
  /** Original React node */
  node: React.ReactNode;
}

/**
 * Tree node map: key -> node data
 */
export interface TreeNodeMap {
  [key: string]: TreeNodeData;
}

/**
 * Drop calculation result
 */
export interface DropCalculationResult {
  /** Drop position relative to target */
  dropPosition: DropPosition;
  /** Number of levels adjusted during drag */
  dropLevelOffset: number;
  /** Target node key */
  dropTargetKey: NodeKey;
  /** Target node position */
  dropTargetPos: Position;
  /** Node being dragged over */
  dragOverNodeKey: NodeKey;
  /** Container key (parent) where drop will occur */
  dropContainerKey: NodeKey | null;
  /** Whether drop is allowed */
  dropAllowed: boolean;
}

/**
 * Drop validation function
 */
export type AllowDropFunc = (options: {
  dropNode: React.ReactNode;
  dropPosition: DropPosition;
}) => boolean;

/**
 * Mouse event coordinates
 */
export interface MouseEventCoordinates {
  x?: number;
  y?: number;
}

/**
 * Tree node component props
 */
export interface TreeNodeProps {
  eventKey: NodeKey;
  [key: string]: any;
}

/**
 * Tree node component
 */
export interface TreeNodeComponent {
  props: TreeNodeProps;
}

/**
 * Flattened node for rendering
 */
export interface FlattenedNode {
  data: {
    key: NodeKey;
  };
}

/**
 * Props processor function
 */
export type PropsProcessor<T = any> = (props: T) => T;

/**
 * Convert data to tree options
 */
export interface ConvertDataToTreeOptions {
  /** Props transformation function */
  processProps?: PropsProcessor;
}

/**
 * Raw tree data node
 */
export interface RawTreeNode {
  children?: RawTreeNode[];
  [key: string]: any;
}

/**
 * Add an item to array immutably (deduplicates)
 * @param arr - Source array
 * @param item - Item to add
 * @returns New array with item added if not present
 */
export declare function arrAdd<T>(arr: T[], item: T): T[];

/**
 * Remove an item from array immutably
 * @param arr - Source array
 * @param item - Item to remove
 * @returns New array with item removed
 */
export declare function arrDel<T>(arr: T[], item: T): T[];

/**
 * Calculate drop position during drag-and-drop operation
 * @param event - Mouse event
 * @param treeNode - Target tree node component
 * @param nodeKey - Node being dragged
 * @param indent - Indentation per level
 * @param startMousePosition - Initial mouse position
 * @param allowDrop - Drop validation callback
 * @param flattenedNodes - Flattened node list for iteration
 * @param keyEntities - Node key to entity map
 * @param expandedKeys - Currently expanded node keys
 * @param direction - Layout direction (ltr/rtl)
 * @returns Drop calculation result with position and validity
 */
export declare function calcDropPosition(
  event: React.MouseEvent,
  treeNode: TreeNodeComponent,
  nodeKey: NodeKey,
  indent: number,
  startMousePosition: MouseEventCoordinates,
  allowDrop: AllowDropFunc,
  flattenedNodes: FlattenedNode[],
  keyEntities: TreeNodeMap,
  expandedKeys: NodeKey[],
  direction: Direction
): DropCalculationResult;

/**
 * Calculate selected keys based on selection mode
 * @param selectedKeys - Raw selected keys
 * @param options - Selection options (multiple flag)
 * @returns Normalized selected keys array
 */
export declare function calcSelectedKeys(
  selectedKeys: NodeKey[] | undefined,
  options: { multiple: boolean }
): NodeKey[] | undefined;

/**
 * Conduct parent expansion: ensure all ancestors of given keys are included
 * @param expandedKeys - Keys to expand
 * @param keyEntities - Node map
 * @returns Set of keys including all necessary parents
 */
export declare function conductExpandParent(
  expandedKeys: NodeKey[],
  keyEntities: TreeNodeMap
): NodeKey[];

/**
 * Convert raw data to React Tree components
 * @param data - Raw tree data (single node or array)
 * @param options - Conversion options
 * @returns React Tree node elements
 */
export declare function convertDataToTree(
  data: RawTreeNode | RawTreeNode[],
  options?: ConvertDataToTreeOptions
): React.ReactElement[];

/**
 * Extract data-* and aria-* attributes from props
 * @param props - Component props object
 * @returns Filtered object with only data/aria attributes
 */
export declare function getDataAndAria(props: Record<string, any>): Record<string, any>;

/**
 * Get all descendant keys of a dragged node
 * @param dragKey - Key of node being dragged
 * @param keyEntities - Node map
 * @returns Array of all child keys (recursive)
 */
export declare function getDragChildrenKeys(
  dragKey: NodeKey,
  keyEntities: TreeNodeMap
): NodeKey[];

/**
 * Generate position string from level and index
 * @param level - Nesting level
 * @param index - Index at current level
 * @returns Position string (e.g. "0-2")
 */
export declare function getPosition(level: number, index: number): Position;

/**
 * Check if node is the first child of its parent
 * @param node - Tree node data
 * @returns True if first child
 */
export declare function isFirstChild(node: TreeNodeData): boolean;

/**
 * Check if node is the last child of its parent
 * @param node - Tree node data
 * @returns True if last child
 */
export declare function isLastChild(node: TreeNodeData): boolean;

/**
 * Type guard to check if element is a TreeNode component
 * @param element - React element to check
 * @returns True if element is TreeNode
 */
export declare function isTreeNode(element: any): element is React.ReactElement;

/**
 * Parse checked keys from array or object format
 * @param checkedKeys - Raw checked keys (array or object)
 * @returns Normalized checked keys with half-checked separation
 */
export declare function parseCheckedKeys(
  checkedKeys: NodeKey[] | CheckedKeys | undefined
): ParsedCheckedKeys | null;

/**
 * Parse position string into array of numbers
 * @param position - Position string (e.g. "0-1-2")
 * @returns Array of position segments
 */
export declare function posToArr(position: Position): string[];