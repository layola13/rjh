/**
 * VDataIterator Module
 * 
 * Provides data iteration and footer components for displaying paginated data.
 * Part of Vuetify's data display component suite.
 * 
 * @module VDataIterator
 * @see {@link https://vuetifyjs.com/components/data-iterators/}
 */

import type { Component } from 'vue';

/**
 * Props for VDataIterator component
 * Controls data iteration, pagination, sorting, and filtering behavior
 */
export interface VDataIteratorProps {
  /** Array of data items to iterate over */
  items?: unknown[];
  /** Current page number (1-indexed) */
  page?: number;
  /** Number of items to display per page */
  itemsPerPage?: number;
  /** Field name(s) to sort by */
  sortBy?: string | string[];
  /** Sort direction(s) - true for descending, false for ascending */
  sortDesc?: boolean | boolean[];
  /** Search query string for filtering items */
  search?: string;
  /** Custom filter function for items */
  customFilter?: (value: unknown, search: string | null, item: unknown) => boolean;
  /** Custom sort function */
  customSort?: (items: unknown[], sortBy: string[], sortDesc: boolean[]) => unknown[];
  /** Whether to show select checkboxes */
  showSelect?: boolean;
  /** Whether to show expand icons */
  showExpand?: boolean;
  /** Whether items can be expanded */
  singleExpand?: boolean;
  /** Array of expanded item keys */
  expanded?: unknown[];
  /** Loading state indicator */
  loading?: boolean;
  /** Text to display when loading */
  loadingText?: string;
  /** Text to display when no data is available */
  noDataText?: string;
  /** Text to display when no results match the search */
  noResultsText?: string;
  /** Whether to hide the default footer */
  hideDefaultFooter?: boolean;
  /** Options for footer configuration */
  footerProps?: Record<string, unknown>;
}

/**
 * VDataIterator Component
 * 
 * A versatile component for iterating over data with built-in support for:
 * - Pagination
 * - Sorting
 * - Filtering
 * - Item selection
 * - Expandable rows
 * 
 * @example
 *