/**
 * DirectoryTree Component Type Definitions
 * A specialized Tree component for displaying directory structures with file/folder icons
 */

import type { ReactNode, Key, MouseEvent, CSSProperties, ForwardRefExoticComponent, RefAttributes } from 'react';
import type { TreeProps, AntTreeNodeProps, EventDataNode } from './Tree';

/**
 * Expand action trigger type
 */
export type ExpandAction = 'click' | 'doubleClick';

/**
 * Selected event info extending base tree node event
 */
export interface DirectoryTreeSelectEventInfo<T = any> extends AntTreeNodeProps {
  /** The event object */
  event: 'select';
  /** Whether the node is selected */
  selected: boolean;
  /** The selected node */
  node: EventDataNode<T>;
  /** All selected nodes */
  selectedNodes: EventDataNode<T>[];
  /** Native mouse event */
  nativeEvent: MouseEvent;
}

/**
 * Click event info for directory tree nodes
 */
export interface DirectoryTreeClickEventInfo<T = any> {
  /** The event object */
  event: MouseEvent;
  /** The clicked node */
  node: EventDataNode<T>;
}

/**
 * Expand event info for directory tree nodes
 */
export interface DirectoryTreeExpandEventInfo<T = any> {
  /** The expanded node */
  node: EventDataNode<T>;
  /** Whether the node is expanded */
  expanded: boolean;
  /** Native mouse event */
  nativeEvent: MouseEvent;
}

/**
 * DirectoryTree component props
 * Extends base Tree component with directory-specific features
 */
export interface DirectoryTreeProps<T = any> extends Omit<TreeProps<T>, 'onSelect' | 'onClick' | 'onDoubleClick'> {
  /** 
   * Custom CSS class name 
   */
  className?: string;
  
  /** 
   * Custom prefix for CSS classes 
   * @default 'ant-tree'
   */
  prefixCls?: string;
  
  /** 
   * Tree data in array format 
   */
  treeData?: T[];
  
  /** 
   * Children nodes (alternative to treeData) 
   */
  children?: ReactNode;
  
  /** 
   * Whether to expand all nodes by default 
   * @default false
   */
  defaultExpandAll?: boolean;
  
  /** 
   * Whether to expand parent nodes by default 
   * @default true
   */
  defaultExpandParent?: boolean;
  
  /** 
   * Default expanded node keys 
   */
  defaultExpandedKeys?: Key[];
  
  /** 
   * Controlled expanded node keys 
   */
  expandedKeys?: Key[];
  
  /** 
   * Default selected node keys 
   */
  defaultSelectedKeys?: Key[];
  
  /** 
   * Controlled selected node keys 
   */
  selectedKeys?: Key[];
  
  /** 
   * Whether to support multiple selection 
   * @default false
   */
  multiple?: boolean;
  
  /** 
   * Action to trigger expansion 
   * @default 'click'
   */
  expandAction?: ExpandAction;
  
  /** 
   * Whether to show icon 
   * @default true
   */
  showIcon?: boolean;
  
  /**
   * Callback when a tree node is selected
   * @param selectedKeys - Array of selected node keys
   * @param info - Selection event information
   */
  onSelect?: (selectedKeys: Key[], info: DirectoryTreeSelectEventInfo<T>) => void;
  
  /**
   * Callback when a tree node is clicked
   * @param event - Mouse event
   * @param node - Clicked node information
   */
  onClick?: (event: MouseEvent, node: DirectoryTreeClickEventInfo<T>) => void;
  
  /**
   * Callback when a tree node is double-clicked
   * @param event - Mouse event
   * @param node - Double-clicked node information
   */
  onDoubleClick?: (event: MouseEvent, node: DirectoryTreeClickEventInfo<T>) => void;
  
  /**
   * Callback when a tree node is expanded/collapsed
   * @param expandedKeys - Array of expanded node keys
   * @param info - Expand event information
   */
  onExpand?: (expandedKeys: Key[], info: DirectoryTreeExpandEventInfo<T>) => void;
  
  /** 
   * Custom inline styles 
   */
  style?: CSSProperties;
}

/**
 * DirectoryTree component interface
 * A Tree component optimized for directory/file structure display with built-in icons and interactions
 */
export interface DirectoryTreeComponent extends ForwardRefExoticComponent<DirectoryTreeProps & RefAttributes<any>> {
  /** Component display name for React DevTools */
  displayName: string;
  /** Default props for the component */
  defaultProps: Partial<DirectoryTreeProps>;
}

/**
 * DirectoryTree component
 * Displays hierarchical file/folder structures with expand/collapse functionality
 */
declare const DirectoryTree: DirectoryTreeComponent;

export default DirectoryTree;