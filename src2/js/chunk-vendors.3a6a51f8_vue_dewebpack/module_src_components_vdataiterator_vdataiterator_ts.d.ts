/**
 * VDataIterator Component
 * A component for iterating and displaying data with selection, expansion, pagination, and mobile support.
 */

import { VNode, PropType } from 'vue';
import { VData } from '../VData';
import { VDataFooter } from './VDataFooter';

/**
 * Item selection state map
 * Key: item identifier (from itemKey prop)
 * Value: the selected item object
 */
export interface SelectionState {
  [key: string]: any;
}

/**
 * Item expansion state map
 * Key: item identifier (from itemKey prop)
 * Value: true if expanded, undefined otherwise
 */
export interface ExpansionState {
  [key: string]: boolean | undefined;
}

/**
 * Pagination information
 */
export interface PaginationInfo {
  page: number;
  itemsPerPage: number;
  pageStart: number;
  pageStop: number;
  pageCount: number;
  itemsLength: number;
}

/**
 * Data iterator options
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
 * Footer component props
 */
export interface FooterProps {
  itemsPerPageOptions?: number[];
  itemsPerPageText?: string;
  prevIcon?: string;
  nextIcon?: string;
  showFirstLastPage?: boolean;
  showCurrentPage?: boolean;
  firstIcon?: string;
  lastIcon?: string;
}

/**
 * Item properties passed to scoped slots
 */
export interface ItemProps<T = any> {
  item: T;
  select: (value: boolean) => void;
  isSelected: boolean;
  expand: (value: boolean) => void;
  isExpanded: boolean;
  isMobile: boolean;
}

/**
 * Default scoped slot props
 */
export interface DefaultScopedSlotProps<T = any> {
  items: T[];
  originalItemsLength: number;
  pagination: PaginationInfo;
  options: DataOptions;
  updateOptions: (options: Partial<DataOptions>) => void;
  isSelected: (item: T) => boolean;
  select: (item: T, value?: boolean, emit?: boolean) => void;
  isExpanded: (item: T) => boolean;
  expand: (item: T, value?: boolean) => void;
  someItems: boolean;
  everyItem: boolean;
  toggleSelectAll: (value: boolean) => void;
}

/**
 * Toggle select all event payload
 */
export interface ToggleSelectAllEvent<T = any> {
  items: T[];
  value: boolean;
}

/**
 * Item selected event payload
 */
export interface ItemSelectedEvent<T = any> {
  item: T;
  value: boolean;
}

/**
 * Item expanded event payload
 */
export interface ItemExpandedEvent<T = any> {
  item: T;
  value: boolean;
}

/**
 * VDataIterator component definition
 * Provides data iteration with selection, expansion, sorting, grouping, and pagination features
 */
declare const VDataIterator: {
  name: 'v-data-iterator';
  
  props: {
    /** Array of data items to display */
    items: {
      type: PropType<any[]>;
      default: () => any[];
    };
    
    /** Unique identifier property name for items */
    itemKey: {
      type: PropType<string>;
      default: 'id';
    };
    
    /** Array of currently selected items (v-model) */
    value: {
      type: PropType<any[]>;
      default: () => any[];
    };
    
    /** Only allow single item selection */
    singleSelect: PropType<boolean>;
    
    /** Array of currently expanded items */
    expanded: {
      type: PropType<any[]>;
      default: () => any[];
    };
    
    /** Breakpoint for mobile layout (in pixels) */
    mobileBreakpoint: {
      type: PropType<number | string>;
      default: 600;
    };
    
    /** Only allow single item expansion */
    singleExpand: PropType<boolean>;
    
    /** Show loading state (boolean or loading text) */
    loading: PropType<boolean | string>;
    
    /** Text displayed when no search results found */
    noResultsText: {
      type: PropType<string>;
      default: '$vuetify.dataIterator.noResultsText';
    };
    
    /** Text displayed when no data available */
    noDataText: {
      type: PropType<string>;
      default: '$vuetify.noDataText';
    };
    
    /** Text displayed during loading */
    loadingText: {
      type: PropType<string>;
      default: '$vuetify.dataIterator.loadingText';
    };
    
    /** Hide the default footer */
    hideDefaultFooter: PropType<boolean>;
    
    /** Props passed to footer component */
    footerProps: PropType<FooterProps>;
    
    /** Property name to determine if item is selectable */
    selectableKey: {
      type: PropType<string>;
      default: 'isSelectable';
    };
    
    /** Current page number */
    page: PropType<number>;
    
    /** Number of items per page */
    itemsPerPage: PropType<number>;
    
    /** Array of property names to sort by */
    sortBy: PropType<string | string[]>;
    
    /** Array of sort directions (true = descending) */
    sortDesc: PropType<boolean | boolean[]>;
    
    /** Array of property names to group by */
    groupBy: PropType<string | string[]>;
    
    /** Array of group sort directions (true = descending) */
    groupDesc: PropType<boolean | boolean[]>;
    
    /** Enable multi-column sorting */
    multiSort: PropType<boolean>;
    
    /** Require at least one sort column */
    mustSort: PropType<boolean>;
    
    /** Total number of items (for server-side pagination) */
    serverItemsLength: PropType<number>;
    
    /** Custom filter function */
    customFilter: PropType<(value: any, search: string | null, item: any) => boolean>;
    
    /** Custom sort function */
    customSort: PropType<(items: any[], sortBy: string[], sortDesc: boolean[]) => any[]>;
    
    /** Custom group function */
    customGroup: PropType<(items: any[], groupBy: string[], groupDesc: boolean[]) => Record<string, any[]>>;
    
    /** Search query string */
    search: PropType<string>;
    
    /** Apply theme styling */
    dark: PropType<boolean>;
    light: PropType<boolean>;
  };
  
  data(): {
    /** Internal selection state map */
    selection: SelectionState;
    /** Internal expansion state map */
    expansion: ExpansionState;
    /** Current page items cache */
    internalCurrentItems: any[];
  };
  
  computed: {
    /** True if all selectable items are selected */
    everyItem(): boolean;
    
    /** True if at least one item is selected */
    someItems(): boolean;
    
    /** Footer props converted from kebab-case to camelCase */
    sanitizedFooterProps(): FooterProps;
    
    /** Filtered list of items that can be selected */
    selectableItems(): any[];
  };
  
  methods: {
    /**
     * Toggle selection state of all items
     * @param value - true to select all, false to deselect all
     */
    toggleSelectAll(value: boolean): void;
    
    /**
     * Check if an item can be selected
     * @param item - The item to check
     * @returns true if item is selectable
     */
    isSelectable(item: any): boolean;
    
    /**
     * Check if an item is currently selected
     * @param item - The item to check
     * @returns true if item is selected
     */
    isSelected(item: any): boolean;
    
    /**
     * Select or deselect an item
     * @param item - The item to select/deselect
     * @param value - true to select, false to deselect
     * @param emit - Whether to emit the item-selected event
     */
    select(item: any, value?: boolean, emit?: boolean): void;
    
    /**
     * Check if an item is currently expanded
     * @param item - The item to check
     * @returns true if item is expanded
     */
    isExpanded(item: any): boolean;
    
    /**
     * Expand or collapse an item
     * @param item - The item to expand/collapse
     * @param value - true to expand, false to collapse
     */
    expand(item: any, value?: boolean): void;
    
    /**
     * Create props object for item scoped slot
     * @param item - The item to create props for
     * @returns Props object for the item
     */
    createItemProps(item: any): ItemProps;
    
    /**
     * Generate wrapper element for empty states
     * @param content - Content to wrap
     * @returns VNode wrapper element
     */
    genEmptyWrapper(content: any): VNode;
    
    /**
     * Generate empty state content (loading, no data, no results)
     * @param originalItemsLength - Total number of items before filtering
     * @param filteredItemsLength - Number of items after filtering
     * @returns VNode for empty state or null
     */
    genEmpty(originalItemsLength: number, filteredItemsLength: number): VNode | null;
    
    /**
     * Generate item list or empty state
     * @param props - Scoped slot props
     * @returns Array of VNodes
     */
    genItems(props: DefaultScopedSlotProps): VNode[];
    
    /**
     * Generate footer component
     * @param props - Scoped slot props
     * @returns VNode for footer or null
     */
    genFooter(props: DefaultScopedSlotProps): VNode | null;
    
    /**
     * Generate default scoped slot content
     * @param props - Scoped slot props
     * @returns VNode for entire component
     */
    genDefaultScopedSlot(props: DefaultScopedSlotProps): VNode;
  };
  
  /**
   * Render the component
   * @returns VNode
   */
  render(): VNode;
};

export default VDataIterator;

// Event declarations
export interface VDataIteratorEvents {
  /** Emitted when selected items change */
  'input': (items: any[]) => void;
  
  /** Emitted when expanded items change */
  'update:expanded': (items: any[]) => void;
  
  /** Emitted when options change */
  'update:options': (options: DataOptions) => void;
  
  /** Emitted when page changes */
  'update:page': (page: number) => void;
  
  /** Emitted when items per page changes */
  'update:items-per-page': (itemsPerPage: number) => void;
  
  /** Emitted when sort by changes */
  'update:sort-by': (sortBy: string[]) => void;
  
  /** Emitted when sort direction changes */
  'update:sort-desc': (sortDesc: boolean[]) => void;
  
  /** Emitted when group by changes */
  'update:group-by': (groupBy: string[]) => void;
  
  /** Emitted when group direction changes */
  'update:group-desc': (groupDesc: boolean[]) => void;
  
  /** Emitted when pagination changes (legacy) */
  'pagination': (pagination: PaginationInfo) => void;
  
  /** Emitted when current page items change */
  'current-items': (items: any[]) => void;
  
  /** Emitted when page count changes */
  'page-count': (pageCount: number) => void;
  
  /** Emitted when select all is toggled */
  'toggle-select-all': (event: ToggleSelectAllEvent) => void;
  
  /** Emitted when an item is selected/deselected */
  'item-selected': (event: ItemSelectedEvent) => void;
  
  /** Emitted when an item is expanded/collapsed */
  'item-expanded': (event: ItemExpandedEvent) => void;
}