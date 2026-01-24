/**
 * Tree data structure utility types and functions
 * Provides utilities for converting, traversing, and managing tree node entities
 */

/**
 * Position string in format "0-1-2" representing node location in tree
 */
export type Position = string;

/**
 * Unique key identifier for a tree node
 */
export type Key = string | number;

/**
 * Base tree node data structure
 */
export interface TreeNodeData {
  /** Unique identifier for the node */
  key: Key;
  /** Child nodes */
  children?: TreeNodeData[];
  /** Additional custom properties */
  [key: string]: any;
}

/**
 * Entity representing a positioned node in the tree
 */
export interface DataEntity<T = TreeNodeData> {
  /** The actual node data */
  node: T;
  /** Index among siblings */
  index: number;
  /** Unique key */
  key: Key;
  /** Position string in tree hierarchy */
  pos: Position;
  /** Depth level in tree (0-based) */
  level: number;
  /** Parent entity reference */
  parent?: DataEntity<T>;
  /** Child entity references */
  children?: DataEntity<T>[];
}

/**
 * Collection of entities indexed by position
 */
export interface PositionEntities {
  [pos: string]: DataEntity;
}

/**
 * Collection of entities indexed by key
 */
export interface KeyEntities {
  [key: string]: DataEntity;
}

/**
 * Container for both position-based and key-based entity maps
 */
export interface DataEntities {
  /** Entities indexed by position */
  posEntities: PositionEntities;
  /** Entities indexed by key */
  keyEntities: KeyEntities;
}

/**
 * Callback invoked for each node during traversal
 */
export interface ProcessEntityCallback {
  (entity: DataEntity, entities: DataEntities): void;
}

/**
 * Wrapper function to initialize or modify entities structure
 */
export interface InitWrapperCallback {
  (entities: DataEntities): DataEntities | void;
}

/**
 * Callback invoked after all entities are processed
 */
export interface OnProcessFinishedCallback {
  (entities: DataEntities): void;
}

/**
 * Function to extract key from node data
 */
export interface ExternalGetKeyCallback {
  (node: TreeNodeData): Key;
}

/**
 * Options for convertDataToEntities function
 */
export interface ConvertDataToEntitiesOptions {
  /** Initialize or wrap the entities structure */
  initWrapper?: InitWrapperCallback;
  /** Process each entity during conversion */
  processEntity?: ProcessEntityCallback;
  /** Called after all processing completes */
  onProcessFinished?: OnProcessFinishedCallback;
  /** Custom key extraction function */
  externalGetKey?: ExternalGetKeyCallback | string;
  /** Property name for children array (default: "children") */
  childrenPropName?: string;
}

/**
 * Node traversal callback
 */
export interface TraverseCallback {
  (data: {
    node: TreeNodeData;
    index: number;
    pos: Position;
    key: Key;
    parentPos: Position | null;
    level: number;
  }): void;
}

/**
 * Options for traverseDataNodes function
 */
export interface TraverseOptions {
  /** Custom key extraction (function or property name) */
  externalGetKey?: ExternalGetKeyCallback | string;
  /** Property name for children array */
  childrenPropName?: string;
}

/**
 * Event data representing node state
 */
export interface NodeEventData extends TreeNodeData {
  /** Whether node is expanded */
  expanded: boolean;
  /** Whether node is selected */
  selected: boolean;
  /** Whether node is checked */
  checked: boolean;
  /** Whether node data is loaded */
  loaded: boolean;
  /** Whether node is loading */
  loading: boolean;
  /** Whether node is half-checked (indeterminate) */
  halfChecked: boolean;
  /** Whether node is drag target */
  dragOver: boolean;
  /** Whether dragging over top gap */
  dragOverGapTop: boolean;
  /** Whether dragging over bottom gap */
  dragOverGapBottom: boolean;
  /** Node position string */
  pos: Position;
  /** Whether node is active */
  active: boolean;
}

/**
 * Flattened tree node with hierarchy metadata
 */
export interface FlattenedNode extends TreeNodeData {
  /** Parent node reference */
  parent: FlattenedNode | null;
  /** Position in tree */
  pos: Position;
  /** Child nodes (null if collapsed) */
  children: FlattenedNode[] | null;
  /** Original data reference */
  data: TreeNodeData;
  /** Whether node is first at each level */
  isStart: boolean[];
  /** Whether node is last at each level */
  isEnd: boolean[];
}

/**
 * Tree node properties for rendering
 */
export interface TreeNodeProps {
  /** Event key identifier */
  eventKey: Key;
  /** Whether node is expanded */
  expanded: boolean;
  /** Whether node is selected */
  selected: boolean;
  /** Whether node data is loaded */
  loaded: boolean;
  /** Whether node is loading */
  loading: boolean;
  /** Whether node is checked */
  checked: boolean;
  /** Whether node is half-checked */
  halfChecked: boolean;
  /** Position string */
  pos: string;
  /** Whether node is drag over target (center) */
  dragOver: boolean;
  /** Whether drag is over top gap */
  dragOverGapTop: boolean;
  /** Whether drag is over bottom gap */
  dragOverGapBottom: boolean;
}

/**
 * Tree state for computing node props
 */
export interface TreeState {
  /** Keys of expanded nodes */
  expandedKeys: Key[];
  /** Keys of selected nodes */
  selectedKeys: Key[];
  /** Keys of loaded nodes */
  loadedKeys: Key[];
  /** Keys of loading nodes */
  loadingKeys: Key[];
  /** Keys of checked nodes */
  checkedKeys: Key[];
  /** Keys of half-checked nodes */
  halfCheckedKeys: Key[];
  /** Key of node being dragged over */
  dragOverNodeKey: Key | null;
  /** Drop position relative to target (-1: top, 0: center, 1: bottom) */
  dropPosition: number;
  /** Entity maps */
  keyEntities: KeyEntities;
}

/**
 * Converts tree data array to entity maps indexed by position and key
 * @param data - Array of tree nodes
 * @param options - Conversion options
 * @param legacyExternalGetKey - Legacy parameter for key extraction
 * @returns Entity maps with position and key indices
 */
export function convertDataToEntities(
  data: TreeNodeData[],
  options?: ConvertDataToEntitiesOptions,
  legacyExternalGetKey?: ExternalGetKeyCallback
): DataEntities;

/**
 * Converts node data and state to event data object
 * @param nodeData - Combined node data and state
 * @returns Event data with deprecated props getter
 */
export function convertNodePropsToEventData(nodeData: {
  data: TreeNodeData;
  expanded: boolean;
  selected: boolean;
  checked: boolean;
  loaded: boolean;
  loading: boolean;
  halfChecked: boolean;
  dragOver: boolean;
  dragOverGapTop: boolean;
  dragOverGapBottom: boolean;
  pos: Position;
  active: boolean;
}): NodeEventData;

/**
 * Converts React tree elements to plain data array
 * @param treeElements - React TreeNode elements
 * @returns Array of plain tree node data
 */
export function convertTreeToData(treeElements: any): TreeNodeData[];

/**
 * Flattens tree data into a linear array with hierarchy metadata
 * @param data - Tree data array
 * @param expandedKeys - Keys to expand (true for all, array for specific keys)
 * @returns Flattened array of nodes with parent/position info
 */
export function flattenTreeData(
  data?: TreeNodeData[],
  expandedKeys?: boolean | Key[]
): FlattenedNode[];

/**
 * Gets the effective key, preferring explicit key over position fallback
 * @param key - Explicit key value
 * @param position - Position fallback
 * @returns The effective key
 */
export function getKey(key: Key | null | undefined, position: Position): Key;

/**
 * Computes rendering properties for a tree node based on tree state
 * @param key - Node key
 * @param state - Current tree state
 * @returns Props object for rendering
 */
export function getTreeNodeProps(key: Key, state: TreeState): TreeNodeProps;

/**
 * Traverses tree data nodes in depth-first order
 * @param data - Tree data array
 * @param callback - Function called for each node
 * @param options - Traversal options
 */
export function traverseDataNodes(
  data: TreeNodeData[],
  callback: TraverseCallback,
  options?: TraverseOptions
): void;

/**
 * Validates that all tree nodes have unique keys and logs warnings
 * @param data - Tree data array to validate
 */
export function warningWithoutKey(data?: TreeNodeData[]): void;