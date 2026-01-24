/**
 * Ant Design Menu Component Type Definitions
 * A versatile navigation menu that supports inline, vertical and horizontal modes
 */

import type { Component, ReactElement, ReactNode, CSSProperties } from 'react';
import type { ConfigConsumerProps } from './config-provider';
import type { SiderContextProps } from './layout/Sider';

/**
 * Menu theme variants
 */
export type MenuTheme = 'light' | 'dark';

/**
 * Menu display modes
 */
export type MenuMode = 'vertical' | 'horizontal' | 'inline';

/**
 * Motion animation configuration for menu transitions
 */
export interface MenuMotionConfig {
  /** Animation name for the motion */
  motionName?: string;
}

/**
 * Default motion configurations for different menu modes
 */
export interface DefaultMotions {
  /** Motion for horizontal mode */
  horizontal?: MenuMotionConfig;
  /** Motion for inline mode */
  inline?: MenuMotionConfig;
  /** Motion for other modes (vertical) */
  other?: MenuMotionConfig;
}

/**
 * Menu context value provided to child components
 */
export interface MenuContextValue {
  /** Whether the menu is in inline collapsed state */
  inlineCollapsed: boolean;
  /** Current theme of the menu */
  antdMenuTheme?: MenuTheme;
  /** Text direction for internationalization */
  direction?: 'ltr' | 'rtl';
}

/**
 * Core menu component properties
 */
export interface MenuProps {
  /** Custom CSS class name */
  className?: string;
  /** Custom prefix for CSS classes */
  prefixCls?: string;
  /** Visual theme of the menu */
  theme?: MenuTheme;
  /** Display mode of the menu */
  mode?: MenuMode;
  /** Whether the menu can receive focus */
  focusable?: boolean;
  /** 
   * Specifies the collapsed status when menu is inline mode
   * @deprecated Use `collapsed` on Sider component instead when menu is inside Sider
   */
  inlineCollapsed?: boolean;
  /**
   * Collapsed status from parent Sider component
   * @internal
   */
  siderCollapsed?: boolean;
  /** Custom expand icon for submenu */
  expandIcon?: ReactNode;
  /** Custom inline styles */
  style?: CSSProperties;
  /** Function to get the container for popup menus */
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  /** Text direction */
  direction?: 'ltr' | 'rtl';
  /** Default motion configurations */
  defaultMotions?: DefaultMotions;
  /** Currently selected menu keys */
  selectedKeys?: string[];
  /** Default selected menu keys */
  defaultSelectedKeys?: string[];
  /** Currently open submenu keys */
  openKeys?: string[];
  /** Default open submenu keys */
  defaultOpenKeys?: string[];
  /** Callback when menu item is clicked */
  onSelect?: (param: SelectParam) => void;
  /** Callback when menu item is deselected */
  onDeselect?: (param: SelectParam) => void;
  /** Callback when submenu is opened/closed */
  onOpenChange?: (openKeys: string[]) => void;
  /** Menu content */
  children?: ReactNode;
}

/**
 * Parameter passed to select/deselect callbacks
 */
export interface SelectParam {
  /** Selected menu item key */
  key: string;
  /** Selected menu item keys */
  keyPath: string[];
  /** The original DOM event */
  domEvent: MouseEvent;
  /** Selected menu items */
  selectedKeys: string[];
}

/**
 * Internal menu component that receives config from ConfigProvider
 * @internal
 */
declare class InternalMenu extends Component<MenuProps> {
  static defaultProps: {
    className: string;
    theme: MenuTheme;
    focusable: boolean;
  };

  /**
   * Get the effective inline collapsed state
   * Priority: siderCollapsed > inlineCollapsed
   */
  getInlineCollapsed(): boolean | undefined;

  /**
   * Render menu with configuration from ConfigProvider
   */
  renderMenu(config: ConfigConsumerProps): ReactElement;

  render(): ReactElement;
}

/**
 * Menu Divider component properties
 */
export interface MenuDividerProps {
  /** Custom CSS class name */
  className?: string;
  /** Custom inline styles */
  style?: CSSProperties;
  /** Whether the divider is dashed */
  dashed?: boolean;
}

/**
 * Menu Item component properties
 */
export interface MenuItemProps {
  /** Unique identifier of the menu item */
  key?: string;
  /** Custom CSS class name */
  className?: string;
  /** Custom inline styles */
  style?: CSSProperties;
  /** Whether the menu item is disabled */
  disabled?: boolean;
  /** Icon to display before the title */
  icon?: ReactNode;
  /** Item content */
  children?: ReactNode;
  /** Title of the menu item */
  title?: string;
  /** Callback when item is clicked */
  onClick?: (param: { key: string; domEvent: MouseEvent }) => void;
  /** Whether item is dangerous (use danger styling) */
  danger?: boolean;
}

/**
 * SubMenu component properties
 */
export interface SubMenuProps {
  /** Unique identifier of the submenu */
  key?: string;
  /** Custom CSS class name */
  className?: string;
  /** Custom inline styles */
  style?: CSSProperties;
  /** Title of the submenu */
  title?: ReactNode;
  /** Whether the submenu is disabled */
  disabled?: boolean;
  /** Icon to display before the title */
  icon?: ReactNode;
  /** Custom popup class name */
  popupClassName?: string;
  /** Custom popup offset */
  popupOffset?: [number, number];
  /** Callback when submenu is opened/closed */
  onTitleClick?: (param: { key: string; domEvent: MouseEvent }) => void;
  /** Submenu content */
  children?: ReactNode;
}

/**
 * Menu ItemGroup component properties
 */
export interface MenuItemGroupProps {
  /** Custom CSS class name */
  className?: string;
  /** Custom inline styles */
  style?: CSSProperties;
  /** Title of the item group */
  title?: ReactNode;
  /** Group content */
  children?: ReactNode;
}

/**
 * Main Menu component with Sider integration
 * Automatically receives collapsed state from parent Sider component
 */
declare class Menu extends Component<MenuProps> {
  /** Divider component for separating menu items */
  static Divider: Component<MenuDividerProps>;
  
  /** Menu item component */
  static Item: Component<MenuItemProps>;
  
  /** Submenu component for nested menus */
  static SubMenu: Component<SubMenuProps>;
  
  /** Item group component for grouping menu items */
  static ItemGroup: Component<MenuItemGroupProps>;

  render(): ReactElement;
}

export default Menu;