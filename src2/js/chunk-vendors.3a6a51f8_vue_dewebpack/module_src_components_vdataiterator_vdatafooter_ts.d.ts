import Vue from 'vue';
import { VueConstructor } from 'vue/types/vue';
import { PropType } from 'vue/types/options';

/**
 * Options for data iteration pagination
 */
export interface DataOptions {
  /** Current page number (1-indexed) */
  page: number;
  /** Number of items to display per page (-1 for all items) */
  itemsPerPage: number;
  /** Sort by field names */
  sortBy?: string[];
  /** Sort descending flags */
  sortDesc?: boolean[];
  /** Group by field names */
  groupBy?: string[];
  /** Group descending flags */
  groupDesc?: boolean[];
  /** Multi-sort enabled */
  multiSort?: boolean;
  /** Must-sort enabled */
  mustSort?: boolean;
}

/**
 * Pagination metadata
 */
export interface DataPagination {
  /** Zero-based index of first item on current page */
  pageStart: number;
  /** Zero-based index of last item on current page */
  pageStop: number;
  /** Total number of pages */
  pageCount: number;
  /** Total number of items across all pages */
  itemsLength: number;
  /** Number of items per page */
  itemsPerPage: number;
}

/**
 * Items per page option configuration
 */
export interface ItemsPerPageOption {
  /** Display text for the option */
  text: string;
  /** Value to use when selected */
  value: number;
}

/**
 * Scoped slot props for custom page text rendering
 */
export interface PageTextSlotProps {
  /** Starting item number (1-indexed) */
  pageStart: number;
  /** Ending item number (1-indexed) */
  pageStop: number;
  /** Total number of items */
  itemsLength: number;
}

/**
 * VDataFooter component - Footer controls for data iteration with pagination
 * 
 * Provides pagination controls, items-per-page selection, and page information display
 * for data tables and iterators.
 */
declare const VDataFooter: VueConstructor<
  Vue & {
    /** Current data options (page, itemsPerPage, etc.) */
    readonly options: DataOptions;
    /** Pagination metadata */
    readonly pagination: DataPagination;
    /** Available items per page options */
    readonly itemsPerPageOptions: Array<number | ItemsPerPageOption>;
    /** Icon for previous page button */
    readonly prevIcon: string;
    /** Icon for next page button */
    readonly nextIcon: string;
    /** Icon for first page button */
    readonly firstIcon: string;
    /** Icon for last page button */
    readonly lastIcon: string;
    /** Label text for items per page selector */
    readonly itemsPerPageText: string;
    /** Text for "All" option in items per page selector */
    readonly itemsPerPageAllText: string;
    /** Show first/last page navigation buttons */
    readonly showFirstLastPage: boolean;
    /** Show current page number */
    readonly showCurrentPage: boolean;
    /** Disable all pagination controls */
    readonly disablePagination: boolean;
    /** Disable items per page selector */
    readonly disableItemsPerPage: boolean;
    /** Template text for page information (e.g., "{0}-{1} of {2}") */
    readonly pageText: string;

    // Computed properties
    /** Whether next page button should be disabled */
    readonly disableNextPageIcon: boolean;
    /** Normalized items per page options with text and value */
    readonly computedDataItemsPerPageOptions: ItemsPerPageOption[];

    // Methods
    /**
     * Update data options and emit change event
     * @param updates - Partial options to merge with current options
     */
    updateOptions(updates: Partial<DataOptions>): void;

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
     * Handle items per page selection change
     * @param itemsPerPage - New items per page value
     */
    onChangeItemsPerPage(itemsPerPage: number): void;

    /**
     * Generate normalized items per page option object
     * @param value - Number of items per page (-1 for all)
     * @returns Normalized option with text and value
     */
    genDataItemsPerPageOption(value: number): ItemsPerPageOption;

    /**
     * Render items per page selector
     * @returns VNode or null if only one option available
     */
    genItemsPerPageSelect(): Vue.VNode | null;

    /**
     * Render pagination information text (e.g., "1-10 of 100")
     * @returns VNode containing pagination info
     */
    genPaginationInfo(): Vue.VNode;

    /**
     * Render a navigation button icon
     * @param clickHandler - Click event handler
     * @param disabled - Whether button is disabled
     * @param ariaLabel - Accessible label for screen readers
     * @param icon - Icon name to display
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
     * @returns Array of VNodes for navigation controls
     */
    genIcons(): Vue.VNode[];
  }
>;

export default VDataFooter;