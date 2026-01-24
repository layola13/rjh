/**
 * Tree switcher icon renderer module
 * Renders appropriate icons based on tree node state (loading, leaf, expanded, etc.)
 */

import type { ReactElement, ReactNode } from 'react';

/**
 * Configuration options for the tree node switcher
 */
interface SwitcherOptions {
  /** Whether the node is a leaf node (has no children) */
  isLeaf: boolean;
  
  /** Whether the node is currently expanded */
  expanded: boolean;
  
  /** Whether the node is in loading state */
  loading?: boolean;
}

/**
 * Show line configuration for the tree
 */
interface ShowLineConfig {
  /** Whether to show icon for leaf nodes */
  showLeafIcon?: boolean;
}

/**
 * Renders the appropriate switcher icon for a tree node based on its state
 * 
 * @param prefixCls - CSS class prefix for styling (e.g., 'rc-tree')
 * @param switcherIcon - Custom switcher icon element or function
 * @param showLine - Whether to show connecting lines, or configuration object
 * @param options - Node state options (isLeaf, expanded, loading)
 * @returns React element representing the switcher icon
 */
declare function renderSwitcherIcon(
  prefixCls: string,
  switcherIcon: ReactNode,
  showLine: boolean | ShowLineConfig,
  options: SwitcherOptions
): ReactElement | null;

export default renderSwitcherIcon;