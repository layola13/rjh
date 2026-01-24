/**
 * Tab node component for rendering individual tabs in a tab bar
 * Handles tab interactions including click, keyboard navigation, and close actions
 */

import type { ReactNode, CSSProperties, MouseEvent, KeyboardEvent, FocusEvent } from 'react';

/**
 * Position of the tab bar
 */
export type TabPosition = 'top' | 'bottom' | 'left' | 'right';

/**
 * Individual tab configuration
 */
export interface Tab {
  /** Unique identifier for the tab */
  key: string;
  /** Tab content/label */
  tab: ReactNode;
  /** Whether the tab is disabled */
  disabled?: boolean;
  /** Custom close icon for the tab */
  closeIcon?: ReactNode;
}

/**
 * Editable configuration for tabs
 */
export interface EditableConfig {
  /** Callback when edit action occurs (add/remove) */
  onEdit: (action: 'add' | 'remove', event: { key: string; event: MouseEvent | KeyboardEvent }) => void;
  /** Default remove icon */
  removeIcon?: ReactNode;
}

/**
 * Props for TabNode component
 */
export interface TabNodeProps {
  /** CSS class prefix for styling */
  prefixCls: string;
  /** Base ID for accessibility attributes */
  id?: string;
  /** Whether this tab is currently active */
  active: boolean;
  /** Right-to-left layout mode */
  rtl?: boolean;
  /** Tab configuration object */
  tab: Tab;
  /** Gap between tabs in pixels */
  tabBarGutter?: number;
  /** Position of the tab bar */
  tabPosition: TabPosition;
  /** Whether tabs are closable by default */
  closable?: boolean;
  /** Custom wrapper function for the tab element */
  renderWrapper?: (node: ReactNode) => ReactNode;
  /** Aria label for remove button */
  removeAriaLabel?: string;
  /** Editable configuration */
  editable?: EditableConfig;
  /** Click handler for tab */
  onClick: (event: MouseEvent) => void;
  /** Remove handler for tab */
  onRemove?: () => void;
  /** Focus handler for tab */
  onFocus?: (event: FocusEvent) => void;
}

/**
 * Tab node component
 * Renders a single tab with support for selection, keyboard navigation, and optional close button
 */
declare const TabNode: React.ForwardRefExoticComponent<TabNodeProps & React.RefAttributes<HTMLDivElement>>;

export default TabNode;