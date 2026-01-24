import type { ReactNode, ReactElement } from 'react';
import type { ItemType } from 'rc-menu';

/**
 * Menu item component props
 */
export interface MenuItemProps {
  /** Menu item title */
  title?: ReactNode;
  
  /** Icon element to display before the menu item text */
  icon?: ReactNode;
  
  /** Whether the menu item is in danger/destructive state */
  danger?: boolean;
  
  /** Nesting level of the menu item (1 for top-level items) */
  level?: number;
  
  /** Additional CSS class name */
  className?: string;
  
  /** Child elements */
  children?: ReactNode;
  
  /** Root CSS prefix for styling */
  rootPrefixCls?: string;
  
  /** Menu item key */
  key?: string | number;
  
  /** Whether the item is disabled */
  disabled?: boolean;
  
  /** Click handler */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

/**
 * Internal render context passed from Menu component
 */
interface MenuRenderContext {
  /** Whether the menu is in inline collapsed state */
  inlineCollapsed?: boolean;
  
  /** Text direction for RTL support */
  direction?: 'ltr' | 'rtl';
}

/**
 * Sider context for responsive sidebar behavior
 */
interface SiderContextProps {
  /** Whether the sider is collapsed */
  siderCollapsed?: boolean;
}

/**
 * Menu Item component
 * 
 * Renders a single item in an Ant Design Menu with support for:
 * - Icons
 * - Nested levels
 * - Inline collapsed state with tooltips
 * - Danger/destructive styling
 * - RTL text direction
 * 
 * @example
 *