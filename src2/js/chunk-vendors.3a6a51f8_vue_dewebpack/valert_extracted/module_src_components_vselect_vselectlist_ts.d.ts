import type { VNode, PropType } from 'vue';
import type { VueConstructor } from 'vue';

/**
 * Item with header property for grouping
 */
export interface VSelectListHeaderItem {
  /** Header text content */
  header: string;
  [key: string]: any;
}

/**
 * Item with divider property for visual separation
 */
export interface VSelectListDividerItem {
  /** Indicates this is a divider item */
  divider: boolean;
  [key: string]: any;
}

/**
 * Generic select list item
 */
export interface VSelectListItem {
  /** Item text content */
  text?: string;
  /** Item value */
  value?: any;
  /** Whether item is disabled */
  disabled?: boolean;
  [key: string]: any;
}

/**
 * Union type for all possible item types
 */
export type VSelectListItemType = VSelectListItem | VSelectListHeaderItem | VSelectListDividerItem | null;

/**
 * Function type for extracting item properties
 */
export type ItemPropertyFunction<T = any> = (item: T, fallback?: any) => any;

/**
 * Scoped slot props passed to item slot
 */
export interface VSelectListItemSlotProps {
  /** Parent component instance */
  parent: any;
  /** The item being rendered */
  item: VSelectListItemType;
  /** HTML attributes for the item */
  attrs: Record<string, any>;
  /** Event handlers for the item */
  on: Record<string, Function>;
}

/**
 * VSelectList component for rendering selectable item lists
 * Used internally by VSelect and VAutocomplete components
 */
export default class VSelectList extends VueConstructor {
  /** Component name */
  static readonly name: 'v-select-list';

  // Props
  /** Whether to show action (checkbox) column */
  action: boolean;
  
  /** Enable dense spacing for list items */
  dense: boolean;
  
  /** Hide items that are currently selected */
  hideSelected: boolean;
  
  /** Array of items to display in the list */
  items: VSelectListItemType[];
  
  /** Property name, path array, or function to determine if item is disabled */
  itemDisabled: string | string[] | ItemPropertyFunction;
  
  /** Property name, path array, or function to get item display text */
  itemText: string | string[] | ItemPropertyFunction;
  
  /** Property name, path array, or function to get item value */
  itemValue: string | string[] | ItemPropertyFunction;
  
  /** Text to display when no items are available */
  noDataText: string;
  
  /** Disable search filtering/highlighting */
  noFilter: boolean;
  
  /** Current search input value for filtering */
  searchInput: string | null;
  
  /** Array of currently selected items */
  selectedItems: any[];
  
  /** Theme color for active state */
  color: string;

  // Computed Properties
  /**
   * Parsed values of selected items
   * @returns Array of item values extracted from selectedItems
   */
  readonly parsedItems: any[];
  
  /**
   * CSS classes to apply to active list tiles
   * @returns Space-separated class names for active state
   */
  readonly tileActiveClass: string;
  
  /**
   * VNode for the static "no data" tile
   * @returns VNode displaying noDataText when no items available
   */
  readonly staticNoDataTile: VNode;

  // Methods
  /**
   * Generate action column with checkbox for item selection
   * @param item - The item to create action for
   * @param isSelected - Whether the item is currently selected
   * @returns VNode containing VSimpleCheckbox
   */
  genAction(item: VSelectListItemType, isSelected: boolean): VNode;
  
  /**
   * Generate divider component
   * @param props - Props to pass to VDivider
   * @returns VNode containing VDivider
   */
  genDivider(props: Record<string, any>): VNode;
  
  /**
   * Generate filtered and highlighted text based on search input
   * @param text - Original text to filter
   * @returns HTML string with highlighted search matches
   */
  genFilteredText(text: string): string;
  
  /**
   * Generate subheader component for grouped items
   * @param props - Props containing header text and other options
   * @returns VNode containing VSubheader
   */
  genHeader(props: VSelectListHeaderItem): VNode;
  
  /**
   * Generate highlighted span for matching search text
   * @param text - Text to wrap in highlight markup
   * @returns HTML string with highlight span
   */
  genHighlight(text: string): string;
  
  /**
   * Split text into parts before, matching, and after search input
   * @param text - Original text to split
   * @returns Object with start, middle (matching), and end text segments
   */
  getMaskedCharacters(text: string): {
    start: string;
    middle: string;
    end: string;
  };
  
  /**
   * Generate list item tile
   * @param options - Options for tile generation
   * @param options.item - The item to render
   * @param options.index - Item index in list
   * @param options.disabled - Whether item is disabled
   * @param options.value - Whether item is selected
   * @returns VNode containing VListItem or custom scoped slot content
   */
  genTile(options: {
    item: VSelectListItemType;
    index: number;
    disabled?: boolean | null;
    value?: boolean;
  }): VNode;
  
  /**
   * Generate content for list item tile
   * @param item - The item to create content for
   * @param index - Item index (default: 0)
   * @returns VNode containing VListItemContent with filtered text
   */
  genTileContent(item: VSelectListItemType, index?: number): VNode;
  
  /**
   * Check if item is in selected items list
   * @param item - Item to check
   * @returns True if item value is in parsedItems
   */
  hasItem(item: VSelectListItemType): boolean;
  
  /**
   * Check if VNode array needs to be wrapped in VListItem
   * @param nodes - Array of VNodes to check
   * @returns True if nodes need VListItem wrapper
   */
  needsTile(nodes: VNode[]): boolean;
  
  /**
   * Get disabled state of an item
   * @param item - Item to check
   * @returns True if item is disabled
   */
  getDisabled(item: VSelectListItem): boolean;
  
  /**
   * Extract display text from item
   * @param item - Item to get text from
   * @returns String representation of item text
   */
  getText(item: VSelectListItemType): string;
  
  /**
   * Extract value from item
   * @param item - Item to get value from
   * @returns Item value, falls back to text if no value property
   */
  getValue(item: VSelectListItemType): any;

  // Events
  /**
   * Emitted when an item is selected
   * @param item - The selected item
   */
  $emit(event: 'select', item: VSelectListItemType): this;

  // Slots
  $scopedSlots: {
    /**
     * Scoped slot for customizing item rendering
     * @param props - Slot props containing item data and handlers
     */
    item?: (props: VSelectListItemSlotProps) => VNode | VNode[];
  };

  $slots: {
    /** Slot for custom content when no data is available */
    'no-data'?: VNode[];
    /** Slot for content prepended before all items */
    'prepend-item'?: VNode[];
    /** Slot for content appended after all items */
    'append-item'?: VNode[];
  };

  /**
   * Render function that generates the complete list
   * @returns VNode containing VList with all items, headers, dividers, and slots
   */
  render(): VNode;
}