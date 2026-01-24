/**
 * Menu utility functions and constants
 * Provides helper methods for menu item operations, styling, and device detection
 */

/**
 * Generates a unique key for a child menu item
 * @param child - The child element
 * @param prefix - Optional prefix for the key
 * @param index - Index of the child in the collection
 * @returns Generated key string
 */
export function getKeyFromChildrenIndex(
  child: { key?: string | number },
  prefix?: string,
  index: number
): string;

/**
 * Generates a menu ID from a submenu event key
 * @param eventKey - The event key of the submenu
 * @returns Generated menu ID string
 */
export function getMenuIdFromSubMenuEventKey(eventKey: string): string;

/**
 * Checks if the current device is a mobile device
 * @returns True if mobile device detected
 */
export function isMobileDevice(): boolean;

/**
 * Gets the width of an element
 * @param element - The DOM element to measure
 * @param includeMargin - Whether to include margins in the width calculation
 * @returns Width in pixels
 */
export function getWidth(element: HTMLElement, includeMargin?: boolean): number;

/**
 * Iterates over menu items, handling menu item groups
 * @param children - React children elements
 * @param callback - Function to call for each menu item
 */
export function loopMenuItem(
  children: React.ReactNode,
  callback: (child: React.ReactElement, index: number) => void
): void;

/**
 * Recursively loops through menu items to find matching keys
 * @param children - React children elements
 * @param keys - Array of keys to search for
 * @param result - Result object that gets mutated with find status
 */
export function loopMenuItemRecursively(
  children: React.ReactNode,
  keys: string[],
  result: { find: boolean }
): void;

/**
 * Empty function placeholder
 */
export function noop(): void;

/**
 * Sets a CSS style property on an element
 * @param element - The DOM element
 * @param property - CSS property name
 * @param value - CSS property value
 */
export function setStyle(
  element: HTMLElement | null | undefined,
  property: string,
  value: string | number
): void;

/**
 * All possible props that can be passed to menu components
 */
export const menuAllProps: readonly [
  "defaultSelectedKeys",
  "selectedKeys",
  "defaultOpenKeys",
  "openKeys",
  "mode",
  "getPopupContainer",
  "onSelect",
  "onDeselect",
  "onDestroy",
  "openTransitionName",
  "openAnimation",
  "subMenuOpenDelay",
  "subMenuCloseDelay",
  "forceSubMenuRender",
  "triggerSubMenuAction",
  "level",
  "selectable",
  "multiple",
  "onOpenChange",
  "visible",
  "focusable",
  "defaultActiveFirst",
  "prefixCls",
  "inlineIndent",
  "parentMenu",
  "title",
  "rootPrefixCls",
  "eventKey",
  "active",
  "onItemHover",
  "onTitleMouseEnter",
  "onTitleMouseLeave",
  "onTitleClick",
  "popupAlign",
  "popupOffset",
  "isOpen",
  "renderMenuItem",
  "manualRef",
  "subMenuKey",
  "disabled",
  "index",
  "isSelected",
  "store",
  "activeKey",
  "builtinPlacements",
  "overflowedIndicator",
  "motion",
  "attribute",
  "value",
  "popupClassName",
  "inlineCollapsed",
  "menu",
  "theme",
  "itemIcon",
  "expandIcon"
];

/**
 * Type for all menu prop keys
 */
export type MenuPropKey = typeof menuAllProps[number];