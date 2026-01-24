/**
 * VDataTable Component Type Definitions
 * A powerful data table component with features like sorting, filtering, grouping, and expansion.
 */

import Vue, { VNode, PropType } from 'vue';
import { VDataIterator } from '../VDataIterator';
import { VDataFooter } from '../VDataIterator';

/**
 * Represents a single column header configuration in the data table.
 */
export interface DataTableHeader {
  /** Display text for the header */
  text: string;
  /** Property name in the data items to display in this column */
  value?: string;
  /** Alignment of the column content */
  align?: 'start' | 'center' | 'end';
  /** Whether this column is sortable */
  sortable?: boolean;
  /** Whether this column can be filtered */
  filterable?: boolean;
  /** Whether to show a divider after this column */
  divider?: boolean;
  /** CSS class(es) to apply to the column */
  class?: string | string[];
  /** Column width (CSS value) */
  width?: string | number;
  /** Custom filter function for this column */
  filter?: (value: any, search: string | null, item: any) => boolean;
  /** Custom sort function for this column */
  sort?: (a: any, b: any) => number;
  /** Whether grouping is allowed on this column */
  groupable?: boolean;
}

/**
 * Options object for controlling table state.
 */
export interface DataOptions {
  /** Current page number (1-indexed) */
  page: number;
  /** Number of items to display per page */
  itemsPerPage: number;
  /** Array of property names to sort by */
  sortBy: string[];
  /** Array of booleans indicating descending sort for each sortBy */
  sortDesc: boolean[];
  /** Array of property names to group by */
  groupBy: string[];
  /** Array of booleans indicating descending grouping */
  groupDesc: boolean[];
  /** Whether to show multiple sort indicators */
  multiSort: boolean;
  /** Whether sorting must always have a direction */
  mustSort: boolean;
}

/**
 * Pagination information object.
 */
export interface Pagination {
  /** Current page number */
  page: number;
  /** Number of items per page */
  itemsPerPage: number;
  /** Total number of pages */
  pageCount: number;
  /** Starting item index for current page (0-indexed) */
  pageStart: number;
  /** Ending item index for current page (0-indexed) */
  pageStop: number;
  /** Total number of items */
  itemsLength: number;
}

/**
 * Grouped items structure.
 */
export interface GroupedItems<T = any> {
  /** Name/value of the group */
  name: string;
  /** Items belonging to this group */
  items: T[];
}

/**
 * Props passed to item slots.
 */
export interface ItemSlotProps<T = any> {
  /** The data item */
  item: T;
  /** Index of the item in the current page */
  index: number;
  /** Whether the item is currently selected */
  isSelected: boolean;
  /** Whether the item is currently expanded */
  isExpanded: boolean;
  /** Function to toggle selection state */
  select: (value: boolean) => void;
  /** Function to toggle expansion state */
  expand: (value: boolean) => void;
  /** Array of header configurations */
  headers: DataTableHeader[];
}

/**
 * Props for header-related slots.
 */
export interface HeaderSlotProps {
  /** Array of header configurations */
  headers: DataTableHeader[];
  /** Current data options */
  options: DataOptions;
  /** Whether in mobile view */
  mobile: boolean;
  /** Whether to show group-by functionality */
  showGroupBy: boolean;
  /** Whether some items are selected */
  someItems: boolean;
  /** Whether all items are selected */
  everyItem: boolean;
  /** Whether only single selection is allowed */
  singleSelect: boolean;
  /** Whether sorting is disabled */
  disableSort: boolean;
  /** Function to handle sort events */
  sort: (value: string) => void;
  /** Function to handle group events */
  group: (value: string) => void;
  /** Function to toggle select-all state */
  'toggle-select-all': (value: boolean) => void;
}

/**
 * VDataTable Component
 * A comprehensive data table with sorting, filtering, selection, expansion, and grouping capabilities.
 */
export default interface VDataTable extends Vue {
  /** Array of header configurations defining table columns */
  headers: DataTableHeader[];
  
  /** Enable selection checkboxes for rows */
  showSelect: boolean;
  
  /** Enable expand icon for rows */
  showExpand: boolean;
  
  /** Show group-by controls in headers */
  showGroupBy: boolean;
  
  /** Fixed height for the table (enables scrolling) */
  height?: number | string;
  
  /** Hide the default header row */
  hideDefaultHeader: boolean;
  
  /** Caption text to display above the table */
  caption?: string;
  
  /** Apply dense styling (reduced padding) */
  dense: boolean;
  
  /** Props to pass to the header component */
  headerProps?: Partial<HeaderSlotProps>;
  
  /** Calculate and set fixed column widths */
  calculateWidths: boolean;
  
  /** Fix the header when scrolling */
  fixedHeader: boolean;
  
  /** Override computed headers length */
  headersLength?: number;
  
  /** Icon to use for expand functionality */
  expandIcon: string;
  
  /** Custom filter function for searching items */
  customFilter: (value: any, search: string | null, item: any) => boolean;
  
  /** Function or string to determine CSS class for each row */
  itemClass: string | ((item: any) => string);
  
  /** Height of the loading progress bar */
  loaderHeight: number | string;

  // Computed Properties
  
  /** Filtered headers excluding grouped columns */
  readonly computedHeaders: DataTableHeader[];
  
  /** Colspan attributes for full-width cells */
  readonly colspanAttrs: { colspan: number } | undefined;
  
  /** Map of column values to their custom sort functions */
  readonly columnSorters: Record<string, (a: any, b: any) => number>;
  
  /** Headers that have custom filter functions */
  readonly headersWithCustomFilters: DataTableHeader[];
  
  /** Headers without custom filter functions */
  readonly headersWithoutCustomFilters: DataTableHeader[];
  
  /** Sanitized header props with camelCase keys */
  readonly sanitizedHeaderProps: Record<string, any>;
  
  /** Computed items per page value (validated against available options) */
  readonly computedItemsPerPage: number;

  // Methods
  
  /**
   * Calculate and cache column widths from DOM
   */
  calcWidths(): void;
  
  /**
   * Filter items using both custom column filters and global search
   * @param items - Items to filter
   * @param search - Search string
   * @returns Filtered items
   */
  customFilterWithColumns<T>(items: T[], search: string | null): T[];
  
  /**
   * Sort items using custom column sorters
   * @param items - Items to sort
   * @param sortBy - Properties to sort by
   * @param sortDesc - Descending flags for each sort
   * @param locale - Locale for string comparison
   * @returns Sorted items
   */
  customSortWithHeaders<T>(
    items: T[],
    sortBy: string[],
    sortDesc: boolean[],
    locale: string
  ): T[];
  
  /**
   * Create props object for an item slot
   * @param item - The data item
   * @returns Props object with item metadata
   */
  createItemProps<T>(item: T): ItemSlotProps<T>;
  
  /**
   * Generate caption element or slot content
   * @param slotData - Data to pass to caption slot
   * @returns VNode array or undefined
   */
  genCaption(slotData: any): VNode[] | undefined;
  
  /**
   * Generate colgroup element with column definitions
   * @param slotData - Data context
   * @returns Colgroup VNode
   */
  genColgroup(slotData: any): VNode;
  
  /**
   * Generate loading progress row
   * @returns Loading header VNode
   */
  genLoading(): VNode;
  
  /**
   * Generate table headers (including custom header slot)
   * @param slotData - Data for header slots
   * @returns Array of header VNodes
   */
  genHeaders(slotData: any): VNode[];
  
  /**
   * Generate empty state wrapper row
   * @param content - Content to display when empty
   * @returns Empty wrapper VNode
   */
  genEmptyWrapper(content: VNode[]): VNode;
  
  /**
   * Generate all table rows (grouped or flat)
   * @param items - Items to render
   * @param slotData - Context data
   * @returns Array of row VNodes
   */
  genItems<T>(items: T[], slotData: any): VNode[];
  
  /**
   * Generate grouped rows structure
   * @param groupedItems - Items organized by groups
   * @param slotData - Context data
   * @returns Array of group VNodes
   */
  genGroupedRows<T>(groupedItems: GroupedItems<T>[], slotData: any): VNode[];
  
  /**
   * Generate default grouped row (header + items)
   * @param groupName - Name of the group
   * @param items - Items in the group
   * @param slotData - Context data
   * @returns Group VNode
   */
  genDefaultGroupedRow<T>(groupName: string, items: T[], slotData: any): VNode;
  
  /**
   * Generate rows using item slot or default renderer
   * @param items - Items to render
   * @param slotData - Context data
   * @returns Array of row VNodes
   */
  genRows<T>(items: T[], slotData: any): VNode[];
  
  /**
   * Generate rows using scoped item slot
   * @param items - Items to render
   * @param slotData - Context data
   * @returns Array of row VNodes
   */
  genScopedRows<T>(items: T[], slotData: any): VNode[];
  
  /**
   * Generate rows using default renderer
   * @param items - Items to render
   * @param slotData - Context data
   * @returns Array of row VNodes
   */
  genDefaultRows<T>(items: T[], slotData: any): VNode[];
  
  /**
   * Generate expandable row with expansion slot
   * @param item - Item to render
   * @returns Expandable row VNode
   */
  genDefaultExpandedRow<T>(item: T): VNode;
  
  /**
   * Generate simple non-expandable row
   * @param item - Item to render
   * @param classes - Additional CSS classes
   * @returns Row VNode
   */
  genDefaultSimpleRow<T>(item: T, classes?: Record<string, boolean>): VNode;
  
  /**
   * Generate table body element
   * @param slotData - Context data
   * @returns Tbody VNode
   */
  genBody(slotData: any): VNode;
  
  /**
   * Generate table footer(s)
   * @param slotData - Context data with pagination
   * @returns Array of footer VNodes
   */
  genFooters(slotData: any): VNode[];
  
  /**
   * Generate the complete default scoped slot content
   * @param slotData - Full context data
   * @returns VSimpleTable VNode
   */
  genDefaultScopedSlot(slotData: any): VNode;
  
  /**
   * Wrap content in a template with slot name
   * @param slotName - Name of the slot
   * @param content - Content VNodes
   * @returns Template VNode
   */
  proxySlot(slotName: string, content: VNode[]): VNode;

  // Events
  
  /**
   * Emitted when table options change
   */
  $emit(event: 'update:options', options: DataOptions): this;
  
  /**
   * Emitted when current page changes
   */
  $emit(event: 'update:page', page: number): this;
  
  /**
   * Emitted when items per page changes
   */
  $emit(event: 'update:items-per-page', itemsPerPage: number): this;
  
  /**
   * Emitted when sort-by array changes
   */
  $emit(event: 'update:sort-by', sortBy: string[]): this;
  
  /**
   * Emitted when sort-desc array changes
   */
  $emit(event: 'update:sort-desc', sortDesc: boolean[]): this;
  
  /**
   * Emitted when group-by array changes
   */
  $emit(event: 'update:group-by', groupBy: string[]): this;
  
  /**
   * Emitted when group-desc array changes
   */
  $emit(event: 'update:group-desc', groupDesc: boolean[]): this;
  
  /**
   * Emitted when pagination state changes
   */
  $emit(event: 'pagination', pagination: Pagination): this;
  
  /**
   * Emitted when the currently displayed items change
   */
  $emit(event: 'current-items', items: any[]): this;
  
  /**
   * Emitted when total page count changes
   */
  $emit(event: 'page-count', pageCount: number): this;
  
  /**
   * Emitted when a row is clicked
   */
  $emit(event: 'click:row', item: any, itemSlotProps: ItemSlotProps): this;
  
  /**
   * Emitted when a row is right-clicked
   */
  $emit(event: 'contextmenu:row', mouseEvent: MouseEvent, itemSlotProps: ItemSlotProps): this;
  
  /**
   * Emitted when a row is double-clicked
   */
  $emit(event: 'dblclick:row', mouseEvent: MouseEvent, itemSlotProps: ItemSlotProps): this;
}

export { VDataTable };