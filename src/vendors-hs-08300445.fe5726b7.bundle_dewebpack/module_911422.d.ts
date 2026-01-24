import React from 'react';
import { MenuMode, MenuTheme } from './types';

/**
 * Menu item size information
 */
interface MenuItemSize {
  width: number;
  height: number;
}

/**
 * DOMHighResTimeStamp component state
 */
interface OverflowMenuState {
  /** Index of the last visible menu item before overflow */
  lastVisibleIndex: number | undefined;
}

/**
 * Props for the OverflowMenu component
 */
interface OverflowMenuProps {
  /** CSS class prefix for styling */
  prefixCls: string;
  
  /** Menu nesting level (1 for root menu) */
  level: number;
  
  /** Menu display mode */
  mode: MenuMode;
  
  /** Custom indicator element for overflowed items */
  overflowedIndicator?: React.ReactNode;
  
  /** Menu theme variant */
  theme?: MenuTheme;
  
  /** Additional CSS classes */
  className: string;
  
  /** Child menu items */
  children: React.ReactElement[];
  
  /** Visibility state */
  visible?: boolean;
  
  /** HTML tag to render as container */
  tag: keyof JSX.IntrinsicElements;
  
  /** Additional HTML attributes */
  [key: string]: unknown;
}

/**
 * CSS class name constant for overflowed menu items
 */
const MENUITEM_OVERFLOWED_CLASS = 'menuitem-overflowed';

/**
 * OverflowMenu component handles horizontal menu overflow by collapsing
 * items that don't fit into a submenu indicator.
 * 
 * Features:
 * - Automatically detects overflow using ResizeObserver
 * - Moves overflowed items into a submenu
 * - Dynamically recalculates on window resize
 * - Watches for DOM mutations to handle dynamic content
 */
declare class OverflowMenu extends React.Component<OverflowMenuProps, OverflowMenuState> {
  static defaultProps: Partial<OverflowMenuProps>;

  /** ResizeObserver instance for detecting size changes */
  private resizeObserver: ResizeObserver | null;
  
  /** MutationObserver instance for detecting DOM changes */
  private mutationObserver: MutationObserver | null;
  
  /** Original total width of all menu items */
  private originalTotalWidth: number;
  
  /** Array of menu items that have overflowed */
  private overflowedItems: React.ReactElement[];
  
  /** Cached widths of individual menu items */
  private menuItemSizes: number[];
  
  /** Animation frame ID for debouncing resize */
  private cancelFrameId: number | null;
  
  /** Width of the overflow indicator submenu */
  private overflowedIndicatorWidth: number;
  
  /** Ref to the child container element */
  private childRef: React.RefObject<HTMLElement>;

  constructor(props: OverflowMenuProps);

  /**
   * Lifecycle: Set up observers after component mounts
   */
  componentDidMount(): void;

  /**
   * Lifecycle: Clean up observers before unmount
   */
  componentWillUnmount(): void;

  /**
   * Get all direct menu item DOM nodes (excluding overflow submenu)
   * @returns Array of menu item elements
   */
  private getMenuItemNodes(): HTMLElement[];

  /**
   * Create the overflow indicator submenu containing hidden items
   * @param eventKey - Event key for the submenu
   * @param overflowedItems - Items to place in the submenu
   * @param isPlaceholder - Whether this is a placeholder element
   * @returns Submenu element or null
   */
  private getOverflowedSubMenuItem(
    eventKey: string,
    overflowedItems: React.ReactElement[],
    isPlaceholder?: boolean
  ): React.ReactElement | null;

  /**
   * Measure menu item widths and trigger resize calculation
   */
  private setChildrenWidthAndResize(): void;

  /**
   * Calculate which items should be visible vs overflowed
   * based on available container width
   */
  private handleResize(): void;

  /**
   * Render children with overflow logic applied
   * @param children - Child menu items
   * @returns Processed children array
   */
  private renderChildren(children: React.ReactElement[]): React.ReactElement[];

  /**
   * Render the component
   */
  render(): React.ReactElement;
}

export default OverflowMenu;