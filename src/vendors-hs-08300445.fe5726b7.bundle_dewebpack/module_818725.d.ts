/**
 * TreeSelect Component Type Definitions
 * A tree-structured selection component with checkbox support and lazy loading capabilities
 */

import type { ReactNode, Component, RefObject } from 'react';

/**
 * Strategy for displaying checked tree nodes
 */
export type ShowCheckedStrategy = 'SHOW_ALL' | 'SHOW_PARENT' | 'SHOW_CHILD';

/**
 * Constants for checked node display strategies
 */
export const SHOW_ALL: 'SHOW_ALL';
export const SHOW_PARENT: 'SHOW_PARENT';
export const SHOW_CHILD: 'SHOW_CHILD';

/**
 * Tree node data structure
 */
export interface TreeNodeData {
  /** Unique key for the node */
  key: string | number;
  /** Display value */
  value: string | number;
  /** Display label/title */
  label?: ReactNode;
  title?: ReactNode;
  /** Whether the node is disabled */
  disabled?: boolean;
  /** Whether the node is checkable */
  checkable?: boolean;
  /** Whether the node is selectable */
  selectable?: boolean;
  /** Child nodes */
  children?: TreeNodeData[];
  /** Custom icon */
  icon?: ReactNode;
  /** Whether the node is a leaf node */
  isLeaf?: boolean;
  [key: string]: any;
}

/**
 * Labeled value structure for controlled mode
 */
export interface LabeledValue {
  /** The actual value */
  value: string | number;
  /** Display label */
  label?: ReactNode;
  /** Half-checked state (for treeCheckStrictly mode) */
  halfChecked?: boolean;
}

/**
 * Value type - can be a simple value or labeled value
 */
export type TreeSelectValue = string | number | LabeledValue;

/**
 * Tree motion/animation configuration
 */
export interface TreeMotion {
  motionName?: string;
  motionAppear?: boolean;
  motionEnter?: boolean;
  motionLeave?: boolean;
  onMotionStart?: () => void;
  onMotionEnd?: () => void;
}

/**
 * Dropdown popup alignment configuration
 */
export interface AlignType {
  points?: string[];
  offset?: [number, number];
  overflow?: {
    adjustX?: boolean;
    adjustY?: boolean;
  };
}

/**
 * Change event additional info
 */
export interface ChangeEventExtra {
  /** Previous value before change */
  preValue: TreeSelectValue[];
  /** The value that triggered the change */
  triggerValue?: TreeSelectValue;
  /** Whether the node was selected (for single select) */
  selected?: boolean;
  /** Whether the node was checked (for checkable mode) */
  checked?: boolean;
  /** All checked nodes (for checkable mode) */
  allCheckedNodes?: TreeNodeData[];
}

/**
 * TreeSelect component props
 */
export interface TreeSelectProps<ValueType = TreeSelectValue> {
  /** CSS class prefix */
  prefixCls?: string;
  /** Custom CSS class name */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  
  /** Whether to support multiple selection */
  multiple?: boolean;
  /** Whether nodes are checkable (shows checkbox) */
  treeCheckable?: boolean;
  /** Whether parent and child nodes are strictly related when checkable */
  treeCheckStrictly?: boolean;
  /** Strategy for displaying checked nodes */
  showCheckedStrategy?: ShowCheckedStrategy;
  
  /** Current selected value(s) */
  value?: ValueType | ValueType[];
  /** Default selected value(s) */
  defaultValue?: ValueType | ValueType[];
  /** Whether value includes label (returns LabeledValue object) */
  labelInValue?: boolean;
  
  /** Tree data source */
  treeData?: TreeNodeData[];
  /** Child TreeNode components (alternative to treeData) */
  children?: ReactNode;
  /** Simple mode configuration for flat data structure */
  treeDataSimpleMode?: boolean | {
    id?: string;
    pId?: string;
    rootPId?: string | number | null;
  };
  
  /** Property name for node label display */
  treeNodeLabelProp?: string;
  /** Property name for filtering tree nodes */
  treeNodeFilterProp?: string;
  
  /** Keys of expanded nodes */
  treeExpandedKeys?: (string | number)[];
  /** Default expanded node keys */
  treeDefaultExpandedKeys?: (string | number)[];
  /** Whether to expand all nodes by default */
  treeDefaultExpandAll?: boolean;
  /** Keys of loaded nodes (for async loading) */
  treeLoadedKeys?: (string | number)[];
  
  /** Whether to show tree line */
  treeLine?: boolean;
  /** Whether to show tree icon */
  showTreeIcon?: boolean;
  /** Custom tree icon */
  treeIcon?: ReactNode | ((props: any) => ReactNode);
  /** Custom switcher icon */
  switcherIcon?: ReactNode | ((props: any) => ReactNode);
  
  /** Tree expand/collapse animation */
  treeMotion?: TreeMotion;
  
  /** Placeholder text for search input */
  searchPlaceholder?: string;
  /** Placeholder text when no value selected */
  placeholder?: string;
  
  /** Whether component is disabled */
  disabled?: boolean;
  /** Whether to show search input */
  showSearch?: boolean;
  /** Whether to show clear button */
  allowClear?: boolean;
  
  /** Custom filter function for tree nodes */
  filterTreeNode?: boolean | ((inputValue: string, treeNode: TreeNodeData) => boolean);
  /** Not found content when no matching nodes */
  notFoundContent?: ReactNode;
  
  /** Dropdown popup container */
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  /** Dropdown popup alignment */
  dropdownPopupAlign?: AlignType;
  /** Dropdown popup CSS class */
  dropdownClassName?: string;
  /** Dropdown popup styles */
  dropdownStyle?: React.CSSProperties;
  /** Whether dropdown matches select width */
  dropdownMatchSelectWidth?: boolean | number;
  
  /** Async data loading function */
  loadData?: (node: TreeNodeData) => Promise<void>;
  
  /** Callback when value changes */
  onChange?: (
    value: ValueType | ValueType[],
    labelList: ReactNode[],
    extra: ChangeEventExtra
  ) => void;
  /** Callback when node is selected */
  onSelect?: (value: TreeSelectValue, node: TreeNodeData) => void;
  /** Callback when node is deselected */
  onDeselect?: (value: TreeSelectValue, node: TreeNodeData) => void;
  /** Callback when tree nodes expand */
  onTreeExpand?: (expandedKeys: (string | number)[]) => void;
  /** Callback when tree node is loaded */
  onTreeLoad?: (loadedKeys: (string | number)[]) => void;
  /** Callback when dropdown visibility changes */
  onDropdownVisibleChange?: (open: boolean) => void;
  /** Callback when search input changes */
  onSearch?: (value: string) => void;
  /** Callback when input is blurred */
  onBlur?: () => void;
  /** Callback when input is focused */
  onFocus?: () => void;
}

/**
 * TreeSelect component instance methods
 */
export interface TreeSelectInstance {
  /** Focus the select input */
  focus(): void;
  /** Blur the select input */
  blur(): void;
  /** Scroll to specific position in dropdown */
  scrollTo(args: { key?: string | number; align?: 'top' | 'bottom' | 'auto'; offset?: number }): void;
}

/**
 * TreeNode component props
 */
export interface TreeNodeProps {
  /** Node key */
  key?: string | number;
  /** Node value */
  value?: string | number;
  /** Node display title */
  title?: ReactNode;
  /** Whether node is disabled */
  disabled?: boolean;
  /** Whether node is checkable */
  checkable?: boolean;
  /** Whether node is selectable */
  selectable?: boolean;
  /** Child nodes */
  children?: ReactNode;
  /** Custom icon */
  icon?: ReactNode;
  /** Whether node is a leaf */
  isLeaf?: boolean;
}

/**
 * TreeNode component
 */
export class TreeNode extends Component<TreeNodeProps> {}

/**
 * TreeSelect component class
 */
export default class TreeSelect extends Component<TreeSelectProps> {
  /** TreeNode component for JSX usage */
  static TreeNode: typeof TreeNode;
  /** Show all checked nodes strategy constant */
  static SHOW_ALL: typeof SHOW_ALL;
  /** Show parent checked nodes strategy constant */
  static SHOW_PARENT: typeof SHOW_PARENT;
  /** Show child checked nodes strategy constant */
  static SHOW_CHILD: typeof SHOW_CHILD;
  
  /** Reference to internal select component */
  selectRef: RefObject<TreeSelectInstance>;
  
  /** Focus the select input */
  focus(): void;
  /** Blur the select input */
  blur(): void;
}