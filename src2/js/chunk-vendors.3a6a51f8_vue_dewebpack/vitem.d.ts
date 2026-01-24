/**
 * VItemGroup module providing item selection and grouping functionality.
 * This module exports VItem and VItemGroup components for managing interactive item collections.
 */

/**
 * VItem component for individual selectable items within a VItemGroup.
 * Represents a single item that can be selected, toggled, or grouped with other items.
 */
export declare class VItem {
  /** Whether the item is currently selected/active */
  isActive?: boolean;
  
  /** Unique identifier for the item within its group */
  value?: unknown;
  
  /** Whether the item is disabled and cannot be selected */
  disabled?: boolean;
  
  /** Callback fired when the item's selection state changes */
  onChange?: (value: boolean) => void;
}

/**
 * VItemGroup component for managing a collection of selectable VItem components.
 * Handles selection logic, multiple selection modes, and item state synchronization.
 */
export declare class VItemGroup {
  /** Currently selected value(s). Can be a single value or array for multiple selection */
  value?: unknown | unknown[];
  
  /** Whether multiple items can be selected simultaneously */
  multiple?: boolean;
  
  /** Whether at least one item must always be selected */
  mandatory?: boolean;
  
  /** Maximum number of items that can be selected (when multiple is true) */
  max?: number;
  
  /** Callback fired when the selection changes */
  onChange?: (value: unknown | unknown[]) => void;
  
  /** Array of registered VItem instances */
  items?: VItem[];
}

/**
 * Default export containing Vuetify subcomponent metadata.
 * Used internally by Vuetify for component registration and tree-shaking.
 */
declare const _default: {
  /** Internal Vuetify metadata for subcomponents */
  $_vuetify_subcomponents: {
    VItem: typeof VItem;
    VItemGroup: typeof VItemGroup;
  };
};

export default _default;