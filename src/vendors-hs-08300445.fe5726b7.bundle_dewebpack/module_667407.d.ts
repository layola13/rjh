/**
 * Hook utilities for managing disabled states in selectable/checkable items
 * @module module_667407
 */

/**
 * Data structure for an item that can be disabled
 */
interface DisableableItemData {
  /** Whether the item is completely disabled */
  disabled?: boolean;
  /** Whether only the checkbox is disabled (item may still be selectable) */
  disableCheckbox?: boolean;
}

/**
 * Represents an item with data property
 */
interface DisableableItem {
  data: DisableableItemData;
}

/**
 * Type of interaction being checked for disabled state
 * - 'select': General selection action
 * - 'checkbox': Checkbox-specific action
 */
type DisabledCheckType = 'select' | 'checkbox';

/**
 * Generic Map-like structure for storing items by key
 */
type ItemMap<K, V> = Map<K, V>;

/**
 * Callback function to get an item from a map, respecting disabled state
 * @param key - The key to look up in the map
 * @param checkType - Type of interaction to check (default: 'select')
 * @param ignoreDisabled - If true, return item even if disabled (default: false)
 * @returns The item if found and not disabled, null otherwise
 */
type GetItemCallback<K, V> = (
  key: K,
  checkType?: DisabledCheckType,
  ignoreDisabled?: boolean
) => V | null;

/**
 * Hook return type - tuple of two getter callbacks
 */
type UseDisabledCheckResult<K1, V1, K2, V2> = [
  GetItemCallback<K1, V1>,
  GetItemCallback<K2, V2>
];

/**
 * Default export: Custom hook that creates getter functions for two item maps
 * with disabled state checking
 * 
 * @param firstMap - First map of items to manage
 * @param secondMap - Second map of items to manage
 * @returns Tuple of two callback functions for retrieving items from each map
 * 
 * @example
 *