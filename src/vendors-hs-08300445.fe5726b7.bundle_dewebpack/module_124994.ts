/**
 * Utility functions for handling options and values in tree-select components
 * @module TreeSelectUtils
 */

/**
 * Represents a raw value with label information
 */
export interface RawValueLabeled {
  /** The actual value */
  value: any;
  /** Display label for the value */
  label: React.ReactNode;
  /** Whether the option is half-checked (for tree structures) */
  halfChecked?: boolean;
}

/**
 * Represents an option node in the tree structure
 */
export interface OptionNode {
  /** Unique key for the option */
  key: string | number;
  /** The value of the option */
  value: any;
  /** Display label */
  label?: React.ReactNode;
  /** Whether the option is disabled */
  disabled?: boolean;
  /** Whether the checkbox is disabled */
  disableCheckbox?: boolean;
  /** Whether the option is checkable */
  checkable?: boolean;
  /** Child options */
  children?: OptionNode[];
  /** Half-checked state for tree nodes */
  halfChecked?: boolean;
  /** Additional data properties */
  [key: string]: any;
}

/**
 * Flattened option with level information
 */
export interface FlattenedOption {
  /** Option key */
  key: string | number;
  /** Option data */
  data: OptionNode;
  /** Depth level in the tree */
  level: number;
}

/**
 * Configuration for option filtering
 */
export interface FilterConfig {
  /** Property name to use for filtering */
  optionFilterProp: string;
  /** Custom filter function or false to disable filtering */
  filterOption: boolean | ((inputValue: string, option: OptionNode) => boolean);
}

/**
 * Function to convert a value to its display label
 */
export type ValueToLabelConverter = (value: any) => React.ReactNode;

/**
 * Adds a value to an array and returns a new array with unique values
 * @param values - Original array of values
 * @param value - Value to add
 * @returns New array with the added value
 */
export declare function addValue<T>(values: T[], value: T): T[];

/**
 * Removes a value from an array and returns a new array
 * @param values - Original array of values
 * @param value - Value to remove
 * @returns New array without the removed value
 */
export declare function removeValue<T>(values: T[], value: T): T[];

/**
 * Converts a value to an array. Returns the value wrapped in an array if not already an array.
 * @param value - Value to convert (can be undefined, single value, or array)
 * @returns Array representation of the value
 */
export declare function toArray<T>(value: T | T[] | undefined): T[];

/**
 * Filters options based on search input and filter configuration
 * @param searchValue - The search input value
 * @param options - Array of options to filter
 * @param config - Filter configuration
 * @returns Filtered options maintaining tree structure
 */
export declare function filterOptions(
  searchValue: string,
  options: OptionNode[],
  config: FilterConfig
): OptionNode[];

/**
 * Finds option nodes corresponding to given values
 * @param values - Array of values to find
 * @param flattenedOptions - Flattened array of all options
 * @returns Array of matching option nodes (may contain undefined for values not found)
 */
export declare function findValueOption(
  values: any[],
  flattenedOptions: FlattenedOption[]
): (OptionNode | undefined)[];

/**
 * Flattens a tree structure of options into a single-level array with level information
 * @param options - Tree-structured options
 * @returns Flattened array of options with depth level
 */
export declare function flattenOptions(options: OptionNode[]): FlattenedOption[];

/**
 * Converts raw values to labeled value objects with display information
 * @param values - Array of raw values
 * @param options - All available options
 * @param valueGetter - Function to retrieve option by value
 * @param labelConverter - Function to convert value/option to display label
 * @returns Array of labeled values with display information
 */
export declare function getRawValueLabeled(
  values: any[],
  options: (OptionNode | any)[],
  valueGetter: (value: any, type: string, returnFirst: boolean) => FlattenedOption | undefined,
  labelConverter: ValueToLabelConverter
): RawValueLabeled[];

/**
 * Checks if an option's checkbox should be disabled
 * @param option - The option to check
 * @returns True if the checkbox is disabled
 */
export declare function isCheckDisabled(option: OptionNode): boolean;

/**
 * Checks if a value is disabled based on its corresponding option
 * @param value - The value to check
 * @param flattenedOptions - Flattened array of all options
 * @returns True if the value's option is disabled
 */
export declare function isValueDisabled(value: any, flattenedOptions: FlattenedOption[]): boolean;