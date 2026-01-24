/**
 * Filters props object to include only whitelisted HTML attributes, ARIA attributes, and data attributes.
 * 
 * @param props - The props object to filter
 * @param options - Filtering options. Can be:
 *   - `false`: Include aria, data, and standard HTML attributes (default)
 *   - `true`: Include only aria attributes
 *   - Object: Custom configuration with `aria`, `data`, and `attr` flags
 * @returns A new object containing only the filtered props
 */
export default function filterProps(
  props: Record<string, unknown>,
  options?: boolean | FilterOptions
): Record<string, unknown>;

/**
 * Configuration options for prop filtering
 */
export interface FilterOptions {
  /**
   * Include ARIA attributes (aria-* and role)
   * @default false
   */
  aria?: boolean;

  /**
   * Include data attributes (data-*)
   * @default false
   */
  data?: boolean;

  /**
   * Include standard HTML attributes
   * @default false
   */
  attr?: boolean;
}

/**
 * Prefix for ARIA attributes
 */
declare const ARIA_PREFIX = "aria-";

/**
 * Prefix for data attributes
 */
declare const DATA_PREFIX = "data-";

/**
 * Whitelist of standard HTML attributes and event handlers
 */
declare const WHITELISTED_ATTRIBUTES: readonly string[];

/**
 * Checks if an attribute name starts with the given prefix
 * 
 * @param attributeName - The attribute name to check
 * @param prefix - The prefix to match against
 * @returns `true` if the attribute starts with the prefix
 */
declare function startsWith(attributeName: string, prefix: string): boolean;