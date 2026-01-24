/**
 * Menu item type definitions
 * Defines the available types for menu items in the UI component system
 */

/**
 * Available menu item types
 * @readonly
 * @enum {string}
 */
export type MenuItemType = 'folder' | 'button' | 'divider' | 'searchbox';

/**
 * Menu item type constants
 * Provides immutable string constants for each menu item type
 */
export interface MenuItemTypes {
  /** Represents a folder/submenu item that can contain nested items */
  readonly folder: 'folder';
  
  /** Represents a clickable button item that triggers an action */
  readonly button: 'button';
  
  /** Represents a visual separator between menu sections */
  readonly divider: 'divider';
  
  /** Represents a search input field within the menu */
  readonly searchbox: 'searchbox';
}

/**
 * Frozen object containing all menu item type constants
 * This object is immutable and cannot be modified at runtime
 */
declare const menuItemTypes: Readonly<MenuItemTypes>;

export default menuItemTypes;