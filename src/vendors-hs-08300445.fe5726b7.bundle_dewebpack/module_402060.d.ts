/**
 * Utility functions for handling select options in a dropdown component.
 * Provides functionality for filtering, flattening, and managing option values.
 */

/**
 * Represents a basic option value in a select component.
 */
export interface OptionValue {
  /** The unique value identifier for this option */
  value: string | number;
  /** The display label for this option */
  label?: React.ReactNode;
  /** Whether this option is disabled */
  disabled?: boolean;
  /** Internal cache flag for option value */
  _INTERNAL_OPTION_VALUE_?: string | number;
  /** Additional properties allowed on options */
  [key: string]: unknown;
}

/**
 * Represents an option group containing multiple options.
 */
export interface OptionGroup {
  /** The label for this option group */
  label: React.ReactNode;
  /** The options contained within this group */
  options: OptionValue[];
  /** Additional properties allowed on option groups */
  [key: string]: unknown;
}

/**
 * Union type representing either a single option or an option group.
 */
export type SelectOption = OptionValue | OptionGroup;

/**
 * Flattened option structure used internally for rendering.
 */
export interface FlattenedOption {
  /** Unique key for rendering */
  key: string | number;
  /** Whether this is a group header */
  group?: boolean;
  /** Whether this is an option within a group */
  groupOption?: boolean;
  /** The original option data */
  data: SelectOption;
}

/**
 * Labeled value structure containing both value and display label.
 */
export interface LabeledValue {
  /** The option value */
  value: string | number;
  /** The display label */
  label: React.ReactNode;
  /** Unique key identifier */
  key: string | number;
  /** Whether this value can be cached */
  isCacheable?: boolean;
}

/**
 * Configuration options for filtering select options.
 */
export interface FilterConfig {
  /** The property name to use for filtering (default: 'value') */
  optionFilterProp: string;
  /** Custom filter function or false to disable filtering */
  filterOption: boolean | ((inputValue: string, option: SelectOption) => boolean);
}

/**
 * Options for the findValueOption function.
 */
export interface FindValueOptions {
  /** Previously selected value options for caching */
  prevValueOptions?: OptionValue[];
}

/**
 * Configuration for getLabeledValue function.
 */
export interface GetLabeledValueConfig {
  /** All available options */
  options: FlattenedOption[];
  /** Map of previously selected values */
  prevValueMap: Map<string | number, LabeledValue>;
  /** Whether values should include labels */
  labelInValue: boolean;
  /** Property name to use for option labels */
  optionLabelProp: string;
}

/**
 * Fills missing options with new values.
 * Merges existing options with new values that aren't already present.
 *
 * @param existingOptions - The current array of options
 * @param newValues - New values to add if missing
 * @param labelProp - Property name to use for labels
 * @param hasLabelProperty - Whether new values include a label property
 * @returns Updated array of options with missing values filled
 */
export function fillOptionsWithMissingValue(
  existingOptions: SelectOption[],
  newValues: OptionValue[] | string[] | number[],
  labelProp: string,
  hasLabelProperty: boolean
): SelectOption[];

/**
 * Filters options based on search input and filter configuration.
 * Supports filtering both flat options and grouped options.
 *
 * @param searchValue - The search string to filter by
 * @param options - The options to filter
 * @param config - Filter configuration
 * @returns Filtered array of options
 */
export function filterOptions(
  searchValue: string,
  options: SelectOption[],
  config: FilterConfig
): SelectOption[];

/**
 * Finds option data for given values.
 * Returns full option objects for an array of values.
 *
 * @param values - Array of values to find options for
 * @param flattenedOptions - Flattened options to search within
 * @param options - Additional configuration options
 * @returns Array of option values with their full data
 */
export function findValueOption(
  values: (string | number)[],
  flattenedOptions: FlattenedOption[],
  options?: FindValueOptions
): OptionValue[];

/**
 * Flattens nested option groups into a single-level array.
 * Converts hierarchical option structure to flat list for easier processing.
 *
 * @param options - Options array that may contain nested groups
 * @returns Flattened array of options with metadata
 */
export function flattenOptions(options: SelectOption[]): FlattenedOption[];

/**
 * Creates a labeled value object from a raw value.
 * Enriches a simple value with its label and key from options.
 *
 * @param value - The raw option value
 * @param config - Configuration including options and label settings
 * @returns Labeled value object with value, label, and key
 */
export function getLabeledValue(
  value: string | number,
  config: GetLabeledValueConfig
): LabeledValue;

/**
 * Splits content string by multiple separators.
 * Used for tokenizing multi-value input.
 *
 * @param content - The string content to split
 * @param separators - Array of separator strings
 * @returns Array of split strings, or null if no splitting occurred
 */
export function getSeparatedContent(
  content: string,
  separators: string[]
): string[] | null;

/**
 * Checks if a specific value is disabled in the options.
 *
 * @param value - The value to check
 * @param flattenedOptions - Flattened options to search within
 * @returns True if the value is disabled, false otherwise
 */
export function isValueDisabled(
  value: string | number,
  flattenedOptions: FlattenedOption[]
): boolean;