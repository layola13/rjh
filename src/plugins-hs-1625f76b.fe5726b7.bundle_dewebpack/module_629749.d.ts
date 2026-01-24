/**
 * Tag dialog content component for rendering various types of tag inputs
 * Supports single select, multi-select, and text input tag types
 */

import React from 'react';

/**
 * Tag option type enumeration
 */
export enum TagOptionType {
  /** Single selection dropdown */
  Single = 'single',
  /** Multiple selection checkboxes */
  Multi = 'multi',
  /** Text input field */
  Input = 'input'
}

/**
 * Individual option within a tag field
 */
export interface TagOption {
  /** Unique identifier for the option */
  optionValue: string | number;
  /** Display name shown to user */
  dispName: string;
  /** Whether this option requires additional input */
  needInput?: boolean;
  /** Field name for the additional input */
  inputField?: string;
  /** Default value for the input field */
  inputValue?: number;
  /** Unit type for numeric inputs ('auto' uses display unit) */
  inputUnit?: string;
  /** Label for the input field */
  inputFieldLabel?: string;
  /** Whether to preserve original value without conversion */
  needOriginValue?: boolean;
}

/**
 * Selection item for dropdowns
 */
export interface SelectItem {
  /** Option identifier */
  id: string | number;
  /** Option display name */
  name: string;
}

/**
 * Configuration for a tag field
 */
export interface TagFieldConfig {
  /** Unique field name(s) - can be single string or array for compound fields */
  tagFieldName: string | string[];
  /** Display label for the field */
  label: string;
  /** Type of tag input control */
  tagOptionType: TagOptionType;
  /** Available options (can be nested arrays for compound fields) */
  tagOptions: TagOption[] | TagOption[][];
  /** Currently selected key(s) */
  selectKeys: (string | number)[];
  /** Current text value (for input type) */
  tagFieldValue?: string;
}

/**
 * Multi-choice component data structure
 */
export interface MultiChoiceData {
  /** Available items to select from */
  items: SelectItem[];
  /** Currently selected keys */
  selectKeys: (string | number)[];
  /** Callback when selection changes */
  selectChange: (fieldName: string, value: (string | number)[]) => void;
  /** Field identifier */
  name: string;
}

/**
 * Props for the TagDialogContent component
 */
export interface TagDialogContentProps {
  data: {
    /** Array of tag field configurations to render */
    items: TagFieldConfig[];
    /** Component identifier */
    name: string;
    /** Callback invoked when any field value changes */
    selectChange?: (fieldName: string, value: any) => void;
  };
}

/**
 * Internal state of the TagDialogContent component
 */
export interface TagDialogContentState {
  /** Current tag field configurations */
  items: TagFieldConfig[];
  /** Change callback function */
  selectChange?: (fieldName: string, value: any) => void;
  /** Component name */
  name: string;
  /** Map of field names to selected values */
  selectMap: Record<string, (string | number)[]>;
  /** Map of field names to text input values */
  textMap: Record<string, string>;
}

/**
 * Tag dialog content component
 * Renders a collection of tag input fields with support for:
 * - Single/multi-selection dropdowns
 * - Text inputs
 * - Numeric inputs with units
 * - Conditional field visibility based on selections
 */
export default class TagDialogContent extends React.Component<TagDialogContentProps, TagDialogContentState> {
  /** Flag indicating if component needs refresh */
  needRefresh: boolean;

  /**
   * Handles change events for single-selection tag fields
   * @param fieldConfig - Configuration of the tag field
   * @param selectedItem - The newly selected item
   */
  private _onItemChange(fieldConfig: TagFieldConfig, selectedItem: SelectItem): void;

  /**
   * Handles change events for multi-choice tag fields
   * @param fieldName - Name of the field being changed
   * @param selectedValues - Array of selected values
   */
  private _onMultiChoiceChange(fieldName: string, selectedValues: (string | number)[]): void;

  /**
   * Handles text input change events
   * @param fieldName - Name of the text field
   * @param event - React change event
   */
  private _onTextChange(fieldName: string, event: React.ChangeEvent<HTMLInputElement>): void;

  /**
   * Recursively extracts select items from tag options
   * @param options - Tag option(s) to process
   * @returns Flattened array of select items
   */
  getOptions(options: TagOption | TagOption[]): SelectItem[];

  /**
   * Renders a single-selection tag field with dropdown(s)
   * @param fieldConfig - Tag field configuration
   * @param selectItems - Available options for selection
   * @returns Array of React elements representing the field
   */
  renderSingle(fieldConfig: TagFieldConfig, selectItems: SelectItem[]): JSX.Element[];

  /**
   * Renders a multi-selection tag field with checkboxes
   * @param fieldConfig - Tag field configuration
   * @param selectItems - Available options for selection
   * @returns Array of React elements representing the field
   */
  renderMulti(fieldConfig: TagFieldConfig, selectItems: SelectItem[]): JSX.Element[];

  /**
   * Renders a text input tag field
   * @param fieldConfig - Tag field configuration
   * @returns Array of React elements representing the field
   */
  renderInput(fieldConfig: TagFieldConfig): JSX.Element[];
}