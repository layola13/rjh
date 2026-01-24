/**
 * Dropdown Component Type Definitions
 * A React dropdown component with custom input support and perfect-scrollbar integration
 */

import React from 'react';

/**
 * Represents a single item in the dropdown menu
 */
export interface DropdownItem {
  /** Unique identifier for the item. Special value 'custome' triggers custom input mode */
  id?: string;
  /** Display name shown in the dropdown */
  name?: string;
  /** Optional code identifier for the item */
  code?: string;
  /** Additional properties can be added */
  [key: string]: unknown;
}

/**
 * Props for the Dropdown component
 */
export interface DropdownProps {
  /** Array of items to display in the dropdown menu */
  items?: DropdownItem[];
  
  /** Name identifier for the dropdown, passed to change handler */
  name?: string;
  
  /** Title or default display text for the dropdown button */
  title?: string;
  
  /** Index of the initially selected item from the items array */
  selectedindex?: number;
  
  /** Additional CSS class names to apply to the root element */
  classname?: string;
  
  /** Placeholder text for custom input field mode */
  placeholder?: string;
  
  /**
   * Callback fired when a dropdown item is selected
   * @param name - The name identifier of the dropdown
   * @param item - The selected dropdown item
   */
  onchanged?: (name: string | undefined, item: DropdownItem) => void;
}

/**
 * Internal state of the Dropdown component
 */
export interface DropdownState {
  /** Whether custom input mode is active */
  iscustome: boolean;
  
  /** Whether the dropdown is disabled */
  disabled: boolean;
}

/**
 * React Dropdown Component with custom input and scrollbar support
 * 
 * Features:
 * - Displays a list of selectable items
 * - Supports custom text input mode (triggered by item with id='custome')
 * - Integrates perfect-scrollbar for smooth scrolling
 * - Can be programmatically disabled/enabled
 * - Exposes methods to get current selection and set default values
 */
export default class Dropdown extends React.Component<DropdownProps, DropdownState> {
  /** Reference to the span element displaying selected text */
  selectedText: React.RefObject<HTMLSpanElement>;
  
  /** Reference to the custom input field element */
  customefield: React.RefObject<HTMLInputElement>;
  
  /** Reference to the dropdown menu ul element */
  dropdownmenu: React.RefObject<HTMLUListElement>;
  
  /** Reference to the dropdown button element */
  buttoncom: React.RefObject<HTMLButtonElement>;
  
  /** The currently selected dropdown item */
  CurrentItem?: DropdownItem;

  constructor(props: DropdownProps);

  /**
   * Lifecycle: Initialize perfect-scrollbar after component mounts
   */
  componentDidMount(): void;

  /**
   * Lifecycle: Update perfect-scrollbar when component updates
   */
  componentDidUpdate(): void;

  /**
   * Lifecycle: Destroy perfect-scrollbar before component unmounts
   */
  componentWillUnmount(): void;

  /**
   * Handle click event on a dropdown item
   * @param name - The name identifier of the dropdown
   * @param item - The clicked dropdown item
   * @returns Always returns false to prevent default behavior
   */
  onItemClicked(name: string | undefined, item: DropdownItem): false;

  /**
   * Get the currently selected item or custom field value
   * @returns The current item object or custom input value
   */
  getCurrentItem(): DropdownItem | string | undefined;

  /**
   * Set the default display value of the dropdown
   * @param value - Either a string to display or a DropdownItem object
   */
  setDefaultValue(value: string | DropdownItem): void;

  /**
   * Disable the dropdown (prevents user interaction)
   */
  disabled(): void;

  /**
   * Enable the dropdown (allows user interaction)
   */
  enabled(): void;

  /**
   * Get the DOM node of the dropdown menu for scrollbar integration
   * @returns The DOM element of the dropdown menu
   */
  domNode(): Element | Text | null;

  /**
   * Render the dropdown component
   */
  render(): React.ReactElement;
}