/**
 * VData component type definitions
 * Provides data management functionality for sorting, filtering, grouping, and pagination
 */

import { VueConstructor } from 'vue';

/**
 * Internal options state for data management
 */
export interface VDataOptions {
  /** Current page number (1-indexed) */
  page: number;
  /** Number of items to display per page (-1 for all items) */
  itemsPerPage: number;
  /** Array of property names to sort by */
  sortBy: string[];
  /** Array of boolean flags indicating descending sort for each sortBy property */
  sortDesc: boolean[];
  /** Array of property names to group by */
  groupBy: string[];
  /** Array of boolean flags indicating descending grouping for each groupBy property */
  groupDesc: boolean[];
  /** Whether sorting must always be active (cannot clear all sorts) */
  mustSort: boolean;
  /** Whether multiple columns can be sorted simultaneously */
  multiSort: boolean;
}

/**
 * Pagination information
 */
export interface VDataPagination {
  /** Current page number */
  page: number;
  /** Items per page */
  itemsPerPage: number;
  /** Zero-based index of the first item on current page */
  pageStart: number;
  /** Zero-based index of the last item on current page (exclusive) */
  pageStop: number;
  /** Total number of pages */
  pageCount: number;
  /** Total number of items (filtered) */
  itemsLength: number;
}

/**
 * Grouped items structure
 */
export interface GroupedItem<T = any> {
  /** Name of the group */
  name: string;
  /** Items in this group */
  items: T[];
}

/**
 * Custom sort function signature
 */
export type CustomSortFunction<T = any> = (
  items: T[],
  sortBy: string[],
  sortDesc: boolean[],
  locale: string
) => T[];

/**
 * Custom filter function signature
 */
export type CustomFilterFunction<T = any> = (
  items: T[],
  search: string
) => T[];

/**
 * Custom group function signature
 */
export type CustomGroupFunction<T = any> = (
  items: T[],
  groupBy: string[],
  groupDesc: boolean[]
) => GroupedItem<T>[];

/**
 * Scoped slot props provided to the default slot
 */
export interface VDataScopedProps<T = any> {
  /** Function to sort by a single column */
  sort: (by: string) => void;
  /** Function to sort by multiple columns */
  sortArray: (by: string[]) => void;
  /** Function to group by a column */
  group: (by: string) => void;
  /** Computed and paginated items */
  items: T[];
  /** Current options state */
  options: VDataOptions;
  /** Function to update options */
  updateOptions: (options: Partial<VDataOptions>) => void;
  /** Pagination information */
  pagination: VDataPagination;
  /** Grouped items (null if not grouped) */
  groupedItems: GroupedItem<T>[] | null;
  /** Original length of items array before filtering/pagination */
  originalItemsLength: number;
}

/**
 * VData component props
 */
export interface VDataProps<T = any> {
  /** Array of items to process */
  items?: T[];
  /** Initial options configuration */
  options?: Partial<VDataOptions>;
  /** Single or multiple properties to sort by */
  sortBy?: string | string[];
  /** Single or multiple flags for descending sort */
  sortDesc?: boolean | boolean[];
  /** Custom sorting function */
  customSort?: CustomSortFunction<T>;
  /** Whether sorting must always be active */
  mustSort?: boolean;
  /** Whether multiple columns can be sorted */
  multiSort?: boolean;
  /** Current page number */
  page?: number;
  /** Number of items per page */
  itemsPerPage?: number;
  /** Single or multiple properties to group by */
  groupBy?: string | string[];
  /** Single or multiple flags for descending grouping */
  groupDesc?: boolean | boolean[];
  /** Custom grouping function */
  customGroup?: CustomGroupFunction<T>;
  /** Locale string for sorting (e.g., 'en-US') */
  locale?: string;
  /** Disable sorting functionality */
  disableSort?: boolean;
  /** Disable pagination functionality */
  disablePagination?: boolean;
  /** Disable filtering functionality */
  disableFiltering?: boolean;
  /** Search query string for filtering */
  search?: string;
  /** Custom filter function */
  customFilter?: CustomFilterFunction<T>;
  /** Total number of items on server (for server-side pagination, -1 for client-side) */
  serverItemsLength?: number;
}

/**
 * VData component events
 */
export interface VDataEvents {
  /** Emitted when options change */
  'update:options': VDataOptions;
  /** Emitted when page changes */
  'update:page': number;
  /** Emitted when items per page changes */
  'update:items-per-page': number;
  /** Emitted when sortBy changes */
  'update:sort-by': string | string[];
  /** Emitted when sortDesc changes */
  'update:sort-desc': boolean | boolean[];
  /** Emitted when groupBy changes */
  'update:group-by': string | string[];
  /** Emitted when groupDesc changes */
  'update:group-desc': boolean | boolean[];
  /** Emitted when multiSort changes */
  'update:multi-sort': boolean;
  /** Emitted when mustSort changes */
  'update:must-sort': boolean;
  /** Emitted when page count changes */
  'page-count': number;
  /** Emitted when current items change */
  'current-items': any[];
  /** Emitted when pagination data changes */
  'pagination': VDataPagination;
}

/**
 * VData component
 * 
 * Provides advanced data management functionality including:
 * - Sorting (single and multi-column)
 * - Filtering/searching
 * - Grouping
 * - Pagination
 * - Server-side and client-side data handling
 * 
 * @example
 *