/**
 * Ant Design TreeSelect Component Type Definitions
 * A tree select component that combines tree and select functionality
 */

import type { ReactNode, ForwardRefExoticComponent, RefAttributes } from 'react';
import type { TreeNode as InternalTreeNode } from './TreeNode';

/**
 * Size variants for the TreeSelect component
 */
export type SizeType = 'small' | 'middle' | 'large';

/**
 * Direction for internationalization support
 */
export type DirectionType = 'ltr' | 'rtl';

/**
 * Show checked strategy constants
 */
export enum ShowCheckedStrategy {
  /** Show all checked nodes */
  SHOW_ALL = 'SHOW_ALL',
  /** Show only parent nodes when all children are checked */
  SHOW_PARENT = 'SHOW_PARENT',
  /** Show only child nodes */
  SHOW_CHILD = 'SHOW_CHILD'
}

/**
 * Switcher icon render function parameters
 */
export interface SwitcherIconProps {
  /** Whether the tree node is a leaf node */
  isLeaf?: boolean;
  /** Whether the tree node is expanded */
  expanded?: boolean;
  /** Whether the tree node is loading */
  loading?: boolean;
}

/**
 * Tree line configuration
 */
export interface TreeLineConfig {
  /** Whether to show tree lines */
  showLeafIcon?: boolean;
}

/**
 * Core props for the TreeSelect component
 */
export interface TreeSelectProps<ValueType = any> {
  /** Custom class prefix for styling */
  prefixCls?: string;
  
  /** Size of the select component */
  size?: SizeType;
  
  /** Whether to show border */
  bordered?: boolean;
  
  /** Additional CSS class name */
  className?: string;
  
  /** Whether to show checkbox on tree nodes */
  treeCheckable?: boolean | ReactNode;
  
  /** Whether to support multiple selection */
  multiple?: boolean;
  
  /** Height of the dropdown list in pixels */
  listHeight?: number;
  
  /** Height of each list item in pixels */
  listItemHeight?: number;
  
  /** Content to show when no data is available */
  notFoundContent?: ReactNode;
  
  /** Custom switcher icon or render function */
  switcherIcon?: ReactNode | ((props: SwitcherIconProps) => ReactNode);
  
  /** Whether to show tree lines */
  treeLine?: boolean | TreeLineConfig;
  
  /** Parent container for the dropdown */
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  
  /** Additional class name for dropdown */
  dropdownClassName?: string;
  
  /** Whether to show tree node icons */
  treeIcon?: boolean;
  
  /** CSS transition name for dropdown animation */
  transitionName?: string;
  
  /** CSS transition name for selected items */
  choiceTransitionName?: string;
  
  /** Custom suffix icon */
  suffixIcon?: ReactNode;
  
  /** Custom remove icon for selected items */
  removeIcon?: ReactNode;
  
  /** Custom clear icon */
  clearIcon?: ReactNode;
  
  /** Virtual scroll configuration */
  virtual?: boolean;
  
  /** Whether dropdown width matches select width */
  dropdownMatchSelectWidth?: boolean | number;
  
  /** Selected value(s) */
  value?: ValueType;
  
  /** Default selected value(s) */
  defaultValue?: ValueType;
  
  /** Callback when selection changes */
  onChange?: (value: ValueType, label: ReactNode[], extra: any) => void;
  
  /** Tree data source */
  treeData?: any[];
  
  /** Children tree nodes */
  children?: ReactNode;
  
  /** Placeholder text */
  placeholder?: string;
  
  /** Whether to allow clearing selection */
  allowClear?: boolean;
  
  /** Whether component is disabled */
  disabled?: boolean;
  
  /** Strategy for rendering checked nodes */
  showCheckedStrategy?: ShowCheckedStrategy;
  
  /** Additional custom props */
  [key: string]: any;
}

/**
 * TreeSelect component type with static properties
 */
export interface TreeSelectComponent extends ForwardRefExoticComponent<TreeSelectProps & RefAttributes<any>> {
  /** TreeNode component for building tree structure */
  TreeNode: typeof InternalTreeNode;
  
  /** Show all checked nodes */
  SHOW_ALL: ShowCheckedStrategy.SHOW_ALL;
  
  /** Show only parent nodes when all children are checked */
  SHOW_PARENT: ShowCheckedStrategy.SHOW_PARENT;
  
  /** Show only child nodes */
  SHOW_CHILD: ShowCheckedStrategy.SHOW_CHILD;
}

/**
 * Ant Design TreeSelect Component
 * 
 * A tree select control that combines tree and select functionality,
 * allowing users to select values from a hierarchical tree structure.
 * 
 * @example
 *