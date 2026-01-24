/**
 * Scroll state information stored for each scrollable element
 */
interface ScrollState {
  /** Height of the scrollable content */
  contentHeight: number;
  /** Height of the visible container */
  containerHeight: number;
  /** Width of the scrollable content */
  contentWidth: number;
  /** Width of the visible container */
  containerWidth: number;
  /** Last recorded vertical scroll position */
  lastTop?: number;
  /** Last recorded horizontal scroll position */
  lastLeft?: number;
}

/**
 * Module for managing scroll state
 * Provides access to scroll dimensions and positions for elements
 */
declare module 'scroll-state-manager' {
  /**
   * Retrieves the scroll state for a given element
   * @param element - The DOM element to get scroll state for
   * @returns The scroll state information
   */
  export function get(element: HTMLElement): ScrollState;
}

/**
 * Axis direction for scroll updates
 */
type ScrollAxis = 'top' | 'left';

/**
 * Updates the scroll position of an element and dispatches appropriate scroll events.
 * 
 * This function handles:
 * - Boundary checks (start/end of scroll area)
 * - Direction detection (up/down for vertical, left/right for horizontal)
 * - Custom event dispatching for scroll state changes
 * 
 * Events dispatched:
 * - `ps-y-reach-start`: Vertical scroll reached top
 * - `ps-y-reach-end`: Vertical scroll reached bottom
 * - `ps-x-reach-start`: Horizontal scroll reached left edge
 * - `ps-x-reach-end`: Horizontal scroll reached right edge
 * - `ps-scroll-up`: Scrolled upward
 * - `ps-scroll-down`: Scrolled downward
 * - `ps-scroll-left`: Scrolled left
 * - `ps-scroll-right`: Scrolled right
 * - `ps-scroll-y`: Vertical scroll position changed
 * - `ps-scroll-x`: Horizontal scroll position changed
 * 
 * @param element - The DOM element to update scroll position for
 * @param axis - The scroll axis to update ('top' for vertical, 'left' for horizontal)
 * @param value - The new scroll position value in pixels
 * @throws {string} When element, axis, or value parameters are undefined
 * 
 * @example
 *