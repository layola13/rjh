/**
 * Tree component module
 * Provides a hierarchical tree structure for displaying and selecting items
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactNode, ReactElement } from 'react';
import type { TreeNodeProps } from 'rc-tree';

/**
 * Direction type for layout orientation
 */
export type DirectionType = 'ltr' | 'rtl';

/**
 * Switcher icon render function parameters
 */
export interface SwitcherIconProps {
  /** Whether the tree node is a leaf node */
  isLeaf: boolean;
  /** Whether the tree node is expanded */
  expanded: boolean;
  /** Whether the tree node is currently loading */
  loading?: boolean;
}

/**
 * Tree component properties
 */
export interface TreeProps {
  /** Custom class name prefix */
  prefixCls?: string;
  /** Additional CSS class name */
  className?: string;
  /** Whether to show icon before the node title */
  showIcon?: boolean;
  /** Whether to show connecting lines */
  showLine?: boolean | { showLeafIcon: boolean };
  /** Custom switcher icon */
  switcherIcon?: ReactNode | ((props: SwitcherIconProps) => ReactNode);
  /** Whether tree nodes fill the entire row */
  blockNode?: boolean;
  /** Child tree nodes */
  children?: ReactNode;
  /** Whether to show checkbox before the nodes */
  checkable?: boolean | ReactNode;
  /** Whether tree nodes can be selected */
  selectable?: boolean;
  /** Layout direction */
  direction?: DirectionType;
  /** Enable virtual scrolling */
  virtual?: boolean;
  /** Height of each tree item for virtual scrolling */
  itemHeight?: number;
  /** Custom drop indicator render function */
  dropIndicatorRender?: (props: {
    dropPosition: -1 | 0 | 1;
    dropLevelOffset: number;
    indent: number;
    prefixCls: string;
    direction: DirectionType;
  }) => ReactNode;
  /** Animation configuration */
  motion?: {
    motionName?: string;
    motionAppear?: boolean;
    motionEnter?: boolean;
    motionLeave?: boolean;
  };
}

/**
 * Tree component with forward ref support
 */
export interface TreeComponent extends ForwardRefExoticComponent<TreeProps & RefAttributes<HTMLDivElement>> {
  /** TreeNode sub-component for defining tree structure */
  TreeNode: typeof TreeNodeProps;
  /** DirectoryTree variant for file system style trees */
  DirectoryTree: ForwardRefExoticComponent<TreeProps & RefAttributes<HTMLDivElement>>;
  /** Default props for the Tree component */
  defaultProps: {
    checkable: boolean;
    selectable: boolean;
    showIcon: boolean;
    motion: {
      motionAppear: boolean;
      [key: string]: unknown;
    };
    blockNode: boolean;
  };
}

/**
 * Ant Design Tree Component
 * 
 * A tree component for displaying hierarchical data structures.
 * Supports features like checkboxes, custom icons, virtual scrolling, and drag-drop.
 * 
 * @example
 *