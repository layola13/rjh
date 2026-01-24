/**
 * VDataFooter Component Type Definitions
 * 
 * A footer component for data iteration, providing pagination controls,
 * items-per-page selection, and navigation icons.
 */

import Vue from 'vue';

/**
 * Represents a single option in the items-per-page dropdown
 */
export interface DataItemsPerPageOption {
  /** Display text for the option */
  text: string;
  /** Numeric value (-1 for "All") */
  value: number;
}

/**
 * Pagination state information
 */
export interface DataPagination {
  /** Current page number (1-indexed) */
  page: number;
  /** Number of items to display per page */
  itemsPerPage: number;
  /** Total number of pages available */
  pageCount: number;
  /** Total number of items in the dataset */
  itemsLength: number;
  /** Index of the first item on current page (0-indexed) */
  pageStart: number;
  /** Index of the last item on current page (0-indexed) */
  pageStop: number;
}

/**
 * Options object for controlling data footer behavior
 */
export interface DataFooterOptions {
  /** Current page number */
  page: number;
  /** Items to display per page */
  itemsPerPage: number;
  /** Sort configuration */
  sortBy?: string[];
  /** Sort order configuration */
  sortDesc?: boolean[];
  /** Group configuration */
  groupBy?: string[];
  /** Group order configuration */
  groupDesc?: boolean[];
  /** Search/filter state */
  multiSort?: boolean;
  /** Must sort flag */
  mustSort?: boolean;
}

/**
 * Scoped slot data for custom page text rendering
 */
export interface PageTextScopedSlot {
  /** Starting item index (1-indexed for display) */
  pageStart: number;
  /** Ending item index (1-indexed for display) */
  pageStop: number;
  /** Total number of items */
  itemsLength: number;
}

/**
 * VDataFooter Component
 * 
 * Provides pagination controls and configuration UI for data tables/iterators.
 * Emits update:options event when user interacts with controls.
 */
export default interface VDataFooter extends Vue {
  /** Component name */
  readonly name: 'v-data-footer';

  // Props
  
  /** Current pagination options (required) */
  options: DataFooterOptions;
  
  /** Pagination state information (required) */
  pagination: DataPagination;
  
  /** 
   * Available items-per-page options 
   * Can be numbers or DataItemsPerPageOption objects
   * @default [5, 10, 15, -1]
   */
  itemsPerPageOptions: (number | DataItemsPerPageOption)[];
  
  /** 
   * Icon for previous page button 
   * @default "$prev"
   */
  prevIcon: string;
  
  /** 
   * Icon for next page button 
   * @default "$next"
   */
  nextIcon: string;
  
  /** 
   * Icon for first page button 
   * @default "$first"
   */
  firstIcon: string;
  
  /** 
   * Icon for last page button 
   * @default "$last"
   */
  lastIcon: string;
  
  /** 
   * Label text for items-per-page selector 
   * @default "$vuetify.dataFooter.itemsPerPageText"
   */
  itemsPerPageText: string;
  
  /** 
   * Text for "All" option in items-per-page selector 
   * @default "$vuetify.dataFooter.itemsPerPageAll"
   */
  itemsPerPageAllText: string;
  
  /** 
   * Show first/last page navigation buttons 
   * @default false
   */
  showFirstLastPage: boolean;
  
  /** 
   * Display current page number between navigation buttons 
   * @default false
   */
  showCurrentPage: boolean;
  
  /** 
   * Disable all pagination controls 
   * @default false
   */
  disablePagination: boolean;
  
  /** 
   * Disable items-per-page selector 
   * @default false
   */
  disableItemsPerPage: boolean;
  
  /** 
   * Template string for page range text (e.g., "{0}-{1} of {2}") 
   * @default "$vuetify.dataFooter.pageText"
   */
  pageText: string;

  // Computed Properties
  
  /** 
   * Determines if next page button should be disabled
   * Based on current page, items per page, and total items
   */
  readonly disableNextPageIcon: boolean;
  
  /** 
   * Normalized items-per-page options with text/value structure
   */
  readonly computedDataItemsPerPageOptions: DataItemsPerPageOption[];

  // Methods
  
  /**
   * Emit updated options to parent component
   * @param updates - Partial options to merge with current options
   */
  updateOptions(updates: Partial<DataFooterOptions>): void;
  
  /**
   * Navigate to first page
   */
  onFirstPage(): void;
  
  /**
   * Navigate to previous page
   */
  onPreviousPage(): void;
  
  /**
   * Navigate to next page
   */
  onNextPage(): void;
  
  /**
   * Navigate to last page
   */
  onLastPage(): void;
  
  /**
   * Handle items-per-page selection change
   * @param itemsPerPage - New items per page value
   */
  onChangeItemsPerPage(itemsPerPage: number): void;
  
  /**
   * Convert a numeric value to DataItemsPerPageOption format
   * @param value - Number of items per page (-1 for "All")
   * @returns Formatted option object
   */
  genDataItemsPerPageOption(value: number): DataItemsPerPageOption;
  
  /**
   * Render the items-per-page select dropdown
   * @returns VNode or null if only one option available
   */
  genItemsPerPageSelect(): Vue.VNode | null;
  
  /**
   * Render pagination info text (e.g., "1-10 of 100")
   * @returns VNode containing pagination info
   */
  genPaginationInfo(): Vue.VNode;
  
  /**
   * Generate a navigation icon button
   * @param clickHandler - Click event handler
   * @param disabled - Whether button is disabled
   * @param ariaLabel - Accessibility label
   * @param icon - Icon name/component
   * @returns VNode for icon button
   */
  genIcon(
    clickHandler: () => void,
    disabled: boolean,
    ariaLabel: string,
    icon: string
  ): Vue.VNode;
  
  /**
   * Render all navigation icon buttons
   * @returns Array of VNodes containing navigation controls
   */
  genIcons(): Vue.VNode[];
  
  /**
   * Render function for the component
   * @returns Root VNode
   */
  render(): Vue.VNode;

  // Scoped Slots
  
  /**
   * Custom slot for pagination text rendering
   */
  $scopedSlots: {
    'page-text'?: (props: PageTextScopedSlot) => Vue.VNode[];
  };

  // Events
  
  /**
   * Emitted when options are updated
   * @event update:options
   * @param options - New options object
   */
  $emit(event: 'update:options', options: DataFooterOptions): this;
}