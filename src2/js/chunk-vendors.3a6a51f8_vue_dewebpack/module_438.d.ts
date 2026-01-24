/**
 * Event delegation utility module
 * Provides cross-browser event delegation with automatic cleanup
 */

/**
 * Handler for delegated events
 */
type DelegatedEventHandler = (event: Event) => void;

/**
 * Cleanup interface for removing event listeners
 */
interface EventListenerCleanup {
  /**
   * Removes the attached event listener
   */
  destroy(): void;
}

/**
 * Finds the closest ancestor element matching a selector
 * @param element - Starting element
 * @param selector - CSS selector to match
 * @returns Matching element or null
 */
declare function closest(element: Element, selector: string): Element | null;

/**
 * Attaches a delegated event listener to a single element
 * @param element - Target element to attach listener to
 * @param selector - CSS selector for delegation
 * @param eventType - Event type (e.g., 'click', 'focus')
 * @param handler - Event handler function
 * @param options - Event listener options
 * @returns Cleanup object with destroy method
 */
declare function attachDelegatedListener(
  element: Element,
  selector: string,
  eventType: string,
  handler: DelegatedEventHandler,
  options?: boolean | AddEventListenerOptions
): EventListenerCleanup;

/**
 * Attaches delegated event listeners with flexible target selection
 * 
 * Supports multiple signatures:
 * 1. Single element: delegate(element, selector, eventType, handler, options)
 * 2. Document default: delegate(selector, eventType, handler, options)
 * 3. Multiple elements: delegate(cssSelector, selector, eventType, handler, options)
 * 
 * @param elementOrSelector - Element, CSS selector string, or NodeList
 * @param selector - CSS selector for event delegation
 * @param eventType - Event type to listen for
 * @param handler - Event handler function
 * @param options - Event listener options (capture, once, passive)
 * @returns Single cleanup object or array of cleanup objects
 */
declare function delegate(
  elementOrSelector: Element | string | NodeListOf<Element>,
  selector: string,
  eventType: string,
  handler: DelegatedEventHandler,
  options?: boolean | AddEventListenerOptions
): EventListenerCleanup | EventListenerCleanup[];

export = delegate;