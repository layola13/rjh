/**
 * VDataTable module exports
 * Provides data table components for displaying and manipulating tabular data
 */

import { VNode } from 'vue';
import { FunctionalComponentOptions } from 'vue/types/options';

/**
 * Simple functional component for table overflow wrapper
 * Wraps table content to handle horizontal scrolling
 */
export const VTableOverflow: FunctionalComponentOptions;

/**
 * Main data table component with sorting, filtering, and pagination
 * Supports server-side and client-side data operations
 */
export class VDataTable extends Vue {
  /**
   * Array of data items to display in the table
   */
  items: any[];
  
  /**
   * Column header definitions
   */
  headers: DataTableHeader[];
  
  /**
   * Enable/disable pagination
   */
  pagination?: boolean;
  
  /**
   * Items per page
   */
  itemsPerPage?: number;
  
  /**
   * Enable sorting
   */
  sortable?: boolean;
  
  /**
   * Custom sort function
   */
  customSort?: (items: any[], index: string[], isDesc: boolean[]) => any[];
}

/**
 * Header configuration interface
 */
export interface DataTableHeader {
  text: string;
  value: string;
  align?: 'start' | 'center' | 'end';
  sortable?: boolean;
  filterable?: boolean;
  divider?: boolean;
  class?: string | string[];
  width?: string | number;
}

/**
 * Data table header component
 * Renders the table header row with sorting controls
 */
export class VDataTableHeader extends Vue {
  /**
   * Header definitions
   */
  headers: DataTableHeader[];
  
  /**
   * Current sort configuration
   */
  sortBy?: string | string[];
  
  /**
   * Sort direction (ascending/descending)
   */
  sortDesc?: boolean | boolean[];
}

/**
 * Inline edit dialog for table cells
 * Provides quick editing functionality within table cells
 */
export class VEditDialog extends Vue {
  /**
   * Dialog open/close state
   */
  value?: boolean;
  
  /**
   * Enable return key to save
   */
  returnValue?: any;
  
  /**
   * Cancel callback
   */
  onCancel?: () => void;
  
  /**
   * Save callback
   */
  onSave?: () => void;
  
  /**
   * Large dialog variant
   */
  large?: boolean;
  
  /**
   * Persistent dialog (doesn't close on outside click)
   */
  persistent?: boolean;
}

/**
 * Simple table component without advanced features
 * Lightweight alternative for basic table layouts
 */
export class VSimpleTable extends Vue {
  /**
   * Enable dense spacing
   */
  dense?: boolean;
  
  /**
   * Fixed header that stays visible on scroll
   */
  fixedHeader?: boolean;
  
  /**
   * Table height (enables scrolling)
   */
  height?: string | number;
}

/**
 * Virtual scrolling table for large datasets
 * Renders only visible rows for performance optimization
 */
export class VVirtualTable extends Vue {
  /**
   * Data items array
   */
  items: any[];
  
  /**
   * Height of each item row
   */
  itemHeight?: number;
  
  /**
   * Total table height
   */
  height?: string | number;
  
  /**
   * Bench (number of extra items to render outside viewport)
   */
  bench?: number;
}

/**
 * Default export containing all subcomponents
 */
declare const VDataTableModule: {
  $_vuetify_subcomponents: {
    VDataTable: typeof VDataTable;
    VDataTableHeader: typeof VDataTableHeader;
    VEditDialog: typeof VEditDialog;
    VTableOverflow: FunctionalComponentOptions;
    VSimpleTable: typeof VSimpleTable;
    VVirtualTable: typeof VVirtualTable;
  };
};

export default VDataTableModule;