/**
 * Base mixin for item group components that manage selection state of child items.
 * Provides functionality for single/multiple selection, mandatory selection, and max items.
 */
export interface BaseItemGroupProps {
  /** CSS class applied to active/selected items */
  activeClass: string;
  /** Whether at least one item must always be selected */
  mandatory: boolean;
  /** Maximum number of items that can be selected (for multiple mode) */
  max: number | string | null;
  /** Whether multiple items can be selected simultaneously */
  multiple: boolean;
  /** Current selected value(s) - single value or array depending on multiple prop */
  value?: any;
}

/**
 * Represents a child item that can be registered with the item group
 */
export interface GroupItem {
  /** Current active/selected state of the item */
  isActive: boolean;
  /** Whether the item is disabled and cannot be selected */
  disabled: boolean;
  /** Optional value identifier for the item */
  value?: any;
  /** Vue event emitter */
  $on(event: string, callback: () => void): void;
}

/**
 * Component data structure for BaseItemGroup
 */
export interface BaseItemGroupData {
  /** Internal tracked value, initialized from props or defaults */
  internalLazyValue: any;
  /** Registry of all child items */
  items: GroupItem[];
}

/**
 * Computed properties for BaseItemGroup
 */
export interface BaseItemGroupComputed {
  /** Combined CSS classes including theme classes */
  classes: Record<string, boolean>;
  /** Index of the currently selected item (single selection mode) */
  selectedIndex: number;
  /** Currently selected item (single selection mode only) */
  selectedItem: GroupItem | undefined;
  /** Array of all currently selected items */
  selectedItems: GroupItem[];
  /** Array of selected values (always array, even in single mode) */
  selectedValues: any[];
  /** Function to check if a value is currently selected */
  toggleMethod: (value: any) => boolean;
}

/**
 * Methods for BaseItemGroup component
 */
export interface BaseItemGroupMethods {
  /**
   * Generate render data for the root element
   * @returns VNode data object with classes
   */
  genData(): { class: Record<string, boolean> };

  /**
   * Get the value identifier for an item
   * @param item - The item to get value from
   * @param index - Fallback index if item has no value
   * @returns The item's value or its index
   */
  getValue(item: GroupItem, index: number): any;

  /**
   * Handle click/selection of an item
   * @param item - The item that was clicked
   */
  onClick(item: GroupItem): void;

  /**
   * Register a new child item with the group
   * @param item - The item to register
   */
  register(item: GroupItem): void;

  /**
   * Unregister a child item from the group
   * @param item - The item to unregister
   */
  unregister(item: GroupItem): void;

  /**
   * Update the active state of a specific item
   * @param item - The item to update
   * @param index - The item's index in the items array
   */
  updateItem(item: GroupItem, index: number): void;

  /**
   * Update active state of all items based on current selection
   */
  updateItemsState(): void;

  /**
   * Update the internal value when selection changes
   * @param value - The value that was toggled
   */
  updateInternalValue(value: any): void;

  /**
   * Ensure mandatory constraint by selecting an item if none selected
   * @param reverse - Whether to search items in reverse order
   */
  updateMandatory(reverse?: boolean): void;

  /**
   * Update selection in multiple mode
   * @param value - The value to toggle
   */
  updateMultiple(value: any): void;

  /**
   * Update selection in single mode
   * @param value - The value to set or unset
   */
  updateSingle(value: any): void;
}

/**
 * Base item group component that manages selection state of child items.
 * Supports single/multiple selection, mandatory selection, and maximum selection limits.
 */
export declare const BaseItemGroup: Vue.ComponentOptions<
  Vue,
  BaseItemGroupData,
  BaseItemGroupMethods,
  BaseItemGroupComputed,
  BaseItemGroupProps
>;

/**
 * VItemGroup component - concrete implementation of BaseItemGroup.
 * Provides itemGroup to child components via Vue's provide/inject.
 */
export interface VItemGroupProvide {
  /** Reference to the parent item group instance */
  itemGroup: Vue;
}

/**
 * Default export: VItemGroup component with provide functionality
 */
declare const VItemGroup: Vue.ComponentOptions<
  Vue,
  BaseItemGroupData,
  BaseItemGroupMethods,
  BaseItemGroupComputed,
  BaseItemGroupProps
> & {
  provide(): VItemGroupProvide;
};

export default VItemGroup;