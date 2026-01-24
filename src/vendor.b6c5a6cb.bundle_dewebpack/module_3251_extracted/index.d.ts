/**
 * Type definitions for Webpack bundle modules
 * Contains declarations for DOM manipulation and event handling utilities
 */

/**
 * CSS manipulation module
 * Handles getting and setting CSS styles on elements
 */
declare module 'module_css' {
  /**
   * Get or set CSS properties on elements
   * @param element - Target DOM element(s)
   * @param property - CSS property name or object of property-value pairs
   * @param value - CSS property value (optional, for setter)
   * @returns Current value when getting, element(s) when setting for chaining
   */
  export function css(
    element: Element | Element[] | NodeListOf<Element>,
    property: string | Record<string, string | number>,
    value?: string | number
  ): string | Element | Element[] | NodeListOf<Element>;
}

/**
 * Data attribute checking module
 * Checks if elements have associated data
 */
declare module 'module_hasdata' {
  /**
   * Check if element has data attributes or stored data
   * @param element - Target DOM element
   * @returns True if element has data, false otherwise
   */
  export function hasData(element: Element): boolean;
}

/**
 * Collection filtering module
 * Filters elements based on selector or function
 */
declare module 'module_filter' {
  /**
   * Filter elements by selector or predicate function
   * @param elements - Collection of elements to filter
   * @param selector - CSS selector string or filter function
   * @returns Filtered array of elements
   */
  export function filter(
    elements: Element[] | NodeListOf<Element>,
    selector: string | ((element: Element, index: number) => boolean)
  ): Element[];
}

/**
 * Collection merging module
 * Adds elements back to a previous set
 */
declare module 'module_addback' {
  /**
   * Add previous set of elements back to current set
   * @param current - Current element collection
   * @param previous - Previous element collection to merge
   * @param selector - Optional selector to filter previous set
   * @returns Merged element collection
   */
  export function addBack(
    current: Element[],
    previous: Element[],
    selector?: string
  ): Element[];
}

/**
 * Current value getter module
 * Gets current value of form elements
 */
declare module 'module_cur' {
  /**
   * Get current value from form element or computed property
   * @param element - Target form element
   * @param property - Property name to retrieve
   * @returns Current value
   */
  export function cur(element: HTMLElement, property: string): string | number;
}

/**
 * Negation filtering module
 * Filters out elements matching selector
 */
declare module 'module_not' {
  /**
   * Remove elements matching selector from collection
   * @param elements - Element collection
   * @param selector - CSS selector or function to exclude
   * @returns Filtered elements not matching selector
   */
  export function not(
    elements: Element[] | NodeListOf<Element>,
    selector: string | ((element: Element, index: number) => boolean)
  ): Element[];
}

/**
 * Element retrieval module
 * Gets element at specific index
 */
declare module 'module_get' {
  /**
   * Get element at specified index from collection
   * @param elements - Element collection
   * @param index - Zero-based index (negative counts from end)
   * @returns Element at index or undefined
   */
  export function get(
    elements: Element[] | NodeListOf<Element>,
    index: number
  ): Element | undefined;
}

/**
 * Event handler removal module
 * Removes event listeners from elements
 */
declare module 'module_off' {
  type EventHandler = (event: Event) => void;

  /**
   * Remove event listener(s) from element(s)
   * @param element - Target element(s)
   * @param eventType - Event type(s) to remove
   * @param handler - Specific handler to remove (optional)
   * @returns Element(s) for chaining
   */
  export function off(
    element: Element | Element[] | NodeListOf<Element>,
    eventType: string,
    handler?: EventHandler
  ): Element | Element[] | NodeListOf<Element>;
}

/**
 * Property accessor module
 * Generic getter/setter for element properties
 */
declare module 'module_access' {
  /**
   * Get or set property value on element(s)
   * @param elements - Target element(s)
   * @param key - Property name
   * @param value - Value to set (optional, for setter)
   * @param chainable - Whether setter should return elements for chaining
   * @returns Property value or element(s) for chaining
   */
  export function access<T = unknown>(
    elements: Element | Element[] | NodeListOf<Element>,
    key: string,
    value?: T,
    chainable?: boolean
  ): T | Element | Element[] | NodeListOf<Element>;
}

/**
 * Element matching module
 * Checks if element matches selector
 */
declare module 'module_is' {
  /**
   * Check if element(s) match selector
   * @param elements - Element(s) to check
   * @param selector - CSS selector or element to match against
   * @returns True if any element matches
   */
  export function is(
    elements: Element | Element[] | NodeListOf<Element>,
    selector: string | Element
  ): boolean;
}

/**
 * Initialization module
 * Initializes element collections or components
 */
declare module 'module_init' {
  /**
   * Initialize component or element collection
   * @param selector - CSS selector, element, or HTML string
   * @param context - Context element for selector (optional)
   * @returns Initialized element collection or component instance
   */
  export function init<T = Element[]>(
    selector: string | Element | Element[],
    context?: Element | Document
  ): T;
}

/**
 * Value setter module
 * Sets values on form elements or properties
 */
declare module 'module_set' {
  /**
   * Set value or property on element(s)
   * @param elements - Target element(s)
   * @param key - Property name or value object
   * @param value - Value to set
   * @returns Element(s) for chaining
   */
  export function set(
    elements: Element | Element[] | NodeListOf<Element>,
    key: string | Record<string, unknown>,
    value?: unknown
  ): Element | Element[] | NodeListOf<Element>;
}

/**
 * Function execution module
 * Executes callback for each element
 */
declare module 'module_run' {
  /**
   * Execute callback for each element in collection
   * @param elements - Element collection
   * @param callback - Function to execute for each element
   * @returns Element collection for chaining
   */
  export function run(
    elements: Element[] | NodeListOf<Element>,
    callback: (element: Element, index: number) => void | boolean
  ): Element[] | NodeListOf<Element>;
}

/**
 * Element containment check module
 * Checks if collection contains specific element
 */
declare module 'module_has' {
  /**
   * Check if element collection contains target element or selector
   * @param elements - Element collection to search
   * @param target - Element or selector to find
   * @returns Filtered elements containing target
   */
  export function has(
    elements: Element[] | NodeListOf<Element>,
    target: string | Element
  ): Element[];
}

/**
 * Class/element addition module
 * Adds classes or appends elements
 */
declare module 'module_add' {
  /**
   * Add class(es) to element(s) or append content
   * @param elements - Target element(s)
   * @param value - Class name(s) or content to add
   * @returns Element(s) for chaining
   */
  export function add(
    elements: Element | Element[] | NodeListOf<Element>,
    value: string | Element | Element[]
  ): Element | Element[] | NodeListOf<Element>;
}

/**
 * Event handler attachment module
 * Attaches event listeners to elements
 */
declare module 'module_on' {
  type EventHandler<E extends Event = Event> = (event: E) => void | boolean;

  /**
   * Attach event listener(s) to element(s)
   * @param element - Target element(s)
   * @param eventType - Event type(s) to listen for
   * @param selector - Delegation selector (optional)
   * @param handler - Event handler function
   * @param options - Event listener options (optional)
   * @returns Element(s) for chaining
   */
  export function on<E extends Event = Event>(
    element: Element | Element[] | NodeListOf<Element>,
    eventType: string,
    selector: string | EventHandler<E>,
    handler?: EventHandler<E>,
    options?: AddEventListenerOptions
  ): Element | Element[] | NodeListOf<Element>;
}

/**
 * Ancestor traversal module
 * Finds closest ancestor matching selector
 */
declare module 'module_closest' {
  /**
   * Find closest ancestor element matching selector
   * @param element - Starting element
   * @param selector - CSS selector to match
   * @param context - Boundary element (optional)
   * @returns Closest matching ancestor or null
   */
  export function closest(
    element: Element,
    selector: string,
    context?: Element
  ): Element | null;
}

/**
 * Data caching module
 * Manages internal data cache for elements
 */
declare module 'module_cache' {
  interface CacheStorage {
    [key: string]: unknown;
  }

  /**
   * Get or create cache object for element
   * @param element - Target element
   * @returns Cache storage object
   */
  export function cache(element: Element): CacheStorage;

  /**
   * Clear cache for element
   * @param element - Target element
   */
  export function clearCache(element: Element): void;
}

/**
 * One-time event handler module
 * Attaches event handler that runs once
 */
declare module 'module_one' {
  type EventHandler<E extends Event = Event> = (event: E) => void;

  /**
   * Attach one-time event listener to element(s)
   * @param element - Target element(s)
   * @param eventType - Event type to listen for
   * @param selector - Delegation selector (optional)
   * @param handler - Event handler function
   * @returns Element(s) for chaining
   */
  export function one<E extends Event = Event>(
    element: Element | Element[] | NodeListOf<Element>,
    eventType: string,
    selector: string | EventHandler<E>,
    handler?: EventHandler<E>
  ): Element | Element[] | NodeListOf<Element>;
}

/**
 * Element removal module
 * Removes elements or classes from DOM
 */
declare module 'module_remove' {
  /**
   * Remove element(s) or class(es) from element(s)
   * @param elements - Target element(s)
   * @param selector - Class name(s) or filter selector (optional)
   * @returns Removed elements
   */
  export function remove(
    elements: Element | Element[] | NodeListOf<Element>,
    selector?: string
  ): Element[];
}

/**
 * Index retrieval module
 * Gets index of element in collection
 */
declare module 'module_index' {
  /**
   * Get index of element in collection or among siblings
   * @param elements - Element collection
   * @param target - Element or selector to find index of
   * @returns Zero-based index or -1 if not found
   */
  export function index(
    elements: Element[] | NodeListOf<Element>,
    target?: string | Element
  ): number;
}

/**
 * Descendant search module
 * Finds descendant elements matching selector
 */
declare module 'module_find' {
  /**
   * Find descendant elements matching selector
   * @param elements - Root element(s) to search within
   * @param selector - CSS selector to match
   * @returns Array of matching descendant elements
   */
  export function find(
    elements: Element | Element[] | NodeListOf<Element>,
    selector: string
  ): Element[];
}