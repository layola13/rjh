import type { VNode } from 'vue';
import type { PropType } from 'vue';

/**
 * Item property accessor type
 * Can be a string key, array of keys, or function to extract value from item
 */
export type ItemPropertyAccessor<T = any> = string | string[] | ((item: T) => any);

/**
 * List item with optional header or divider flags
 */
export interface SelectListItem {
  /** Item text content */
  text?: string;
  /** Item value */
  value?: any;
  /** Whether item is disabled */
  disabled?: boolean;
  /** Whether this is a header item */
  header?: string;
  /** Whether this is a divider item */
  divider?: boolean;
  /** Additional custom properties */
  [key: string]: any;
}

/**
 * Scoped slot props passed to item slot
 */
export interface ItemScopedSlotProps {
  /** Parent component instance */
  parent: VSelectList;
  /** Current item data */
  item: SelectListItem;
  /** HTML attributes for the list item */
  attrs: {
    'aria-selected': string;
    id: string;
    role: string;
  };
  /** Event handlers for the list item */
  on: {
    mousedown: (event: MouseEvent) => void;
    click: () => void;
  };
}

/**
 * Masked text segments for search highlighting
 */
export interface MaskedCharacters {
  /** Text before the matched segment */
  start: string;
  /** Matched text segment */
  middle: string;
  /** Text after the matched segment */
  end: string;
}

/**
 * VSelectList Component Props
 */
export interface VSelectListProps {
  /** Show action checkbox for multi-select */
  action?: boolean;
  /** Enable dense/compact list styling */
  dense?: boolean;
  /** Hide items that are currently selected */
  hideSelected?: boolean;
  /** Array of items to display in the list */
  items?: SelectListItem[];
  /** Property path or function to determine if item is disabled */
  itemDisabled?: ItemPropertyAccessor;
  /** Property path or function to extract display text from item */
  itemText?: ItemPropertyAccessor;
  /** Property path or function to extract value from item */
  itemValue?: ItemPropertyAccessor;
  /** Text to display when no items are available */
  noDataText?: string;
  /** Disable search input filtering/highlighting */
  noFilter?: boolean;
  /** Current search input value for filtering */
  searchInput?: string | null;
  /** Array of currently selected items */
  selectedItems?: SelectListItem[];
  /** Theme color for active items */
  color?: string;
  /** Enable dark theme */
  dark?: boolean;
  /** Enable light theme */
  light?: boolean;
}

/**
 * VSelectList Component
 * 
 * Renders a list of selectable items with support for:
 * - Single and multi-select modes
 * - Search filtering with text highlighting
 * - Headers, dividers, and custom item templates
 * - Keyboard navigation and ARIA attributes
 * 
 * @emits select - Emitted when an item is selected, passes the item
 */
export default class VSelectList extends Vue {
  /** Show action checkbox for multi-select */
  action: boolean;
  
  /** Enable dense/compact list styling */
  dense: boolean;
  
  /** Hide items that are currently selected */
  hideSelected: boolean;
  
  /** Array of items to display in the list */
  items: SelectListItem[];
  
  /** Property path or function to determine if item is disabled */
  itemDisabled: ItemPropertyAccessor;
  
  /** Property path or function to extract display text from item */
  itemText: ItemPropertyAccessor;
  
  /** Property path or function to extract value from item */
  itemValue: ItemPropertyAccessor;
  
  /** Text to display when no items are available */
  noDataText?: string;
  
  /** Disable search input filtering/highlighting */
  noFilter: boolean;
  
  /** Current search input value for filtering */
  searchInput: string | null;
  
  /** Array of currently selected items */
  selectedItems: SelectListItem[];
  
  /** Theme color for active items */
  color?: string;
  
  /** Enable dark theme */
  dark?: boolean;
  
  /** Enable light theme */
  light?: boolean;

  // Computed Properties
  
  /**
   * Parsed values of selected items
   * Maps selectedItems to their extracted values
   */
  readonly parsedItems: any[];
  
  /**
   * CSS classes to apply to active list tiles
   * Derived from the theme color
   */
  readonly tileActiveClass: string;
  
  /**
   * Static "no data" tile VNode displayed when list is empty
   */
  readonly staticNoDataTile: VNode;

  // Methods
  
  /**
   * Generate action checkbox for multi-select mode
   * @param item - The list item
   * @param isSelected - Whether the item is currently selected
   * @returns VNode for the action checkbox
   */
  genAction(item: SelectListItem, isSelected: boolean): VNode;
  
  /**
   * Generate a divider VNode
   * @param props - Divider properties
   * @returns VNode for the divider
   */
  genDivider(props: Record<string, any>): VNode;
  
  /**
   * Generate filtered text with search highlighting
   * Escapes HTML and wraps matched segments in highlight spans
   * @param text - Text to filter and highlight
   * @returns HTML string with highlighted matches
   */
  genFilteredText(text: string): string;
  
  /**
   * Generate a subheader VNode
   * @param props - Header properties including header text
   * @returns VNode for the subheader
   */
  genHeader(props: Record<string, any> & { header: string }): VNode;
  
  /**
   * Generate HTML for highlighted text segment
   * @param text - Text to wrap in highlight span
   * @returns HTML string with highlight markup
   */
  genHighlight(text: string): string;
  
  /**
   * Split text into segments based on search input match
   * @param text - Text to split
   * @returns Object with start, middle (matched), and end segments
   */
  getMaskedCharacters(text: string): MaskedCharacters;
  
  /**
   * Generate a list item tile VNode
   * @param options - Tile generation options
   * @param options.item - The item data
   * @param options.index - Item index in the list
   * @param options.disabled - Override disabled state
   * @param options.value - Override selected state
   * @returns VNode for the list item
   */
  genTile(options: {
    item: SelectListItem;
    index: number;
    disabled?: boolean | null;
    value?: boolean;
  }): VNode;
  
  /**
   * Generate the content for a list item tile
   * @param item - The item data
   * @param index - Item index (default: 0)
   * @returns VNode for the tile content
   */
  genTileContent(item: SelectListItem, index?: number): VNode;
  
  /**
   * Check if an item is currently selected
   * @param item - The item to check
   * @returns True if item is in selectedItems
   */
  hasItem(item: SelectListItem): boolean;
  
  /**
   * Check if a VNode array needs to be wrapped in a VListItem
   * @param nodes - Array of VNodes from scoped slot
   * @returns True if nodes need wrapping
   */
  needsTile(nodes: VNode[]): boolean;
  
  /**
   * Get the disabled state of an item
   * @param item - The item to check
   * @returns True if item is disabled
   */
  getDisabled(item: SelectListItem): boolean;
  
  /**
   * Extract display text from an item
   * @param item - The item
   * @returns Display text string
   */
  getText(item: SelectListItem): string;
  
  /**
   * Extract value from an item
   * @param item - The item
   * @returns Item value (falls back to text if no value)
   */
  getValue(item: SelectListItem): any;

  // Slots
  
  /**
   * Scoped slot for customizing item rendering
   * @slot item
   * @binding {ItemScopedSlotProps} props - Item data and handlers
   */
  $scopedSlots: {
    item?: (props: ItemScopedSlotProps) => VNode | VNode[];
  };
  
  /**
   * Slot for content when no items are available
   * @slot no-data
   */
  $slots: {
    'no-data'?: VNode[];
    /** Content to prepend before all items */
    'prepend-item'?: VNode[];
    /** Content to append after all items */
    'append-item'?: VNode[];
  };

  // Events
  
  /**
   * Emitted when an item is selected
   * @event select
   * @param {SelectListItem} item - The selected item
   */
  $emit(event: 'select', item: SelectListItem): this;
}