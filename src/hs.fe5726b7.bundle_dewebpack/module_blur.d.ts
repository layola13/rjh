/**
 * Blur module - Handles focus loss and menu collapse behavior
 * @module module_blur
 */

/**
 * Options for blur behavior configuration
 */
export interface BlurOptions {
  /** Delay in milliseconds before executing blur action */
  delay?: number;
  /** Whether to collapse all items on blur */
  collapseAll?: boolean;
}

/**
 * Event handler context for blur operations
 */
export interface BlurContext {
  /** Root DOM element of the component */
  element: JQuery | HTMLElement[];
  /** Reference to the document object */
  document: Document[];
  
  /**
   * Delays execution of a callback function
   * @param callback - Function to execute after delay
   * @param delay - Optional delay duration in milliseconds
   */
  _delay(callback: () => void, delay?: number): void;
  
  /**
   * Collapses all expandable items in the component
   * @param event - The triggering event object
   */
  collapseAll(event: Event): void;
}

/**
 * Handles blur event - collapses menu when focus moves outside the component
 * @param this - The component context
 * @param event - The blur event object
 */
export declare function handleBlur(this: BlurContext, event: Event): void;

/**
 * jQuery utility function to check if element contains another
 */
export declare namespace contains {
  /**
   * Checks if a container element contains a descendant element
   * @param container - The potential parent element
   * @param element - The element to check for containment
   * @returns True if container contains element
   */
  function contains(container: Element, element: Element): boolean;
}