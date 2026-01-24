/**
 * VTreeview Component Type Definitions
 * A tree view component for displaying hierarchical data with selection, activation, and expansion capabilities.
 */

import { VNode } from 'vue';
import { VueConstructor } from 'vue/types/umd';

/**
 * Selection behavior type for tree nodes
 * - 'leaf': Only leaf nodes can be selected
 * - 'independent': Nodes are selected independently without parent-child relationship
 * - default: Parent selection affects children and vice versa
 */
export type SelectionType = 'leaf' | 'independent';

/**
 * Filter function to determine if a tree item matches the search criteria
 */
export type TreeItemFilterFunction = (
  item: unknown,
  search: string,
  textKey: string
) => boolean;

/**
 * Internal tree node structure maintained by VTreeview
 */
export interface TreeNode<T = any> {
  /** Vue component instance for this node */
  vnode: VTreeviewNodeInstance | null;
  /** Parent node key, null for root nodes */
  parent: string | null;
  /** Array of child node keys */
  children: string[];
  /** Original item data */
  item: T;
  /** Whether the node is currently selected */
  isSelected: boolean;
  /** Whether the node is in indeterminate state (some children selected) */
  isIndeterminate: boolean;
  /** Whether the node is currently active/focused */
  isActive: boolean;
  /** Whether the node is expanded to show children */
  isOpen: boolean;
}

/**
 * State calculation result for a tree node
 */
export interface NodeState {
  /** Whether all children are selected */
  isSelected: boolean;
  /** Whether some but not all children are selected */
  isIndeterminate: boolean;
}

/**
 * Props inherited from VTreeviewNode component
 */
export interface VTreeviewNodeProps {
  /** Key property name in item objects */
  itemKey?: string;
  /** Text property name in item objects */
  itemText?: string;
  /** Children property name in item objects */
  itemChildren?: string;
  /** Disabled property name in item objects */
  itemDisabled?: string;
  /** Selection behavior mode */
  selectionType?: SelectionType;
  /** Whether to show selection checkboxes */
  selectable?: boolean;
  /** Whether nodes can be activated */
  activatable?: boolean;
  /** Color theme for the component */
  color?: string;
  /** Icon for expanded nodes */
  expandIcon?: string;
  /** Icon for indeterminate state nodes */
  indeterminateIcon?: string;
  /** Icon for collapsed nodes */
  offIcon?: string;
  /** Icon for selected nodes */
  onIcon?: string;
  /** Loading icon for async loading nodes */
  loadingIcon?: string;
  /** Custom loading function for child nodes */
  loadChildren?: (item: any) => Promise<void>;
  /** Whether the component is in loading state */
  loading?: boolean;
  /** Transition effect name */
  transition?: boolean | string;
  /** Rounded corners */
  rounded?: boolean;
  /** Shaped style variant */
  shaped?: boolean;
}

/**
 * Component data structure
 */
export interface VTreeviewData {
  /** Internal tree level (-1 for root) */
  level: number;
  /** Cache of active node keys */
  activeCache: Set<string>;
  /** Map of all tree nodes indexed by key */
  nodes: Record<string, TreeNode>;
  /** Cache of open/expanded node keys */
  openCache: Set<string>;
  /** Cache of selected node keys */
  selectedCache: Set<string>;
}

/**
 * Component computed properties
 */
export interface VTreeviewComputed {
  /** Set of item keys that are excluded by the current search filter */
  excludedItems: Set<string>;
}

/**
 * VTreeview component props
 */
export interface VTreeviewProps extends VTreeviewNodeProps {
  /** Array of active (focused) item keys or objects */
  active?: any[];
  /** Compact display mode */
  dense?: boolean;
  /** Custom filter function for searching */
  filter?: TreeItemFilterFunction;
  /** Enable hover effects */
  hoverable?: boolean;
  /** Tree data items */
  items?: any[];
  /** Allow multiple active nodes */
  multipleActive?: boolean;
  /** Array of open (expanded) item keys or objects */
  open?: any[];
  /** Expand all nodes by default */
  openAll?: boolean;
  /** Whether to return full objects instead of keys in events */
  returnObject?: boolean;
  /** Search string to filter items */
  search?: string;
  /** Array of selected item keys or objects */
  value?: any[];
}

/**
 * VTreeview component methods
 */
export interface VTreeviewMethods {
  /**
   * Expand or collapse all nodes
   * @param isOpen - true to expand all, false to collapse all
   */
  updateAll(isOpen: boolean): void;

  /**
   * Get all item keys from a tree structure
   * @param items - Array of tree items
   * @param keys - Accumulator array for keys
   * @returns Array of all item keys
   */
  getKeys(items: any[], keys?: string[]): string[];

  /**
   * Build internal tree node structure from items
   * @param items - Array of tree items
   * @param parent - Parent node key, null for root
   */
  buildTree(items: any[], parent?: string | null): void;

  /**
   * Calculate selection state based on children
   * @param key - Node key
   * @param nodes - Nodes map
   * @returns Calculated state
   */
  calculateState(key: string, nodes: Record<string, TreeNode>): NodeState;

  /**
   * Emit update:open event with current open nodes
   */
  emitOpen(): void;

  /**
   * Emit input event with current selected nodes
   */
  emitSelected(): void;

  /**
   * Emit update:active event with current active nodes
   */
  emitActive(): void;

  /**
   * Emit event with node cache data
   * @param event - Event name
   * @param cache - Set of node keys
   */
  emitNodeCache(event: string, cache: Set<string>): void;

  /**
   * Handle watcher for node cache changes
   * @param value - New value array
   * @param cache - Cache set to update
   * @param updateFn - Function to update individual nodes
   * @param emitFn - Function to emit changes
   */
  handleNodeCacheWatcher(
    value: any[],
    cache: Set<string>,
    updateFn: (key: string, state: boolean) => void,
    emitFn: () => void
  ): void;

  /**
   * Get all descendant node keys
   * @param key - Parent node key
   * @param descendants - Accumulator array
   * @returns Array of descendant keys
   */
  getDescendants(key: string, descendants?: string[]): string[];

  /**
   * Get all ancestor node keys
   * @param key - Child node key
   * @returns Array of ancestor keys from immediate parent to root
   */
  getParents(key: string): string[];

  /**
   * Register a node component instance
   * @param node - VTreeviewNode component instance
   */
  register(node: VTreeviewNodeInstance): void;

  /**
   * Unregister a node component instance
   * @param node - VTreeviewNode component instance
   */
  unregister(node: VTreeviewNodeInstance): void;

  /**
   * Check if a node has children
   * @param key - Node key
   * @returns true if node has children
   */
  isParent(key: string): boolean;

  /**
   * Update active state for a node
   * @param key - Node key
   * @param isActive - Active state
   */
  updateActive(key: string, isActive: boolean): void;

  /**
   * Update selected state for a node and propagate to children/parents
   * @param key - Node key
   * @param isSelected - Selected state
   * @param bypassDisabled - Whether to bypass disabled check
   */
  updateSelected(key: string, isSelected: boolean, bypassDisabled?: boolean): void;

  /**
   * Update open/expanded state for a node
   * @param key - Node key
   * @param isOpen - Open state
   */
  updateOpen(key: string, isOpen: boolean): void;

  /**
   * Sync internal node state to VNode component instance
   * @param key - Node key
   */
  updateVnodeState(key: string): void;

  /**
   * Check if an item is excluded by search filter
   * @param key - Item key
   * @returns true if item is excluded
   */
  isExcluded(key: string): boolean;
}

/**
 * VTreeviewNode component instance interface (stub)
 */
export interface VTreeviewNodeInstance {
  item: any;
  isSelected: boolean;
  isIndeterminate: boolean;
  isActive: boolean;
  isOpen: boolean;
  hasLoaded?: boolean;
  checkChildren?: () => Promise<void>;
}

/**
 * VTreeview component instance
 */
export interface VTreeview extends Vue, VTreeviewMethods {
  readonly $props: VTreeviewProps;
  readonly $data: VTreeviewData;
  readonly excludedItems: Set<string>;
}

/**
 * VTreeview component constructor
 */
declare const VTreeview: VueConstructor<VTreeview>;

export default VTreeview;