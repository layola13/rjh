/**
 * Utility functions for handling select component values and client-side detection
 */

/**
 * Configuration options for value transformation
 */
export interface ValueTransformOptions {
  /** Property name to use for option labels */
  optionLabelProp?: string;
  /** Whether values should include label information */
  labelInValue?: boolean;
  /** Map of previously selected values */
  prevValueMap?: Map<any, any>;
  /** Available options for the select */
  options?: any[];
  /** Function to get labeled value representation */
  getLabeledValue?: (value: any, context: ValueContext) => LabeledValue;
  /** Whether the select is in combobox mode */
  combobox?: boolean;
}

/**
 * Context information for value transformation
 */
export interface ValueContext {
  /** Available options */
  options: any[];
  /** Map of previous values */
  prevValueMap: Map<any, any>;
  /** Whether to include labels in values */
  labelInValue: boolean;
  /** Property name for option labels */
  optionLabelProp: string;
}

/**
 * Labeled value structure
 */
export interface LabeledValue {
  /** The value key */
  key?: any;
  /** The actual value */
  value?: any;
  /** The label text */
  label?: string;
}

/**
 * Result of removing last enabled value
 */
export interface RemoveLastEnabledResult<T> {
  /** Remaining values after removal */
  values: T[];
  /** The removed value, or null if none was removed */
  removedValue: T | null;
}

/**
 * Indicates whether code is running in a browser client environment
 * Checks for window, document, and documentElement existence
 */
export const isClient: boolean;

/**
 * Alias for isClient - indicates browser client environment
 */
export const isBrowserClient: boolean;

/**
 * Generates a unique identifier
 * Returns incrementing numbers in client environment, "TEST_OR_SSR" otherwise
 * @returns Unique identifier string or number
 */
export function getUUID(): number | "TEST_OR_SSR";

/**
 * Converts a value to an array
 * @param value - Value to convert (can be single value, array, or undefined)
 * @returns Array containing the value(s), or empty array if undefined
 */
export function toArray<T>(value: T | T[] | undefined): T[];

/**
 * Converts external value format to internal representation
 * Handles labeled values and combobox mode
 * @param value - Input value(s) to convert
 * @param options - Transformation options
 * @returns Tuple of [converted values array, value map]
 */
export function toInnerValue<T = any>(
  value: T | T[] | undefined,
  options: Pick<ValueTransformOptions, "labelInValue" | "combobox">
): [T[], Map<T, LabeledValue>];

/**
 * Converts internal values to external format
 * Applies labeling when labelInValue is enabled
 * @param values - Internal values to convert
 * @param options - Transformation options including label context
 * @returns Converted values in external format
 */
export function toOuterValues<T = any>(
  values: T[],
  options: Required<Pick<ValueTransformOptions, "optionLabelProp" | "labelInValue" | "prevValueMap" | "options" | "getLabeledValue">>
): (T | LabeledValue)[];

/**
 * Removes the last enabled (non-disabled) value from an array
 * Scans from end to find first non-disabled item and removes it
 * @param values - Array of values with potential disabled property
 * @param cloneFunction - Function to clone the values array
 * @returns Object containing remaining values and the removed value
 */
export function removeLastEnabledValue<T extends { disabled?: boolean }>(
  values: T[],
  cloneFunction: (arr: T[]) => T[]
): RemoveLastEnabledResult<T>;