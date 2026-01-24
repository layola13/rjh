/**
 * Tree select utility functions for handling options, values, and filtering
 */

/**
 * Option data structure
 */
export interface OptionData {
  value: any;
  key?: string | number;
  label?: React.ReactNode;
  title?: string;
  disabled?: boolean;
  disableCheckbox?: boolean;
  checkable?: boolean;
  children?: OptionData[];
  [key: string]: any;
}

/**
 * Flattened option with level information
 */
export interface FlattenedOption {
  key: string | number;
  data: OptionData;
  level: number;
}

/**
 * Raw value with label
 */
export interface RawValueLabeled {
  value: any;
  label: React.ReactNode;
  halfChecked?: boolean;
}

/**
 * Filter option configuration
 */
export interface FilterConfig {
  optionFilterProp: string;
  filterOption: boolean | ((inputValue: string, option: OptionData) => boolean);
}

/**
 * Tree node with parent reference
 */
export interface TreeNode {
  data: OptionData;
  parent?: TreeNode;
}

/**
 * Converts value to array format
 * @param value - Single value or array of values
 * @returns Array of values
 */
export function toArray<T>(value: T | T[] | undefined): T[];

/**
 * Adds a value to the existing value set
 * @param values - Current array of values
 * @param value - Value to add
 * @returns New array with added value (duplicates removed)
 */
export function addValue<T>(values: T[], value: T): T[];

/**
 * Removes a value from the existing value set
 * @param values - Current array of values
 * @param value - Value to remove
 * @returns New array without the removed value
 */
export function removeValue<T>(values: T[], value: T): T[];

/**
 * Filters options based on search input and filter configuration
 * @param searchValue - Input search string
 * @param options - Array of options to filter
 * @param config - Filter configuration
 * @returns Filtered options (preserves tree structure if children match)
 */
export function filterOptions(
  searchValue: string,
  options: OptionData[],
  config: FilterConfig
): OptionData[];

/**
 * Flattens tree-structured options into a flat array with level information
 * @param options - Tree-structured options
 * @returns Flattened array of options with their depth level
 */
export function flattenOptions(options: OptionData[]): FlattenedOption[];

/**
 * Finds option data for given values
 * @param values - Array of values to find
 * @param flattenedOptions - Flattened options to search in
 * @returns Array of matching option data (or undefined for not found)
 */
export function findValueOption(
  values: any[],
  flattenedOptions: FlattenedOption[]
): (OptionData | undefined)[];

/**
 * Converts raw values to labeled format with additional metadata
 * @param values - Array of raw values
 * @param options - Original options (may include pre-labeled values)
 * @param valueFinder - Function to find option by value
 * @param labelGetter - Function to extract label from option data
 * @returns Array of values with labels and optional halfChecked state
 */
export function getRawValueLabeled(
  values: any[],
  options: (any | RawValueLabeled)[],
  valueFinder: (value: any, type: string, legacyFill: boolean) => FlattenedOption | undefined,
  labelGetter: (data: OptionData) => React.ReactNode
): RawValueLabeled[];

/**
 * Checks if an option is disabled for checking/selection
 * @param option - Option data to check
 * @returns True if option cannot be checked
 */
export function isCheckDisabled(option: OptionData): boolean;

/**
 * Checks if a specific value is disabled
 * @param value - Value to check
 * @param flattenedOptions - Flattened options to search in
 * @returns True if value is disabled, false otherwise
 */
export function isValueDisabled(value: any, flattenedOptions: FlattenedOption[]): boolean;