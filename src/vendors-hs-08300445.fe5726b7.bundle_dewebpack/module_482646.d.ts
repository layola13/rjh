/**
 * Options caching hook for select components.
 * Preserves previously selected option labels even when options list changes.
 */

/**
 * Represents a selectable option with caching capability
 */
export interface CacheableOption {
  /** Unique identifier for the option */
  value: string | number;
  /** Display text for the option */
  label: string;
  /** Whether this option's label should be cached when value matches */
  isCacheable?: boolean;
}

/**
 * Custom React hook that caches option labels by their values.
 * When options change, previously cached labels are restored for matching values
 * if the option is marked as cacheable.
 * 
 * @param options - Array of selectable options
 * @returns Processed options array with restored cached labels where applicable
 * 
 * @example
 *