/**
 * Perfect Scrollbar cleanup module
 * Destroys a Perfect Scrollbar instance and removes all associated DOM elements and event listeners
 */

/**
 * Scrollbar state stored in the internal registry
 */
interface PerfectScrollbarState {
  /** Event management object */
  event: {
    /** Removes all bound event listeners */
    unbindAll(): void;
  };
  /** The horizontal scrollbar DOM element */
  scrollbarX: HTMLElement;
  /** The vertical scrollbar DOM element */
  scrollbarY: HTMLElement;
  /** The horizontal scrollbar track/rail element */
  scrollbarXRail: HTMLElement;
  /** The vertical scrollbar track/rail element */
  scrollbarYRail: HTMLElement;
}

/**
 * Internal state registry for Perfect Scrollbar instances
 */
declare module 'perfect-scrollbar/state-registry' {
  /**
   * Retrieves the scrollbar state for a given element
   * @param element - The DOM element with Perfect Scrollbar initialized
   * @returns The scrollbar state object, or undefined if not found
   */
  export function get(element: HTMLElement): PerfectScrollbarState | undefined;
  
  /**
   * Removes the scrollbar state from the registry
   * @param element - The DOM element to remove from the registry
   */
  export function remove(element: HTMLElement): void;
}

/**
 * DOM utilities for element removal
 */
declare module 'perfect-scrollbar/dom-utils' {
  /**
   * Removes a DOM element from the document
   * @param element - The element to remove
   */
  export function remove(element: HTMLElement): void;
}

/**
 * CSS class management utilities
 */
declare module 'perfect-scrollbar/class-utils' {
  /**
   * Removes all Perfect Scrollbar CSS classes from an element
   * @param element - The element to clean up
   */
  export function removePsClasses(element: HTMLElement): void;
}

/**
 * Destroys a Perfect Scrollbar instance on the specified element
 * 
 * This function performs complete cleanup:
 * 1. Unbinds all event listeners
 * 2. Removes scrollbar DOM elements (X/Y bars and rails)
 * 3. Removes Perfect Scrollbar CSS classes
 * 4. Clears the element from the internal state registry
 * 
 * @param element - The DOM element with an initialized Perfect Scrollbar instance
 * 
 * @example
 *