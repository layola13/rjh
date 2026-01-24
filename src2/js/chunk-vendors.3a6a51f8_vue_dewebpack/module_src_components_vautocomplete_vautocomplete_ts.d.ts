import type { PropType } from 'vue';
import type { VNode } from 'vue';

/**
 * Key code constants for keyboard events
 */
export interface KeyCodes {
  left: number;
  right: number;
  backspace: number;
  delete: number;
}

/**
 * Menu properties configuration for VAutocomplete
 */
export interface MenuProps {
  offsetY: boolean;
  offsetOverflow: boolean;
  transition: boolean | string;
  contentClass?: string;
  [key: string]: unknown;
}

/**
 * Filter function type for filtering autocomplete items
 * @param item - The item to filter
 * @param queryText - The search query text
 * @param itemText - The text representation of the item
 * @returns True if the item matches the filter criteria
 */
export type FilterFunction = (
  item: unknown,
  queryText: string,
  itemText: string
) => boolean;

/**
 * VAutocomplete component type definitions
 * Extends VSelect with autocomplete-specific functionality
 */
export default interface VAutocomplete {
  /** Component name */
  name: 'v-autocomplete';

  // Props
  /**
   * Allow the menu to overflow outside its container
   * @default true
   */
  allowOverflow: boolean;

  /**
   * Automatically select the first item when menu opens
   * @default false
   */
  autoSelectFirst: boolean;

  /**
   * Custom filter function for filtering items
   * @default Case-insensitive substring match
   */
  filter: FilterFunction;

  /**
   * Hide the "no data available" message when there are no items
   * @default false
   */
  hideNoData: boolean;

  /**
   * Configuration object for the dropdown menu
   */
  menuProps: MenuProps;

  /**
   * Disable filtering of items (show all items regardless of search)
   * @default false
   */
  noFilter: boolean;

  /**
   * The search input value (use with .sync modifier)
   * @default undefined
   */
  searchInput: string | undefined;

  // Data
  /**
   * Internal lazy-loaded search value
   */
  lazySearch: string | null | undefined;

  // Computed Properties
  /**
   * CSS classes for the component
   */
  classes: Record<string, boolean>;

  /**
   * Computed list of items after filtering
   */
  computedItems: unknown[];

  /**
   * Array of values from selected items
   */
  selectedValues: unknown[];

  /**
   * Whether there are items to display in the menu
   */
  hasDisplayedItems: boolean;

  /**
   * Current text length of the selected item
   */
  currentRange: number;

  /**
   * Filtered items based on search input
   */
  filteredItems: unknown[];

  /**
   * Internal search value with getter/setter
   */
  internalSearch: string | null | undefined;

  /**
   * Whether any value is allowed (not just from the list)
   */
  isAnyValueAllowed: boolean;

  /**
   * Whether the component has a value or search text
   */
  isDirty: boolean;

  /**
   * Whether the user is currently searching
   */
  isSearching: boolean;

  /**
   * Whether the menu can be shown
   */
  menuCanShow: boolean;

  /**
   * Merged menu properties with defaults
   */
  $_menuProps: MenuProps;

  /**
   * Whether the search input has a value
   */
  searchIsDirty: boolean;

  /**
   * Currently selected item (null for multiple selection)
   */
  selectedItem: unknown | null;

  /**
   * Data object for the list component
   */
  listData: {
    props: {
      items: unknown[];
      noFilter: boolean;
      searchInput: string | null | undefined;
      [key: string]: unknown;
    };
    [key: string]: unknown;
  };

  // Methods
  /**
   * Called when filtered items change
   * @param newItems - New filtered items array
   * @param oldItems - Previous filtered items array
   */
  onFilteredItemsChanged(newItems: unknown[], oldItems: unknown[]): void;

  /**
   * Called when internal search value changes
   */
  onInternalSearchChanged(): void;

  /**
   * Update the dimensions of the dropdown menu
   */
  updateMenuDimensions(): void;

  /**
   * Change the selected index based on keyboard input
   * @param keyCode - The keyboard key code
   */
  changeSelectedIndex(keyCode: number): void;

  /**
   * Delete the currently selected item (when using chips/multiple)
   */
  deleteCurrentItem(): void;

  /**
   * Callback when the clear button is clicked
   */
  clearableCallback(): void;

  /**
   * Generate the input element VNode
   * @returns VNode for the input element
   */
  genInput(): VNode;

  /**
   * Generate the input slot wrapper VNode
   * @returns VNode for the input slot
   */
  genInputSlot(): VNode;

  /**
   * Generate the selections (chips/selected items) VNodes
   * @returns Array of VNodes for selections
   */
  genSelections(): VNode[];

  /**
   * Handle click events on the component
   * @param event - Mouse event
   */
  onClick(event: MouseEvent): void;

  /**
   * Handle input events
   * @param event - Input event
   */
  onInput(event: Event): void;

  /**
   * Handle keydown events
   * @param event - Keyboard event
   */
  onKeyDown(event: KeyboardEvent): void;

  /**
   * Handle space key down event
   * @param event - Keyboard event
   */
  onSpaceDown(event: KeyboardEvent): void;

  /**
   * Handle tab key down event
   * @param event - Keyboard event
   */
  onTabDown(event: KeyboardEvent): void;

  /**
   * Handle up/down arrow key events
   * @param event - Keyboard event
   */
  onUpDown(event: KeyboardEvent): void;

  /**
   * Select an item from the list
   * @param item - The item to select
   */
  selectItem(item: unknown): void;

  /**
   * Set the selected items array
   */
  setSelectedItems(): void;

  /**
   * Update the search input based on selected item
   */
  setSearch(): void;

  /**
   * Update component state when losing focus
   */
  updateSelf(): void;

  /**
   * Check if an item is in the selected items
   * @param item - The item to check
   * @returns True if the item is selected
   */
  hasItem(item: unknown): boolean;

  /**
   * Handle copy events for selected items
   * @param event - Clipboard event
   */
  onCopy(event: ClipboardEvent): void;
}

/**
 * Default menu properties for VAutocomplete
 */
export declare const defaultMenuProps: MenuProps;