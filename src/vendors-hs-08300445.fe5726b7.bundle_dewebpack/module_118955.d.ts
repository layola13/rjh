/**
 * Menu Divider Component
 * 
 * A divider component used to separate menu items visually.
 * This component renders a list item (`<li>`) with divider styling.
 */

import type { CSSProperties, ReactElement } from 'react';

/**
 * Props for the MenuDivider component
 */
export interface MenuDividerProps {
  /**
   * Additional CSS class name to apply to the divider
   * @default ""
   */
  className?: string;

  /**
   * The root prefix class name for styling
   * Used to construct the full divider class name
   */
  rootPrefixCls?: string;

  /**
   * Inline styles to apply to the divider element
   * @default {}
   */
  style?: CSSProperties;

  /**
   * Whether the divider is disabled
   * @default true
   */
  disabled?: boolean;
}

/**
 * MenuDivider Component
 * 
 * Renders a visual separator between menu items.
 * The component applies classes in the format: `{className} {rootPrefixCls}-item-divider`
 * 
 * @param props - Component properties
 * @returns A React element representing the menu divider
 * 
 * @example
 *