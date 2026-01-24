/**
 * Motion Tree Node Component
 * 
 * A tree node component with motion animation support for expand/collapse effects.
 * Handles both static tree nodes and animated motion states during tree operations.
 */

import type { CSSProperties, ForwardRefExoticComponent, RefAttributes } from 'react';
import type { CSSMotionProps } from 'rc-motion';

/**
 * Motion node data structure representing a single node in the animation sequence
 */
interface MotionNodeData {
  /** Unique key identifier for the tree node */
  key: string | number;
  /** Node display data */
  data: TreeNodeData;
  /** Whether this is the starting node in the motion sequence */
  isStart: boolean;
  /** Whether this is the ending node in the motion sequence */
  isEnd: boolean;
  /** Child nodes (excluded during motion rendering) */
  children?: MotionNodeData[];
  /** Additional arbitrary properties */
  [key: string]: unknown;
}

/**
 * Tree node data structure
 */
interface TreeNodeData {
  /** Node unique identifier */
  key: string | number;
  /** Node title/label */
  title?: React.ReactNode;
  /** Whether node is disabled */
  disabled?: boolean;
  /** Whether node is checkable */
  checkable?: boolean;
  /** Child nodes */
  children?: TreeNodeData[];
  /** Additional custom properties */
  [key: string]: unknown;
}

/**
 * Required props passed down from tree component to node
 */
interface TreeNodeRequiredProps {
  /** Expanded keys set */
  expandedKeys?: Set<string | number>;
  /** Selected keys set */
  selectedKeys?: Set<string | number>;
  /** Loaded keys for async loading */
  loadedKeys?: Set<string | number>;
  /** Loading keys during async operations */
  loadingKeys?: Set<string | number>;
  /** Checked keys for checkable tree */
  checkedKeys?: Set<string | number>;
  /** Half-checked keys (indeterminate state) */
  halfCheckedKeys?: Set<string | number>;
  /** Event handlers and other tree-level props */
  [key: string]: unknown;
}

/**
 * Motion type indicating the animation direction
 */
type MotionType = 'show' | 'hide';

/**
 * Props for MotionTreeNode component
 */
interface MotionTreeNodeProps {
  /** CSS class name for the node */
  className?: string;
  /** Inline styles for the node */
  style?: CSSProperties;
  /** Motion animation configuration from rc-motion */
  motion?: CSSMotionProps;
  /** Array of nodes to animate during expand/collapse */
  motionNodes?: MotionNodeData[];
  /** Type of motion animation (show for expand, hide for collapse) */
  motionType?: MotionType;
  /** Callback fired when motion animation starts */
  onMotionStart?: () => void;
  /** Callback fired when motion animation ends */
  onMotionEnd?: () => void;
  /** Whether the node is in active state */
  active?: boolean;
  /** Required props from parent tree component */
  treeNodeRequiredProps?: TreeNodeRequiredProps;
  /** Tree node data */
  data?: TreeNodeData;
  /** Node key */
  nodeKey?: string | number;
  /** Whether node is expanded */
  expanded?: boolean;
  /** Whether node is selected */
  selected?: boolean;
  /** Whether node is checked */
  checked?: boolean;
  /** Whether node is loading */
  loading?: boolean;
  /** Event handlers */
  onExpand?: (expanded: boolean, nodeData: TreeNodeData) => void;
  onSelect?: (selected: boolean, nodeData: TreeNodeData) => void;
  onCheck?: (checked: boolean, nodeData: TreeNodeData) => void;
  /** Additional arbitrary props */
  [key: string]: unknown;
}

/**
 * MotionTreeNode Component
 * 
 * A tree node with animation support for smooth expand/collapse transitions.
 * 
 * @remarks
 * This component handles two rendering modes:
 * - Motion mode: Renders multiple nodes with animation wrapper during expand/collapse
 * - Static mode: Renders a single tree node without animation
 * 
 * @example
 *