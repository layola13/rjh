import { Component, ReactNode, ReactElement } from 'react';

/**
 * Props for MenuItemGroup component
 */
export interface MenuItemGroupProps {
  /** CSS class name for the menu item group */
  className?: string;
  
  /** Root prefix for CSS classes */
  rootPrefixCls?: string;
  
  /** Title of the menu item group */
  title?: ReactNode;
  
  /** Child menu items */
  children?: ReactNode;
  
  /** Whether the item group is disabled */
  disabled?: boolean;
  
  /** Index of the menu item */
  index?: number;
  
  /** Sub menu key identifier */
  subMenuKey?: string;
  
  /** Custom render function for menu items */
  renderMenuItem?: (item: ReactNode, index?: number, subMenuKey?: string) => ReactElement;
  
  /** Direction of the menu */
  direction?: 'ltr' | 'rtl' | 'horizontal' | 'vertical';
  
  /** Additional HTML attributes */
  [key: string]: any;
}

/**
 * MenuItemGroup component for grouping related menu items with a title
 * Used to organize menu items into logical sections within a menu or submenu
 */
export default class MenuItemGroup extends Component<MenuItemGroupProps> {
  /**
   * Flag indicating this is a MenuItemGroup component
   */
  static isMenuItemGroup: boolean;
  
  /**
   * Default props for MenuItemGroup
   */
  static defaultProps: Partial<MenuItemGroupProps>;
  
  /**
   * Renders an individual menu item within the group
   * @param item - The menu item to render
   * @returns Rendered menu item element
   */
  renderInnerMenuItem: (item: ReactNode) => ReactElement;
  
  /**
   * Renders the MenuItemGroup component
   */
  render(): ReactElement;
}