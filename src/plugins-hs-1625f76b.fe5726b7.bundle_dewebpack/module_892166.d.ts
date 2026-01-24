/**
 * Multi-choice selection component types
 * Provides a list of selectable items with multiple selection support
 */

/**
 * Individual item in the selection list
 */
export interface MultiChoiceItem {
  /** Unique identifier for the item */
  id: string | number;
  /** Display name of the item */
  name: string;
}

/**
 * Callback function invoked when selection changes
 * @param name - The name/identifier of the component instance
 * @param selectedKeys - Array of currently selected item IDs
 */
export type SelectChangeCallback = (
  name: string,
  selectedKeys: Array<string | number>
) => void;

/**
 * Props for the MultiChoiceItem component
 */
export interface MultiChoiceItemData {
  /** Array of selectable items */
  items: MultiChoiceItem[];
  /** Array of currently selected item IDs */
  selectKeys: Array<string | number>;
  /** Callback triggered when selection state changes */
  selectChange?: SelectChangeCallback;
  /** Component instance identifier */
  name: string;
}

/**
 * Props interface for the MultiChoiceItem component
 */
export interface MultiChoiceItemProps {
  /** Configuration data for the multi-choice component */
  data: MultiChoiceItemData;
}

/**
 * State interface for the MultiChoiceItem component
 */
export interface MultiChoiceItemState {
  /** Current list of items */
  items: MultiChoiceItem[];
  /** Currently selected item IDs */
  selectKeys: Array<string | number>;
  /** Selection change callback */
  selectChange?: SelectChangeCallback;
  /** Component name */
  name: string;
}

/**
 * Multi-choice selection component
 * Renders a list of items that can be selected/deselected
 * Selected items are visually distinguished and can be removed
 */
declare const MultiChoiceItemComponent: React.ComponentClass<
  MultiChoiceItemProps,
  MultiChoiceItemState
>;

export default MultiChoiceItemComponent;