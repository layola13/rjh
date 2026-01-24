/**
 * Image search dropdown component module
 * Provides a hierarchical dropdown menu for image category selection
 */

import React from 'react';
import { Menu, MenuItem, SubMenu, SmartText, Icons } from './ui-components';

/**
 * Represents a category item in the hierarchy
 */
export interface CategoryItem {
  /** Unique category code identifier */
  code: string;
  /** Display name of the category */
  name: string;
  /** Optional nested subcategories */
  children?: CategoryItem[];
}

/**
 * Props for the ImageSearchDropdown component
 */
export interface ImageSearchDropdownProps {
  /** Display name for the dropdown trigger button */
  categoryName: string;
  /** Hierarchical list of all available categories */
  categoryList: CategoryItem[];
  /** Categories that should be disabled/hidden from selection */
  disabledCategories: CategoryItem[];
  /** Callback invoked when a category is clicked */
  onCategoryClick: (category: CategoryItem) => void;
  /** Currently selected category in the "More" dropdown (if any) */
  selectedMoreCategory?: CategoryItem | null;
}

/**
 * ImageSearchDropdown component
 * 
 * A dropdown menu component for navigating and selecting image search categories.
 * Supports nested subcategories, disabled items, and visual indication of selected state.
 * 
 * Features:
 * - Hierarchical category navigation
 * - Automatic submenu positioning adjustment based on viewport
 * - Hover trigger for submenus
 * - Click trigger for main menu
 * 
 * @param props - Component configuration props
 * @returns React element containing the dropdown menu
 */
export declare function ImageSearchDropdown(props: ImageSearchDropdownProps): React.ReactElement;

/**
 * ImageSearchDropdown component implementation
 * 
 * Renders a hierarchical dropdown menu for image category selection with the following behavior:
 * - Filters out disabled categories from the display
 * - Renders nested categories as submenus with hover triggers
 * - Highlights the currently selected category
 * - Automatically adjusts submenu position to stay within viewport bounds
 */
export declare const ImageSearchDropdown: React.FC<ImageSearchDropdownProps>;