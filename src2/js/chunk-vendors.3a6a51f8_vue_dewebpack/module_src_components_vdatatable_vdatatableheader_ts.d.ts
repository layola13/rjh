/**
 * VDataTable Header Component
 * 
 * A functional component that renders either a mobile or desktop version
 * of the data table header based on the mobile prop.
 */

import Vue, { VNode, VNodeData, CreateElement, FunctionalComponentOptions } from 'vue';
import { PropOptions } from 'vue/types/options';

/**
 * Header column definition
 */
export interface DataTableHeader {
  /** Column text/label */
  text: string;
  /** Property name in data object */
  value: string;
  /** Column alignment */
  align?: 'start' | 'center' | 'end';
  /** Whether column is sortable */
  sortable?: boolean;
  /** Whether column can be filtered */
  filterable?: boolean;
  /** Column width */
  width?: string | number;
  /** CSS class for column */
  class?: string | string[];
  /** Whether column is divider */
  divider?: boolean;
}

/**
 * Props for VDataTableHeader component
 */
export interface VDataTableHeaderProps {
  /** Array of header definitions */
  headers?: DataTableHeader[];
  /** Current sort column */
  sortBy?: string | string[];
  /** Sort direction (ascending/descending) */
  sortDesc?: boolean | boolean[];
  /** Whether to render mobile layout */
  mobile?: boolean;
  /** Whether to show select all checkbox */
  showSelect?: boolean;
  /** Whether to show group by controls */
  showGroupBy?: boolean;
  /** Whether checkboxes are indeterminate state */
  someItems?: boolean;
  /** Whether all items are selected */
  everyItem?: boolean;
  /** Disable sort functionality */
  disableSort?: boolean;
  /** Options for customization */
  options?: Record<string, any>;
}

/**
 * Scoped slot data for header rendering
 */
export interface HeaderSlotProps {
  /** Header configuration */
  header: DataTableHeader;
  /** Sort handler function */
  sort: (column: string) => void;
  /** Whether column is currently sorted */
  isSorted: boolean;
  /** Sort direction for current column */
  sortDesc: boolean;
}

/**
 * VDataTableHeader Component
 * 
 * Functional component that delegates rendering to either
 * VDataTableHeaderMobile or VDataTableHeaderDesktop based on
 * the mobile prop value.
 * 
 * @example
 *