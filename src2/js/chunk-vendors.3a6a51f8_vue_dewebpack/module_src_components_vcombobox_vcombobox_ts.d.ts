import type { PropType, VNode } from 'vue';
import type VAutocomplete from '../VAutocomplete/VAutocomplete';
import type VSelect from '../VSelect/VSelect';

/**
 * VCombobox component - extends VAutocomplete with custom value entry support
 * Allows users to enter values that are not in the predefined list
 */
export default interface VCombobox extends VAutocomplete {
  /** Component name identifier */
  name: 'v-combobox';

  /** Component props definition */
  $props: {
    /**
     * Array of delimiter characters that trigger tag creation in multiple mode
     * @default []
     * @example [',', ';', ' ']
     */
    delimiters: string[];

    /**
     * When true, returns the entire object instead of just the value
     * @default true
     */
    returnObject: boolean;
  };

  /** Component data state */
  $data: {
    /**
     * Index of the item currently being edited in multiple mode
     * -1 indicates no item is being edited
     * @default -1
     */
    editingIndex: number;
  };

  /** Computed properties */
  $computed: {
    /**
     * Calculates the counter value based on selection mode
     * In multiple mode: returns count of selected items
     * In single mode: returns length of internal search string
     */
    computedCounterValue: number;

    /**
     * Determines if component has custom slot content
     * Checks parent VSelect slot or if in multiple mode
     */
    hasSlot: boolean;

    /**
     * Indicates whether any user-entered value is allowed
     * Always returns true for combobox
     */
    isAnyValueAllowed: boolean;

    /**
     * Determines if the dropdown menu should be visible
     * Shows when focused and either has items or has no-data slot
     */
    menuCanShow: boolean;
  };

  /** Component methods */
  $methods: {
    /**
     * Handles internal search value changes
     * Processes delimiters in multiple mode to create tags
     * @param newValue - The new search string value
     */
    onInternalSearchChanged(newValue: string): void;

    /**
     * Generates the input element VNode
     * Removes name attribute and adds paste event handler
     * @returns Input element VNode
     */
    genInput(): VNode;

    /**
     * Generates a chip element for selected items in multiple mode
     * Adds double-click handler to enable editing
     * @param item - The selected item data
     * @param index - Index of the item in selection
     * @returns Chip component VNode
     */
    genChipSelection(item: unknown, index: number): VNode;

    /**
     * Handles chip input events (when chip is removed/modified)
     * Resets editing index after chip interaction
     * @param target - The chip component that triggered the event
     */
    onChipInput(target: Vue): void;

    /**
     * Handles Enter key press
     * Creates new item if no menu item is selected
     * @param event - Keyboard event
     */
    onEnterDown(event: KeyboardEvent): void;

    /**
     * Callback when filtered items list changes
     * Handles auto-select first item behavior
     * @param newItems - New filtered items array
     * @param oldItems - Previous filtered items array
     */
    onFilteredItemsChanged(newItems: unknown[], oldItems: unknown[]): void;

    /**
     * Handles keyboard navigation and item selection
     * Special handling for left arrow in multiple mode and Enter key
     * @param event - Keyboard event
     */
    onKeyDown(event: KeyboardEvent): void;

    /**
     * Handles Tab key press
     * Creates tags from search input in multiple mode if no menu item selected
     * @param event - Keyboard event
     */
    onTabDown(event: KeyboardEvent): void;

    /**
     * Selects an item from the list or creates a new one
     * If editing, updates the edited item instead
     * @param item - The item to select
     */
    selectItem(item: unknown): void;

    /**
     * Synchronizes selectedItems array with internalValue
     * Handles both single and multiple selection modes
     */
    setSelectedItems(): void;

    /**
     * Sets the component value
     * Falls back to internal search string if value is null/undefined
     * @param value - The value to set
     */
    setValue(value: unknown): void;

    /**
     * Updates the item being edited with the current search value
     * Replaces item at editingIndex and resets editing state
     */
    updateEditing(): void;

    /**
     * Updates component state in single selection mode
     * Synchronizes value with search input and clears search when using chips/slots
     */
    updateCombobox(): void;

    /**
     * Main update method that delegates to appropriate handler
     * Calls updateTags for multiple mode, updateCombobox for single mode
     */
    updateSelf(): void;

    /**
     * Updates selected items in multiple mode
     * Handles tag creation, editing, and duplicate removal
     */
    updateTags(): void;

    /**
     * Handles paste events for special autocomplete data format
     * Prevents default paste and adds item directly in multiple mode
     * @param event - Clipboard event
     */
    onPaste(event: ClipboardEvent): void;
  };
}

/**
 * Type definition for component props
 */
export interface VComboboxProps {
  delimiters?: string[];
  returnObject?: boolean;
}

/**
 * Type definition for component data
 */
export interface VComboboxData {
  editingIndex: number;
}