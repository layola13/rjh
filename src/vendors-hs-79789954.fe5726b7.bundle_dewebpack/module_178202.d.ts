/**
 * Selection mode constants for range-based selection operations.
 * Defines how selection boundaries interact with target ranges.
 */

/**
 * Selection starts at the beginning of a range
 */
export const START = "start";

/**
 * Selection ends at the end of a range
 */
export const END = "end";

/**
 * Selection is contained between two points within a range
 */
export const BETWEEN = "between";

/**
 * Selection extends beyond the current range boundaries
 */
export const EXTEND = "extend";

/**
 * No selection is active
 */
export const NONE = "none";

/**
 * Union type of all possible selection mode values
 */
export type SelectionMode = typeof START | typeof END | typeof BETWEEN | typeof EXTEND | typeof NONE;

/**
 * Default export containing all selection mode constants
 */
declare const selectionModes: {
  readonly START: "start";
  readonly END: "end";
  readonly BETWEEN: "between";
  readonly EXTEND: "extend";
  readonly NONE: "none";
};

export default selectionModes;