/**
 * VDataTable module exports
 * Provides data table components and utilities for Vuetify
 */

import { VNode } from 'vue';
import { FunctionalComponentOptions } from 'vue/types/options';

/**
 * Functional component for table overflow wrapper
 * Creates a simple wrapper div with class "v-table__overflow"
 */
export const VTableOverflow: FunctionalComponentOptions;

/**
 * Main data table component
 * Provides a full-featured data table with sorting, filtering, pagination, and selection
 */
export class VDataTable extends Vue {
  /**
   * Array of data items to display in the table
   */
  items: any[];
  
  /**
   * Array of header configurations defining table columns
   */
  headers: DataTableHeader[];
  
  /**
   * Current page number (1-indexed)
   */
  page: number;
  
  /**
   * Number of items per page
   */
  itemsPerPage: number;
  
  /**
   * Array of sort-by configurations
   */
  sortBy: string | string[];
  
  /**
   * Array indicating sort direction (true = descending, false = ascending)
   */
  sortDesc: boolean | boolean[];
  
  /**
   * Loading state indicator
   */
  loading: boolean;
  
  /**
   * Search query string for filtering
   */
  search?: string;
}

/**
 * Header configuration for data table columns
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
  filter?: (value: any, search: string, item: any) => boolean;
  sort?: (a: any, b: any) => number;
}

/**
 * Data table header component
 * Renders the header row with sorting controls
 */
export class VDataTableHeader extends Vue {
  /**
   * Array of header configurations
   */
  headers: DataTableHeader[];
  
  /**
   * Current sort-by value
   */
  sortBy?: string | string[];
  
  /**
   * Current sort direction
   */
  sortDesc?: boolean | boolean[];
}

/**
 * Inline edit dialog component
 * Provides an editable dialog overlay for table cells
 */
export class VEditDialog extends Vue {
  /**
   * Return value when dialog is saved
   */
  returnValue: any;
  
  /**
   * Whether to cancel on click outside
   */
  persistent: boolean;
  
  /**
   * Large dialog variant
   */
  large: boolean;
  
  /**
   * Transition mode
   */
  transition: string;
  
  /**
   * Save handler callback
   */
  save(): void;
  
  /**
   * Cancel handler callback
   */
  cancel(): void;
  
  /**
   * Open the edit dialog
   */
  open(): void;
  
  /**
   * Close the edit dialog
   */
  close(): void;
}

/**
 * Simple table component
 * Provides a basic styled table without advanced features
 */
export class VSimpleTable extends Vue {
  /**
   * Dense table variant with reduced padding
   */
  dense: boolean;
  
  /**
   * Fixed header that stays visible on scroll
   */
  fixedHeader: boolean;
  
  /**
   * Table height (enables scrolling when set)
   */
  height?: string | number;
}

/**
 * Virtual scrolling table component
 * Optimized for rendering large datasets using virtual scrolling
 */
export class VVirtualTable extends Vue {
  /**
   * Array of data items
   */
  items: any[];
  
  /**
   * Height of each item row in pixels
   */
  itemHeight: number;
  
  /**
   * Total table height
   */
  height?: string | number;
  
  /**
   * Number of items to render in the buffer
   */
  bench: number;
}

/**
 * Default export containing all sub-components
 * Used for Vuetify plugin registration
 */
export interface VDataTableModule {
  $_vuetify_subcomponents: {
    VDataTable: typeof VDataTable;
    VDataTableHeader: typeof VDataTableHeader;
    VEditDialog: typeof VEditDialog;
    VTableOverflow: FunctionalComponentOptions;
    VSimpleTable: typeof VSimpleTable;
    VVirtualTable: typeof VVirtualTable;
  };
}

declare const VDataTableModuleDefault: VDataTableModule;
export default VDataTableModuleDefault;