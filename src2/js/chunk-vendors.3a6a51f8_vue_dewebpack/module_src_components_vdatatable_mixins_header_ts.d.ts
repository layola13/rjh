/**
 * VDataTable Header Mixin
 * 
 * Provides functionality for data table header component including:
 * - Column header rendering
 * - Sort icon generation
 * - Select all checkbox functionality
 * - Header configuration and options management
 */

import Vue, { VNode } from 'vue';
import { VIcon } from '../../VIcon';
import { VSimpleCheckbox } from '../../VCheckbox/VSimpleCheckbox';
import { DirectiveOptions } from 'vue/types/options';

/**
 * Data table sort order and pagination options
 */
export interface DataTableOptions {
  /** Current page number (1-indexed) */
  page: number;
  /** Number of items to display per page */
  itemsPerPage: number;
  /** Array of column keys to sort by */
  sortBy: string[];
  /** Array of boolean values indicating descending sort for each sortBy column */
  sortDesc: boolean[];
  /** Array of column keys to group by */
  groupBy: string[];
  /** Array of boolean values indicating descending sort for each groupBy column */
  groupDesc: boolean[];
  /** Whether multiple column sorting is enabled */
  multiSort: boolean;
  /** Whether at least one column must always be sorted */
  mustSort: boolean;
}

/**
 * Data table header column definition
 */
export interface DataTableHeader {
  /** Display text for the header */
  text: string;
  /** Property name in data object */
  value: string;
  /** Column alignment (default: 'start') */
  align?: 'start' | 'center' | 'end';
  /** Whether column is sortable */
  sortable?: boolean;
  /** Whether column can be filtered */
  filterable?: boolean;
  /** Whether column can be grouped */
  groupable?: boolean;
  /** Whether column is hidden */
  divider?: boolean;
  /** CSS class to apply to column */
  class?: string | string[];
  /** Column width */
  width?: string | number;
  /** Custom filter function */
  filter?: (value: any, search: string, item: any) => boolean;
  /** Custom sort function */
  sort?: (a: any, b: any) => number;
}

/**
 * Scoped slot props for select checkbox
 */
export interface DataTableSelectProps {
  props: {
    /** Whether all items are selected */
    value: boolean;
    /** Whether some but not all items are selected (indeterminate state) */
    indeterminate: boolean;
  };
  on: {
    /** Callback when checkbox value changes */
    input: (value: boolean) => void;
  };
}

/**
 * VDataTable Header Mixin
 * 
 * Mixin component that provides header functionality for VDataTable,
 * including sorting, selection, and grouping capabilities.
 */
declare const VDataTableHeaderMixin: import('vue').ExtendedVue<
  Vue,
  {},
  {
    /**
     * Generates the "select all" checkbox component
     * 
     * Uses the `data-table-select` scoped slot if provided,
     * otherwise renders VSimpleCheckbox with appropriate props.
     * 
     * @returns VNode for the select all checkbox
     */
    genSelectAll(): VNode;

    /**
     * Generates the sort indicator icon
     * 
     * @returns VNode for the sort icon with size 18px
     */
    genSortIcon(): VNode;
  },
  {},
  {
    /** Array of header column definitions */
    headers: DataTableHeader[];
    /** Current table options (sorting, pagination, grouping) */
    options: DataTableOptions;
    /** Icon to display for sortable columns (defaults to '$sort') */
    sortIcon: string;
    /** Whether all items in the table are selected */
    everyItem: boolean;
    /** Whether some (but not all) items in the table are selected */
    someItems: boolean;
    /** Whether to show group by functionality in headers */
    showGroupBy: boolean;
    /** Whether only single item selection is allowed */
    singleSelect: boolean;
    /** Whether sorting is disabled for all columns */
    disableSort: boolean;
  }
>;

export default VDataTableHeaderMixin;