/**
 * VDataIterator Component
 * 
 * A flexible data iteration component that provides selection, expansion, pagination,
 * sorting, and grouping functionality for lists of data items.
 * 
 * @module VDataIterator
 */

import { VNode, CreateElement } from 'vue';
import { VData } from '../VData';
import { VDataFooter } from './VDataFooter';
import Mobile from '../../mixins/mobile';
import Themeable from '../../mixins/themeable';
import { PropType } from 'vue';

/**
 * Represents the structure of a data item in the iterator
 */
export interface DataItem {
  [key: string]: unknown;
  id?: string | number;
  isSelectable?: boolean;
}

/**
 * Selection state mapping item keys to their data
 */
export interface SelectionState {
  [key: string]: DataItem;
}

/**
 * Expansion state mapping item keys to boolean flags
 */
export interface ExpansionState {
  [key: string]: boolean;
}

/**
 * Footer configuration properties
 */
export interface FooterProps {
  itemsPerPageOptions?: number[];
  itemsPerPageText?: string;
  prevIcon?: string;
  nextIcon?: string;
  showFirstLastPage?: boolean;
  showCurrentPage?: boolean;
  [key: string]: unknown;
}

/**
 * Pagination information
 */
export interface PaginationData {
  page: number;
  itemsPerPage: number;
  pageStart: number;
  pageStop: number;
  pageCount: number;
  itemsLength: number;
}

/**
 * Options for data manipulation
 */
export interface DataOptions {
  page: number;
  itemsPerPage: number;
  sortBy: string[];
  sortDesc: boolean[];
  groupBy: string[];
  groupDesc: boolean[];
  multiSort: boolean;
  mustSort: boolean;
}

/**
 * Scoped slot data passed to default slot
 */
export interface ScopedSlotData {
  items: DataItem[];
  originalItemsLength: number;
  pagination: PaginationData;
  options: DataOptions;
  updateOptions: (options: Partial<DataOptions>) => void;
  isSelected: (item: DataItem) => boolean;
  select: (item: DataItem, value?: boolean, emit?: boolean) => void;
  isExpanded: (item: DataItem) => boolean;
  expand: (item: DataItem, value?: boolean) => void;
  someItems: boolean;
  everyItem: boolean;
  toggleSelectAll: (value: boolean) => void;
}

/**
 * Item-specific props passed to item slot
 */
export interface ItemProps {
  item: DataItem;
  select: (value?: boolean) => void;
  isSelected: boolean;
  expand: (value?: boolean) => void;
  isExpanded: boolean;
  isMobile: boolean;
}

/**
 * Event payload for toggle-select-all event
 */
export interface ToggleSelectAllEvent {
  items: DataItem[];
  value: boolean;
}

/**
 * Event payload for item-selected event
 */
export interface ItemSelectionEvent {
  item: DataItem;
  value: boolean;
}

/**
 * Event payload for item-expanded event
 */
export interface ItemExpansionEvent {
  item: DataItem;
  value: boolean;
}

/**
 * VDataIterator Component Definition
 * 
 * Provides a flexible way to display and interact with lists of data with features like:
 * - Item selection (single or multiple)
 * - Item expansion
 * - Pagination
 * - Sorting and grouping
 * - Mobile-responsive layout
 * - Customizable footer
 */
declare const VDataIterator: {
  name: 'v-data-iterator';
  
  mixins: [typeof Mobile, typeof Themeable];
  
  props: {
    /**
     * Property name used as unique identifier for items
     * @default 'id'
     */
    itemKey: {
      type: PropType<string>;
      default: string;
    };
    
    /**
     * Array of selected items
     * @model
     */
    value: {
      type: PropType<DataItem[]>;
      default: () => DataItem[];
    };
    
    /**
     * Enable single-selection mode (only one item can be selected)
     * @default false
     */
    singleSelect: {
      type: PropType<boolean>;
    };
    
    /**
     * Array of expanded items
     * @sync
     */
    expanded: {
      type: PropType<DataItem[]>;
      default: () => DataItem[];
    };
    
    /**
     * Breakpoint for mobile layout (in pixels)
     * @default 600
     */
    mobileBreakpoint: {
      type: PropType<number | string>;
      default: number;
    };
    
    /**
     * Enable single-expansion mode (only one item can be expanded)
     * @default false
     */
    singleExpand: {
      type: PropType<boolean>;
    };
    
    /**
     * Show loading state or loading text
     */
    loading: {
      type: PropType<boolean | string>;
    };
    
    /**
     * Text displayed when no filtered results are found
     * @default '$vuetify.dataIterator.noResultsText'
     */
    noResultsText: {
      type: PropType<string>;
      default: string;
    };
    
    /**
     * Text displayed when no data is available
     * @default '$vuetify.noDataText'
     */
    noDataText: {
      type: PropType<string>;
      default: string;
    };
    
    /**
     * Text displayed during loading
     * @default '$vuetify.dataIterator.loadingText'
     */
    loadingText: {
      type: PropType<string>;
      default: string;
    };
    
    /**
     * Hide the default footer
     * @default false
     */
    hideDefaultFooter: {
      type: PropType<boolean>;
    };
    
    /**
     * Props passed to the footer component
     */
    footerProps: {
      type: PropType<FooterProps>;
    };
    
    /**
     * Property name that determines if an item is selectable
     * @default 'isSelectable'
     */
    selectableKey: {
      type: PropType<string>;
      default: string;
    };
    
    // VData inherited props (from VData.options.props)
    items: PropType<DataItem[]>;
    options: PropType<DataOptions>;
    sortBy: PropType<string | string[]>;
    sortDesc: PropType<boolean | boolean[]>;
    customSort: PropType<(items: DataItem[], sortBy: string[], sortDesc: boolean[]) => DataItem[]>;
    mustSort: PropType<boolean>;
    multiSort: PropType<boolean>;
    page: PropType<number>;
    itemsPerPage: PropType<number>;
    groupBy: PropType<string | string[]>;
    groupDesc: PropType<boolean | boolean[]>;
    customGroup: PropType<(items: DataItem[], groupBy: string[], groupDesc: boolean[]) => Record<string, DataItem[]>>;
    locale: PropType<string>;
    disableSort: PropType<boolean>;
    disablePagination: PropType<boolean>;
    disableFiltering: PropType<boolean>;
    search: PropType<string>;
    customFilter: PropType<(value: unknown, search: string | null, item: DataItem) => boolean>;
    serverItemsLength: PropType<number>;
  };
  
  data(): {
    /**
     * Internal selection state indexed by item key
     */
    selection: SelectionState;
    
    /**
     * Internal expansion state indexed by item key
     */
    expansion: ExpansionState;
    
    /**
     * Current page of items being displayed
     */
    internalCurrentItems: DataItem[];
  };
  
  computed: {
    /**
     * True if all selectable items are selected
     */
    everyItem(): boolean;
    
    /**
     * True if at least one item is selected
     */
    someItems(): boolean;
    
    /**
     * Footer props with camelCase keys
     */
    sanitizedFooterProps(): FooterProps;
    
    /**
     * Filtered list of items that can be selected
     */
    selectableItems(): DataItem[];
  };
  
  watch: {
    /**
     * Sync value prop to internal selection state
     */
    value: {
      handler(items: DataItem[]): void;
      immediate: boolean;
    };
    
    /**
     * Emit input event when selection changes
     */
    selection(newVal: SelectionState, oldVal: SelectionState): void;
    
    /**
     * Sync expanded prop to internal expansion state
     */
    expanded: {
      handler(items: DataItem[]): void;
      immediate: boolean;
    };
    
    /**
     * Emit update:expanded event when expansion changes
     */
    expansion(newVal: ExpansionState, oldVal: ExpansionState): void;
  };
  
  created(): void;
  
  methods: {
    /**
     * Toggle selection state for all selectable items
     * 
     * @param value - True to select all, false to deselect all
     * @emits toggle-select-all
     */
    toggleSelectAll(value: boolean): void;
    
    /**
     * Check if an item can be selected
     * 
     * @param item - The item to check
     * @returns True if the item is selectable
     */
    isSelectable(item: DataItem): boolean;
    
    /**
     * Check if an item is currently selected
     * 
     * @param item - The item to check
     * @returns True if the item is selected
     */
    isSelected(item: DataItem): boolean;
    
    /**
     * Toggle or set the selection state of an item
     * 
     * @param item - The item to select/deselect
     * @param value - True to select, false to deselect
     * @param emit - Whether to emit the item-selected event
     * @emits item-selected
     */
    select(item: DataItem, value?: boolean, emit?: boolean): void;
    
    /**
     * Check if an item is currently expanded
     * 
     * @param item - The item to check
     * @returns True if the item is expanded
     */
    isExpanded(item: DataItem): boolean;
    
    /**
     * Toggle or set the expansion state of an item
     * 
     * @param item - The item to expand/collapse
     * @param value - True to expand, false to collapse
     * @emits item-expanded
     */
    expand(item: DataItem, value?: boolean): void;
    
    /**
     * Create props object for an individual item
     * 
     * @param item - The data item
     * @returns Props to pass to item slot
     */
    createItemProps(item: DataItem): ItemProps;
    
    /**
     * Generate wrapper element for empty states
     * 
     * @param content - Content to wrap
     * @returns VNode wrapper
     */
    genEmptyWrapper(content: VNode | VNode[] | string): VNode;
    
    /**
     * Generate appropriate empty state content
     * 
     * @param originalItemsLength - Total number of items before filtering
     * @param filteredItemsLength - Number of items after filtering
     * @returns Empty state VNode or null
     */
    genEmpty(originalItemsLength: number, filteredItemsLength: number): VNode | null;
    
    /**
     * Generate item elements from scoped slots
     * 
     * @param data - Scoped slot data
     * @returns Array of item VNodes
     */
    genItems(data: ScopedSlotData): VNode[];
    
    /**
     * Generate footer component
     * 
     * @param data - Data for footer
     * @returns Footer VNode or null
     */
    genFooter(data: ScopedSlotData): VNode | null;
    
    /**
     * Generate the default scoped slot content
     * 
     * @param data - Data from VData component
     * @returns Container VNode with header, items, and footer
     */
    genDefaultScopedSlot(data: ScopedSlotData): VNode;
  };
  
  render(h: CreateElement): VNode;
};

export default VDataIterator;

/**
 * Component Events
 * 
 * @event input - Emitted when selected items change
 * @param {DataItem[]} value - Array of selected items
 * 
 * @event update:expanded - Emitted when expanded items change
 * @param {DataItem[]} value - Array of expanded items
 * 
 * @event toggle-select-all - Emitted when select-all is toggled
 * @param {ToggleSelectAllEvent} event - Event payload
 * 
 * @event item-selected - Emitted when an item's selection state changes
 * @param {ItemSelectionEvent} event - Event payload
 * 
 * @event item-expanded - Emitted when an item's expansion state changes
 * @param {ItemExpansionEvent} event - Event payload
 * 
 * @event update:options - Emitted when data options change
 * @param {DataOptions} options - New options
 * 
 * @event update:page - Emitted when page changes
 * @param {number} page - New page number
 * 
 * @event update:items-per-page - Emitted when items per page changes
 * @param {number} itemsPerPage - New items per page
 * 
 * @event update:sort-by - Emitted when sort field changes
 * @param {string[]} sortBy - New sort fields
 * 
 * @event update:sort-desc - Emitted when sort direction changes
 * @param {boolean[]} sortDesc - New sort directions
 * 
 * @event update:group-by - Emitted when group field changes
 * @param {string[]} groupBy - New group fields
 * 
 * @event update:group-desc - Emitted when group direction changes
 * @param {boolean[]} groupDesc - New group directions
 * 
 * @event pagination - Emitted when pagination data changes
 * @param {PaginationData} pagination - Pagination information
 * 
 * @event current-items - Emitted when current page items change
 * @param {DataItem[]} items - Current items
 * 
 * @event page-count - Emitted when total page count changes
 * @param {number} pageCount - Total number of pages
 */

/**
 * Component Slots
 * 
 * @slot default - Default scoped slot for custom layout
 * @binding {ScopedSlotData} - All data and methods for rendering
 * 
 * @slot item - Scoped slot for individual items
 * @binding {ItemProps} - Props for the item
 * 
 * @slot header - Slot for custom header content
 * @binding {ScopedSlotData} - Data for header
 * 
 * @slot footer - Slot for custom footer content
 * @binding {ScopedSlotData} - Data for footer
 * 
 * @slot loading - Custom loading state content
 * 
 * @slot no-data - Custom no data state content
 * 
 * @slot no-results - Custom no results state content
 * 
 * @slot footer.* - Footer sub-slots (passed through to VDataFooter)
 */