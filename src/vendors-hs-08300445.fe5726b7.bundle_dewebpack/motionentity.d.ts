/**
 * Module: MotionEntity
 * Tree component motion entity and node list type definitions
 */

// ==================== Constants ====================

/**
 * Unique key identifier for motion placeholder nodes
 */
export const MOTION_KEY: string;

// ==================== Interfaces ====================

/**
 * Basic tree node data structure
 */
export interface TreeNodeData {
  key: string | number;
  [key: string]: unknown;
}

/**
 * Motion entity representing a placeholder node during animations
 */
export interface MotionEntity {
  /** Unique key for the motion node */
  key: string;
  /** Tree depth level */
  level: number;
  /** Index in current level */
  index: number;
  /** Position path (e.g., "0-1-2") */
  pos: string;
  /** Reference to the node data */
  node: TreeNodeData;
}

/**
 * Key entity mapping for tree nodes
 */
export interface KeyEntity {
  key: string | number;
  parent: KeyEntity | null;
  children: KeyEntity[];
  pos: string;
  data: TreeNodeData;
  isStart: boolean[];
  isEnd: boolean[];
}

/**
 * Tree node required props for rendering
 */
export interface TreeNodeRequiredProps {
  expandedKeys: Array<string | number>;
  selectedKeys: Array<string | number>;
  loadedKeys: Array<string | number>;
  loadingKeys: Array<string | number>;
  checkedKeys: Array<string | number>;
  halfCheckedKeys: Array<string | number>;
  dragOverNodeKey: string | number | null;
  dropPosition: number | null;
  keyEntities: Record<string | number, KeyEntity>;
}

/**
 * Motion configuration for animations
 */
export interface MotionConfig {
  motionName?: string;
  motionAppear?: boolean;
  onAppearStart?: (element: HTMLElement) => void;
  onAppearActive?: (element: HTMLElement) => void;
  onAppearEnd?: (element: HTMLElement) => void;
  onLeaveStart?: (element: HTMLElement) => void;
  onLeaveActive?: (element: HTMLElement) => void;
  onLeaveEnd?: (element: HTMLElement) => void;
}

/**
 * Virtual scroll configuration
 */
export interface VirtualConfig {
  height: number;
  itemHeight: number;
  virtual?: boolean;
}

/**
 * Node list component props
 */
export interface NodeListProps extends VirtualConfig {
  /** CSS class prefix */
  prefixCls: string;
  /** Tree node data array */
  data: KeyEntity[];
  /** Whether nodes are selectable */
  selectable?: boolean;
  /** Whether nodes are checkable */
  checkable?: boolean;
  /** Array of expanded node keys */
  expandedKeys: Array<string | number>;
  /** Array of selected node keys */
  selectedKeys: Array<string | number>;
  /** Array of checked node keys */
  checkedKeys: Array<string | number>;
  /** Array of loaded node keys (for lazy loading) */
  loadedKeys: Array<string | number>;
  /** Array of loading node keys */
  loadingKeys: Array<string | number>;
  /** Array of half-checked node keys */
  halfCheckedKeys: Array<string | number>;
  /** Key entities mapping */
  keyEntities: Record<string | number, KeyEntity>;
  /** Whether the tree is disabled */
  disabled?: boolean;
  /** Whether currently dragging */
  dragging?: boolean;
  /** Key of the node being dragged over */
  dragOverNodeKey?: string | number | null;
  /** Drop position indicator */
  dropPosition?: number | null;
  /** Motion animation configuration */
  motion?: MotionConfig | false;
  /** Virtual scroll height */
  height: number;
  /** Height of each item */
  itemHeight: number;
  /** Enable virtual scrolling */
  virtual?: boolean;
  /** Whether the tree can receive focus */
  focusable?: boolean;
  /** Currently active item */
  activeItem?: KeyEntity | null;
  /** Whether the tree is focused */
  focused?: boolean;
  /** Tab index for keyboard navigation */
  tabIndex?: number;
  /** Keyboard event handler */
  onKeyDown?: (event: React.KeyboardEvent) => void;
  /** Focus event handler */
  onFocus?: (event: React.FocusEvent) => void;
  /** Blur event handler */
  onBlur?: (event: React.FocusEvent) => void;
  /** Active item change callback */
  onActiveChange?: (item: KeyEntity | null) => void;
  /** List change start callback */
  onListChangeStart?: () => void;
  /** List change end callback */
  onListChangeEnd?: () => void;
}

/**
 * Node list component ref methods
 */
export interface NodeListRef {
  /**
   * Scroll to specific position or item
   * @param target - Scroll target (index or configuration)
   */
  scrollTo: (target: number | { index: number; align?: 'top' | 'bottom' | 'auto' }) => void;
  
  /**
   * Get the width of the indent unit
   * @returns Width in pixels
   */
  getIndentWidth: () => number;
}

// ==================== Functions ====================

/**
 * Calculate the minimum range for transitions with virtual scrolling
 * @param range - Full range of items
 * @param virtual - Whether virtual scrolling is enabled
 * @param height - Container height
 * @param itemHeight - Height of each item
 * @returns Sliced range for rendering
 */
export function getMinimumRangeTransitionRange<T>(
  range: T[],
  virtual: boolean | undefined,
  height: number,
  itemHeight: number
): T[];

// ==================== Component ====================

/**
 * Node list component for rendering tree nodes with virtual scrolling and animations
 */
declare const NodeList: React.ForwardRefExoticComponent<
  NodeListProps & React.RefAttributes<NodeListRef>
>;

export default NodeList;
export { NodeList };