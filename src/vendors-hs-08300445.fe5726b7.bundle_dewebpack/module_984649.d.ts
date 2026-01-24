/**
 * Tree data structure utility types and functions
 * Provides utilities for converting, traversing, and manipulating tree data structures
 */

/**
 * Position string in tree hierarchy (e.g., "0-1-2")
 */
type TreePosition = string;

/**
 * Unique identifier for tree nodes
 */
type TreeKey = string | number;

/**
 * Base tree node data structure
 */
interface TreeNodeData {
  /** Unique key for the node */
  key: TreeKey;
  /** Child nodes */
  children?: TreeNodeData[];
  /** Additional custom properties */
  [key: string]: unknown;
}

/**
 * Internal entity representation of a tree node
 */
interface TreeEntity<T extends TreeNodeData = TreeNodeData> {
  /** Original node data */
  node: T;
  /** Index among siblings */
  index: number;
  /** Unique key */
  key: TreeKey;
  /** Position string in tree hierarchy */
  pos: TreePosition;
  /** Depth level in tree (root is 0) */
  level: number;
  /** Parent entity reference */
  parent?: TreeEntity<T>;
  /** Child entity references */
  children?: TreeEntity<T>[];
  /** Whether this node is the first among siblings at each level */
  isStart?: boolean[];
  /** Whether this node is the last among siblings at each level */
  isEnd?: boolean[];
  /** Reference to original data */
  data?: T;
}

/**
 * Collection of tree entities indexed by position and key
 */
interface TreeEntities<T extends TreeNodeData = TreeNodeData> {
  /** Entities indexed by position string */
  posEntities: Record<TreePosition, TreeEntity<T>>;
  /** Entities indexed by key */
  keyEntities: Record<string, TreeEntity<T>>;
}

/**
 * Configuration options for converting data to entities
 */
interface ConvertDataToEntitiesOptions<T extends TreeNodeData = TreeNodeData> {
  /** Initialize or wrap the entities structure before processing */
  initWrapper?: (entities: TreeEntities<T>) => TreeEntities<T> | void;
  /** Callback invoked for each processed entity */
  processEntity?: (entity: TreeEntity<T>, entities: TreeEntities<T>) => void;
  /** Callback invoked after all entities are processed */
  onProcessFinished?: (entities: TreeEntities<T>) => void;
  /** Custom key extractor function */
  externalGetKey?: (node: T) => TreeKey;
  /** Property name containing children (default: "children") */
  childrenPropName?: string;
}

/**
 * Node traversal callback data
 */
interface TraverseNodeData<T extends TreeNodeData = TreeNodeData> {
  /** Current node being traversed */
  node: T;
  /** Index among siblings */
  index: number;
  /** Position string in tree hierarchy */
  pos: TreePosition;
  /** Node key */
  key: TreeKey;
  /** Parent position string */
  parentPos: TreePosition | null;
  /** Depth level */
  level: number;
}

/**
 * Callback function for tree traversal
 */
type TraverseCallback<T extends TreeNodeData = TreeNodeData> = (
  data: TraverseNodeData<T>
) => void;

/**
 * Configuration for tree traversal
 */
interface TraverseOptions<T extends TreeNodeData = TreeNodeData> {
  /** Custom key extractor function or property name */
  externalGetKey?: ((node: T) => TreeKey) | string;
  /** Property name containing children */
  childrenPropName?: string;
}

/**
 * Tree node display state
 */
interface TreeNodeEventData<T extends TreeNodeData = TreeNodeData> extends T {
  /** Whether node is expanded */
  expanded: boolean;
  /** Whether node is selected */
  selected: boolean;
  /** Whether node is checked */
  checked: boolean;
  /** Whether node children have been loaded */
  loaded: boolean;
  /** Whether node is currently loading */
  loading: boolean;
  /** Whether node is partially checked (indeterminate) */
  halfChecked: boolean;
  /** Whether node is being dragged over */
  dragOver: boolean;
  /** Whether drag is over the top gap */
  dragOverGapTop: boolean;
  /** Whether drag is over the bottom gap */
  dragOverGapBottom: boolean;
  /** Node position string */
  pos: TreePosition;
  /** Whether node is active/focused */
  active: boolean;
  /** @deprecated Legacy props accessor */
  props?: unknown;
}

/**
 * Props for rendering a tree node
 */
interface TreeNodeProps<T extends TreeNodeData = TreeNodeData> extends TreeNodeData {
  /** Node event key */
  eventKey: TreeKey;
  /** Expanded state */
  expanded: boolean;
  /** Selected state */
  selected: boolean;
  /** Loaded state */
  loaded: boolean;
  /** Loading state */
  loading: boolean;
  /** Checked state */
  checked: boolean;
  /** Half-checked state */
  halfChecked: boolean;
  /** Position string */
  pos: string;
  /** Drag over center state */
  dragOver: boolean;
  /** Drag over top gap state */
  dragOverGapTop: boolean;
  /** Drag over bottom gap state */
  dragOverGapBottom: boolean;
}

/**
 * Tree state for determining node props
 */
interface TreeState {
  /** Keys of expanded nodes */
  expandedKeys: TreeKey[];
  /** Keys of selected nodes */
  selectedKeys: TreeKey[];
  /** Keys of loaded nodes */
  loadedKeys: TreeKey[];
  /** Keys of loading nodes */
  loadingKeys: TreeKey[];
  /** Keys of checked nodes */
  checkedKeys: TreeKey[];
  /** Keys of half-checked nodes */
  halfCheckedKeys: TreeKey[];
  /** Key of node being dragged over */
  dragOverNodeKey: TreeKey | null;
  /** Drop position relative to drag target (-1: above, 0: on, 1: below) */
  dropPosition: -1 | 0 | 1 | null;
  /** Entity map */
  keyEntities: Record<string, TreeEntity>;
}

/**
 * Flattened tree node with hierarchy information
 */
interface FlattenedTreeNode<T extends TreeNodeData = TreeNodeData> extends T {
  /** Parent node reference */
  parent: FlattenedTreeNode<T> | null;
  /** Position in tree */
  pos: TreePosition;
  /** Child nodes (null if not expanded) */
  children: FlattenedTreeNode<T>[] | null;
  /** Original data reference */
  data: T;
  /** Array indicating if node is first at each level */
  isStart: boolean[];
  /** Array indicating if node is last at each level */
  isEnd: boolean[];
}

/**
 * Converts hierarchical tree data into flat entity maps indexed by position and key
 * 
 * @param data - Array of tree node data
 * @param options - Conversion configuration options
 * @param legacyExternalGetKey - Legacy key extractor parameter (deprecated)
 * @returns Entity maps with posEntities and keyEntities
 */
export function convertDataToEntities<T extends TreeNodeData = TreeNodeData>(
  data: T[],
  options?: ConvertDataToEntitiesOptions<T>,
  legacyExternalGetKey?: (node: T) => TreeKey
): TreeEntities<T>;

/**
 * Converts node data and state into event data format
 * 
 * @param nodeData - Node data with state properties
 * @returns Event data object with all node states
 */
export function convertNodePropsToEventData<T extends TreeNodeData = TreeNodeData>(
  nodeData: TreeNodeEventData<T>
): TreeNodeEventData<T>;

/**
 * Converts React TreeNode components to plain data objects
 * 
 * @param nodes - React TreeNode elements
 * @returns Array of plain tree data objects
 */
export function convertTreeToData(nodes: React.ReactNode): TreeNodeData[];

/**
 * Flattens tree data into a linear array while preserving hierarchy information
 * 
 * @param data - Hierarchical tree data
 * @param expandedKeys - Keys of expanded nodes (true for all expanded)
 * @returns Flattened array of tree nodes
 */
export function flattenTreeData<T extends TreeNodeData = TreeNodeData>(
  data?: T[],
  expandedKeys?: TreeKey[] | true
): FlattenedTreeNode<T>[];

/**
 * Gets the effective key for a node, using provided key or falling back to position
 * 
 * @param key - Explicit key value
 * @param position - Fallback position string
 * @returns Effective key to use
 */
export function getKey(key: TreeKey | null | undefined, position: TreePosition): TreeKey;

/**
 * Computes props for a tree node based on tree state
 * 
 * @param key - Node key
 * @param state - Current tree state
 * @returns Props object for rendering the node
 */
export function getTreeNodeProps(key: TreeKey, state: TreeState): TreeNodeProps;

/**
 * Traverses tree data in depth-first order, invoking callback for each node
 * 
 * @param data - Tree data to traverse
 * @param callback - Function called for each node
 * @param options - Traversal configuration
 */
export function traverseDataNodes<T extends TreeNodeData = TreeNodeData>(
  data: T[],
  callback: TraverseCallback<T>,
  options?: TraverseOptions<T>
): void;

/**
 * Validates that all tree nodes have unique keys and logs warnings for violations
 * 
 * @param data - Tree data to validate
 */
export function warningWithoutKey(data?: TreeNodeData[]): void;