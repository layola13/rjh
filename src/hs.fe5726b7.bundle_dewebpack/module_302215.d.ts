/**
 * Dropdown component with dynamic options and room type selection support
 * Module: module_302215
 * Original ID: 302215
 */

import React from 'react';

/**
 * Option item in the dropdown list
 */
export interface DropdownOption {
  /** Unique identifier for the option */
  id: string;
  /** Display label for the option */
  label?: string;
  /** Optional icon URL for the option */
  icon?: string;
}

/**
 * Data configuration for the dropdown component
 */
export interface DropdownData {
  /** CSS class name for styling */
  className?: string;
  /** Title text displayed above the dropdown */
  title?: string;
  /** Array of selectable options */
  options: DropdownOption[];
  /** Currently selected option key */
  defaultKey?: string;
  /** Default room name value */
  defaultRoomName?: string;
  /** Placeholder text for input field */
  defaultHolder?: string;
  /** Callback fired when selection changes */
  onchange?: (selectedId: string, label: string) => void;
  /** Callback fired when room name changes */
  onchangeroomname?: (name: string) => void;
}

/**
 * Props for the Dropdown component
 */
export interface DropdownProps {
  /** Configuration data for the dropdown */
  data?: DropdownData;
  /** HTML id attribute for the component */
  id?: string;
  /** Flag to highlight selected items */
  flag?: boolean;
}

/**
 * State for the Dropdown component
 */
export interface DropdownState {
  /** Whether the dropdown menu is currently visible */
  show: boolean;
}

/**
 * Dropdown component with icon support, room type selection, and custom input field
 * Supports click-outside-to-close and keyboard navigation
 */
export default class Dropdown extends React.Component<DropdownProps, DropdownState> {
  static propTypes: {
    data: any;
    id: any;
    flag: any;
  };

  static defaultProps: {
    data: {};
    id: string;
    flag: boolean;
  };

  /**
   * Reference to the name input component
   */
  private nameinput: any;

  constructor(props: DropdownProps);

  /**
   * Lifecycle: Attach global click listener to close dropdown when clicking outside
   */
  componentDidMount(): void;

  /**
   * Lifecycle: Remove global click listener to prevent memory leaks
   */
  componentWillUnmount(): void;

  /**
   * Handles click events on dropdown items
   * @param event - Click event
   * @param data - Dropdown data configuration
   * @param option - Selected option
   */
  onItemClick(event: React.MouseEvent, data: DropdownData, option: DropdownOption): void;

  /**
   * Finds an option by its key
   * @param key - Option key to search for
   * @param data - Dropdown data containing options
   * @returns The matching option or the first option if key is empty
   */
  getOptionByKey(key: string, data: DropdownData): DropdownOption;

  /**
   * Gets the room type number suffix for the selected key
   * @param key - Selected option key
   * @returns Room type number suffix or empty string
   */
  getRoomTypeNum(key: string): string | number;

  /**
   * Closes the dropdown if it's currently open
   */
  private doit: () => void;

  /**
   * Toggles the dropdown visibility
   */
  private callul: () => void;

  /**
   * Renders the dropdown component
   */
  render(): React.ReactElement;
}