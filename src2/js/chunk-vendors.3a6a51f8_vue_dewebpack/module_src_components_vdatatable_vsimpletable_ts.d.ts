import type { VNode, CreateElement } from 'vue';
import type { ThemeableInstance } from '../../mixins/themeable';

/**
 * Props for VSimpleTable component
 */
export interface VSimpleTableProps {
  /**
   * Reduces the height of rows to create a more compact table
   */
  dense?: boolean;
  
  /**
   * Makes the table header fixed (sticky) when scrolling
   */
  fixedHeader?: boolean;
  
  /**
   * Sets the height of the table wrapper
   * Can be a number (pixels) or a CSS string value
   */
  height?: number | string;
}

/**
 * Computed properties for VSimpleTable component
 */
export interface VSimpleTableComputed {
  /**
   * Dynamic CSS classes based on component state and theme
   */
  classes: Record<string, boolean>;
}

/**
 * Methods for VSimpleTable component
 */
export interface VSimpleTableMethods {
  /**
   * Generates the wrapper element containing the table
   * @returns VNode representing the table wrapper or custom slot content
   */
  genWrapper(): VNode;
}

/**
 * VSimpleTable component instance type
 * A simplified data table component with basic styling and theming support
 */
export interface VSimpleTable extends ThemeableInstance, VSimpleTableComputed, VSimpleTableMethods {
  readonly $props: VSimpleTableProps;
  
  /**
   * Component slots
   */
  readonly $slots: {
    /**
     * Default slot for table content (thead, tbody, etc.)
     */
    default?: VNode[];
    
    /**
     * Slot for content above the table
     */
    top?: VNode[];
    
    /**
     * Slot for content below the table
     */
    bottom?: VNode[];
    
    /**
     * Custom wrapper slot to replace default table wrapper
     */
    wrapper?: VNode[];
  };
  
  /**
   * Render function
   * @param createElement - Vue's createElement function
   * @returns VNode representing the complete component structure
   */
  render(createElement: CreateElement): VNode;
}

/**
 * VSimpleTable Vue component
 * A lightweight, themeable table component with optional fixed header and compact mode
 */
declare const VSimpleTable: {
  new (): VSimpleTable;
};

export default VSimpleTable;