/**
 * Measures the scrollbar dimensions of the browser or a specific element.
 * This module provides utilities to calculate scrollbar width and height,
 * which is useful for layout calculations and preventing content shift.
 */

/**
 * Scrollbar size measurement result
 */
export interface ScrollBarSize {
  /** Width of the vertical scrollbar in pixels */
  width: number;
  /** Height of the horizontal scrollbar in pixels */
  height: number;
}

/**
 * Cached global scrollbar size to avoid repeated DOM measurements
 */
let cachedScrollBarSize: ScrollBarSize | undefined;

/**
 * Gets the default scrollbar size for the current browser.
 * Returns cached value if available and forceRecalculate is false.
 * 
 * @param forceRecalculate - If true, forces a new measurement instead of using cache
 * @returns The width of the scrollbar in pixels, or 0 if not in browser environment
 * 
 * @example
 *