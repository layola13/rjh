/**
 * Tab navigation operations component - handles dropdown menu for overflow tabs and edit operations
 * @module TabOperations
 */

import type { ForwardRefRenderFunction, CSSProperties, ReactNode } from 'react';

/**
 * Keyboard key codes for navigation
 */
export interface KeyCode {
  /** Up arrow key */
  UP: number;
  /** Down arrow key */
  DOWN: number;
  /** Escape key */
  ESC: number;
  /** Space key */
  SPACE: number;
  /** Enter key */
  ENTER: number;
}

/**
 * Tab item data structure
 */
export interface TabItem {
  /** Unique identifier for the tab */
  key: string;
  /** Tab label content */
  tab: ReactNode;
  /** Whether the tab is disabled */
  disabled?: boolean;
}

/**
 * Locale configuration for dropdown accessibility
 */
export interface TabLocale {
  /** ARIA label for the dropdown menu */
  dropdownAriaLabel?: string;
}

/**
 * Editable tab configuration
 */
export interface EditableConfig {
  /** Callback when add button is clicked */
  onAdd?: () => void;
  /** Callback when remove button is clicked */
  onRemove?: (key: string) => void;
  /** Whether showing add button */
  showAdd?: boolean;
  /** Custom add icon */
  addIcon?: ReactNode;
  /** Custom remove icon */
  removeIcon?: ReactNode;
}

/**
 * Props for the TabOperations component
 */
export interface TabOperationsProps {
  /** CSS class prefix for styling */
  prefixCls: string;
  /** Unique identifier for the tab group */
  id: string;
  /** Array of tab items to display in dropdown */
  tabs: TabItem[];
  /** Locale configuration for internationalization */
  locale?: TabLocale;
  /** Whether in mobile mode */
  mobile?: boolean;
  /** Icon or text for the "more" dropdown button */
  moreIcon?: ReactNode;
  /** Transition animation name for dropdown */
  moreTransitionName?: string;
  /** Custom inline styles */
  style?: CSSProperties;
  /** Additional CSS class names */
  className?: string;
  /** Editable configuration for add/remove operations */
  editable?: EditableConfig;
  /** Gutter spacing between tab bar items */
  tabBarGutter?: number;
  /** Whether in RTL (right-to-left) mode */
  rtl?: boolean;
  /** Callback when a tab is clicked */
  onTabClick: (key: string, event: React.MouseEvent | React.KeyboardEvent) => void;
}

/**
 * TabOperations component - renders overflow menu and edit controls for tabs
 * 
 * Provides:
 * - Dropdown menu for tabs that don't fit in the visible area
 * - Keyboard navigation support (arrow keys, enter, escape)
 * - Add/remove tab controls when editable
 * - RTL layout support
 * - Mobile responsive behavior
 * 
 * @param props - Component properties
 * @param ref - Forwarded ref to the container element
 */
declare const TabOperations: ForwardRefRenderFunction<HTMLDivElement, TabOperationsProps>;

export default TabOperations;