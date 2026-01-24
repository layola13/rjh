/**
 * VTabsItems Component Type Definitions
 * 
 * A component that extends VWindow to manage tab panel content.
 * Handles the display of content associated with tab selections.
 * 
 * @module VTabsItems
 */

import { VueConstructor } from 'vue';
import VWindow from '../VWindow/VWindow';

/**
 * Props interface for VTabsItems component
 */
interface VTabsItemsProps {
  /**
   * Determines if at least one tab item must be selected at all times
   * @default false
   */
  mandatory?: boolean;
}

/**
 * Computed properties interface for VTabsItems component
 */
interface VTabsItemsComputed {
  /**
   * CSS classes for the component
   * Merges VWindow classes with 'v-tabs-items' class
   * @returns Object containing CSS class names as keys with boolean values
   */
  classes: Record<string, boolean>;

  /**
   * Determines if the component is in dark mode
   * Derived from the root component's dark mode state
   * @returns True if component should render in dark mode
   */
  isDark: boolean;
}

/**
 * Methods interface for VTabsItems component
 */
interface VTabsItemsMethods {
  /**
   * Gets the value/identifier for a tab item
   * Prioritizes the item's id property, falls back to BaseItemGroup's getValue
   * 
   * @param item - The tab item object
   * @param index - The index of the item in the collection
   * @returns The unique identifier for the item
   */
  getValue(item: TabItem, index: number): string | number;
}

/**
 * Tab item interface
 */
interface TabItem {
  /**
   * Optional unique identifier for the tab item
   */
  id?: string | number;
  
  /**
   * Additional properties allowed on tab items
   */
  [key: string]: unknown;
}

/**
 * VTabsItems Component
 * 
 * Container component for tab panel content. Extends VWindow to provide
 * sliding transitions between tab panels. Works in conjunction with VTabs
 * to create a complete tabbed interface.
 * 
 * @example
 *