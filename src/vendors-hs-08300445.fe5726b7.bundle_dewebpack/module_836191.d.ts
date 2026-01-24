/**
 * Tree component type definitions
 * A virtual scrolling tree component with drag & drop, checkbox, and expand/collapse support
 */

import type { ReactNode, CSSProperties, Key, MouseEvent, KeyboardEvent, DragEvent, FocusEvent } from 'react';
import type { DataNode, EventDataNode, BasicDataNode, FieldNames } from './interface';

/**
 * Position string in format like "0-0-1"
 */
type Position = string;

/**
 * Direction for tree layout
 */
type Direction = 'ltr' | 'rtl';

/**
 * Drop position relative to target node
 * -1: before, 0: inside, 1: after
 */
type DropPosition = -1 | 0 | 1;

/**
 * Expanded keys state (controlled or uncontrolled)
 */
type ExpandedKeys = Key[];

/**
 * Selected keys state
 */
type SelectedKeys = Key[];

/**
 * Checked keys state
 */
interface CheckedKeys {
  checked: Key[];
  halfChecked: Key[];
}

/**
 * Entity map for tree nodes, indexed by key
 */
interface KeyEntities {
  [key: string]: DataEntity;
}

/**
 * Internal data entity for tree node
 */
interface DataEntity {
  node: DataNode;
  index: number;
  pos: Position;
  key: Key;
  parent?: DataEntity;
  children?: DataEntity[];
}

/**
 * Flattened tree node for virtual scrolling
 */
interface FlattenNode {
  parent: FlattenNode | null;
  children: FlattenNode[];
  data: DataNode;
  pos: Position;
  index: number;
  /** Nesting level, starts from 0 */
  level: number;
}

/**
 * Motion configuration for expand/collapse animation
 */
interface MotionConfig {
  motionName?: string;
  motionAppear?: boolean;
  motionLeaveImmediately?: boolean;
  onAppearStart?: () => CSSProperties;
  onAppearActive?: () => CSSProperties;
  onAppearEnd?: () => CSSProperties;
  onLeaveStart?: () => CSSProperties;
  onLeaveActive?: () => CSSProperties;
  onLeaveEnd?: () => CSSProperties;
}

/**
 * Allow drop function for drag & drop validation
 */
interface AllowDropOptions {
  dragNode: EventDataNode;
  dropNode: EventDataNode;
  dropPosition: DropPosition;
}

type AllowDrop = (options: AllowDropOptions) => boolean;

/**
 * Event data for select event
 */
interface SelectEventData {
  event: 'select';
  selected: boolean;
  node: EventDataNode;
  selectedNodes: DataNode[];
  nativeEvent: MouseEvent;
}

/**
 * Event data for check event
 */
interface CheckEventData {
  event: 'check';
  node: EventDataNode;
  checked: boolean;
  checkedNodes: DataNode[];
  checkedNodesPositions?: Array<{ node: DataNode; pos: Position }>;
  halfCheckedKeys?: Key[];
  nativeEvent: MouseEvent;
}

/**
 * Event data for expand event
 */
interface ExpandEventData {
  node: EventDataNode;
  expanded: boolean;
  nativeEvent: MouseEvent;
}

/**
 * Event data for load event
 */
interface LoadEventData {
  event: 'load';
  node: EventDataNode;
}

/**
 * Event data for drag & drop events
 */
interface DragEventData {
  event: DragEvent;
  node: EventDataNode;
}

interface DropEventData {
  event: DragEvent;
  node: EventDataNode;
  dragNode: EventDataNode | null;
  dragNodesKeys: Key[];
  /** Whether dropped into gap between nodes */
  dropToGap: boolean;
  /** Absolute drop position */
  dropPosition: number;
}

interface MouseEventData {
  event: MouseEvent;
  node: EventDataNode;
}

/**
 * Scroll to options
 */
interface ScrollToOptions {
  key: Key;
  align?: 'top' | 'bottom' | 'auto';
  offset?: number;
}

/**
 * Tree component props
 */
export interface TreeProps {
  /** Class name prefix, default: 'rc-tree' */
  prefixCls?: string;
  /** Additional CSS class */
  className?: string;
  /** Inline styles */
  style?: CSSProperties;
  /** Tab index for keyboard navigation */
  tabIndex?: number;
  /** Tree data source */
  treeData?: DataNode[];
  /** Children nodes (deprecated, use treeData instead) */
  children?: ReactNode;
  /** Whether to show connecting lines */
  showLine?: boolean;
  /** Whether to show node icon */
  showIcon?: boolean;
  /** Custom icon render */
  icon?: ReactNode | ((props: any) => ReactNode);
  /** Custom switcher icon */
  switcherIcon?: ReactNode | ((props: any) => ReactNode);
  /** Whether nodes are selectable */
  selectable?: boolean;
  /** Whether supports multiple selection */
  multiple?: boolean;
  /** Whether to show checkbox */
  checkable?: boolean | ReactNode;
  /** Whether parent and children are not associated */
  checkStrictly?: boolean;
  /** Disable all tree nodes */
  disabled?: boolean;
  /** Whether nodes are draggable */
  draggable?: boolean;
  /** Default expanded parent nodes */
  defaultExpandParent?: boolean;
  /** Auto expand parent nodes when expandedKeys changes */
  autoExpandParent?: boolean;
  /** Default expand all nodes */
  defaultExpandAll?: boolean;
  /** Default expanded node keys */
  defaultExpandedKeys?: Key[];
  /** Controlled expanded keys */
  expandedKeys?: Key[];
  /** Default checked keys */
  defaultCheckedKeys?: Key[] | CheckedKeys;
  /** Controlled checked keys */
  checkedKeys?: Key[] | CheckedKeys;
  /** Default selected keys */
  defaultSelectedKeys?: Key[];
  /** Controlled selected keys */
  selectedKeys?: Key[];
  /** Loaded keys for async loading */
  loadedKeys?: Key[];
  /** Async data loading function */
  loadData?: (node: EventDataNode) => Promise<void>;
  /** Filter tree nodes */
  filterTreeNode?: (node: EventDataNode) => boolean;
  /** Custom title render */
  titleRender?: (node: DataNode) => ReactNode;
  /** Custom drop indicator render */
  dropIndicatorRender?: (props: {
    dropPosition: DropPosition;
    dropLevelOffset: number;
    indent: number;
    prefixCls: string;
    direction: Direction;
  }) => ReactNode;
  /** Allow drop validation */
  allowDrop?: AllowDrop;
  /** Layout direction */
  direction?: Direction;
  /** Motion config for animation */
  motion?: MotionConfig;
  /** Virtual scrolling height */
  height?: number;
  /** Item height for virtual scrolling */
  itemHeight?: number;
  /** Enable virtual scrolling */
  virtual?: boolean;
  /** Whether tree is focusable */
  focusable?: boolean;
  /** Active key (keyboard navigation) */
  activeKey?: Key;

  // Event handlers
  /** Expand event handler */
  onExpand?: (expandedKeys: Key[], info: ExpandEventData) => void;
  /** Select event handler */
  onSelect?: (selectedKeys: Key[], info: SelectEventData) => void;
  /** Check event handler */
  onCheck?: (checked: Key[] | CheckedKeys, info: CheckEventData) => void;
  /** Load event handler */
  onLoad?: (loadedKeys: Key[], info: LoadEventData) => void;
  /** Click event handler */
  onClick?: (event: MouseEvent, node: EventDataNode) => void;
  /** Double click event handler */
  onDoubleClick?: (event: MouseEvent, node: EventDataNode) => void;
  /** Right click event handler */
  onRightClick?: (info: MouseEventData) => void;
  /** Drag start event handler */
  onDragStart?: (info: DragEventData) => void;
  /** Drag enter event handler */
  onDragEnter?: (info: DragEventData & { expandedKeys: Key[] }) => void;
  /** Drag over event handler */
  onDragOver?: (info: DragEventData) => void;
  /** Drag leave event handler */
  onDragLeave?: (info: DragEventData) => void;
  /** Drag end event handler */
  onDragEnd?: (info: DragEventData) => void;
  /** Drop event handler */
  onDrop?: (info: DropEventData) => void;
  /** Mouse enter event handler */
  onMouseEnter?: (info: MouseEventData) => void;
  /** Mouse leave event handler */
  onMouseLeave?: (info: MouseEventData) => void;
  /** Context menu event handler */
  onContextMenu?: (event: MouseEvent) => void;
  /** Focus event handler */
  onFocus?: (event: FocusEvent) => void;
  /** Blur event handler */
  onBlur?: (event: FocusEvent) => void;
  /** Keyboard event handler */
  onKeyDown?: (event: KeyboardEvent) => void;
  /** Active key change handler */
  onActiveChange?: (activeKey: Key | null) => void;
}

/**
 * Tree component state
 */
export interface TreeState {
  /** Key to entity map */
  keyEntities: KeyEntities;
  /** Indent width in pixels */
  indent: number | null;
  /** Selected node keys */
  selectedKeys: Key[];
  /** Checked node keys */
  checkedKeys: Key[];
  /** Half checked node keys (for checkbox cascade) */
  halfCheckedKeys: Key[];
  /** Loaded node keys (for async loading) */
  loadedKeys: Key[];
  /** Loading node keys */
  loadingKeys: Key[];
  /** Expanded node keys */
  expandedKeys: Key[];
  /** Whether currently dragging */
  dragging: boolean;
  /** Keys of dragging node's children */
  dragChildrenKeys: Key[];
  /** Drop target node key */
  dropTargetKey: Key | null;
  /** Drop position */
  dropPosition: DropPosition | null;
  /** Drop container key */
  dropContainerKey: Key | null;
  /** Drop level offset */
  dropLevelOffset: number | null;
  /** Drop target position string */
  dropTargetPos: Position | null;
  /** Whether drop is allowed */
  dropAllowed: boolean;
  /** Drag over node key */
  dragOverNodeKey: Key | null;
  /** Tree data source */
  treeData: DataNode[];
  /** Flattened nodes for virtual scrolling */
  flattenNodes: FlattenNode[];
  /** Whether tree is focused */
  focused: boolean;
  /** Active node key (keyboard navigation) */
  activeKey: Key | null;
  /** Whether list is changing (for animation) */
  listChanging: boolean;
  /** Previous props for getDerivedStateFromProps */
  prevProps: TreeProps | null;
}

/**
 * Tree component ref methods
 */
export interface TreeRef {
  /** Scroll to specific node */
  scrollTo: (options: ScrollToOptions) => void;
}

/**
 * Default Tree component
 */
export default class Tree extends React.Component<TreeProps, TreeState> {
  static defaultProps: Partial<TreeProps>;
  static TreeNode: any;
  static getDerivedStateFromProps(props: TreeProps, state: TreeState): Partial<TreeState> | null;
  
  /** Scroll to specific node */
  scrollTo(options: ScrollToOptions): void;
}