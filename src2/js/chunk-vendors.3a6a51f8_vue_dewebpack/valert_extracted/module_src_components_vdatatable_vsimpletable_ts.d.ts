/**
 * VSimpleTable Component Type Definitions
 * A simple table component with theme support and flexible layout options
 */

import Vue, { VNode, CreateElement } from 'vue';
import { VueConstructor } from 'vue/types/vue';

/**
 * Slots available for VSimpleTable component
 */
interface VSimpleTableSlots {
  /** Top slot for content above the table */
  top?: VNode[];
  /** Default slot for table content (thead, tbody, etc.) */
  default?: VNode[];
  /** Custom wrapper slot to override default table wrapper */
  wrapper?: VNode[];
  /** Bottom slot for content below the table */
  bottom?: VNode[];
}

/**
 * Props for VSimpleTable component
 */
interface VSimpleTableProps {
  /** Reduces the row height for a more compact table appearance */
  dense?: boolean;
  
  /** Fixes the header to the top when scrolling */
  fixedHeader?: boolean;
  
  /** Sets the table height. Enables vertical scrolling when content exceeds this value */
  height?: number | string;
  
  /** Applies dark theme styling when true */
  dark?: boolean;
  
  /** Applies light theme styling when true */
  light?: boolean;
}

/**
 * Computed properties for VSimpleTable
 */
interface VSimpleTableComputed {
  /** 
   * Generates CSS classes for the table based on props and theme
   * Includes classes for dense mode, fixed height/header, and slot presence
   */
  classes: Record<string, boolean>;
  
  /**
   * Theme classes inherited from Themeable mixin
   * Provides 'theme--dark' or 'theme--light' classes
   */
  themeClasses: Record<string, boolean>;
}

/**
 * Methods for VSimpleTable component
 */
interface VSimpleTableMethods {
  /**
   * Generates the table wrapper div element
   * Creates a scrollable container with optional height styling
   * @returns VNode representing the wrapper div containing the table
   */
  genWrapper(): VNode;
}

/**
 * VSimpleTable Component
 * A lightweight table component with theme support, density options, and fixed header capability
 */
interface VSimpleTable extends Vue {
  // Props
  dense: boolean;
  fixedHeader: boolean;
  height: number | string | undefined;
  
  // Computed
  readonly classes: Record<string, boolean>;
  readonly themeClasses: Record<string, boolean>;
  
  // Slots
  $slots: VSimpleTableSlots;
  
  // Methods
  genWrapper(): VNode;
  
  /**
   * Render function
   * @param createElement - Vue's createElement function
   * @returns VNode representing the complete table structure
   */
  render(createElement: CreateElement): VNode;
}

/**
 * VSimpleTable Component Constructor
 */
declare const VSimpleTable: VueConstructor<VSimpleTable>;

export default VSimpleTable;

export {
  VSimpleTable,
  VSimpleTableProps,
  VSimpleTableSlots,
  VSimpleTableComputed,
  VSimpleTableMethods
};