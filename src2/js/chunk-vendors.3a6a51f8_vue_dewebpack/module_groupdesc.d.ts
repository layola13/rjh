/**
 * Utility type for values that can be either a single item or an array of items
 */
type ArrayOrSingle<T> = T | T[];

/**
 * Configuration options interface
 */
interface ConfigurationOptions {
  /** Group description configuration */
  groupDesc?: unknown[];
  [key: string]: unknown;
}

/**
 * Updates the configuration options with a group description.
 * 
 * This method accepts a group description value (or array of values) and wraps it
 * in an array format before updating the configuration. If a single value is provided,
 * it will be automatically converted to an array.
 * 
 * @param groupDescValue - The group description value(s) to set. Can be a single value
 *                         or an array of values. Will be normalized to an array internally.
 * 
 * @example
 *