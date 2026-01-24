/**
 * Vue Scroll Directive
 * Provides scroll event handling for DOM elements with support for custom targets and modifiers
 */

/**
 * Scroll event handler function type
 * Can be a standard event handler or an object with handleEvent method
 */
type ScrollHandler = 
  | ((event: Event) => void)
  | { handleEvent: (event: Event) => void };

/**
 * Scroll directive value configuration
 */
interface ScrollDirectiveValue {
  /**
   * The scroll event handler function or object
   */
  handler: ScrollHandler;
  
  /**
   * Event listener options passed to addEventListener
   * @default { passive: true }
   */
  options?: AddEventListenerOptions | boolean;
}

/**
 * Scroll directive binding type
 * Can be a function, handler object, or full configuration
 */
type ScrollDirectiveBinding = 
  | ScrollHandler 
  | ScrollDirectiveValue;

/**
 * Internal scroll state stored on element
 */
interface ScrollState {
  /**
   * The scroll event handler
   */
  handler: ScrollHandler;
  
  /**
   * Event listener options
   */
  options: AddEventListenerOptions | boolean;
  
  /**
   * The target element for scroll events
   * undefined means the element itself (self modifier)
   */
  target?: EventTarget;
}

/**
 * Extended HTML element with internal scroll state
 */
interface ScrollElement extends HTMLElement {
  /**
   * Internal property to store scroll binding state
   * @internal
   */
  _onScroll?: ScrollState;
}

/**
 * Vue directive binding object
 */
interface DirectiveBinding<T = unknown> {
  /**
   * The value passed to the directive
   */
  value: T;
  
  /**
   * An object containing modifiers
   */
  modifiers?: Record<string, boolean>;
  
  /**
   * The argument passed to the directive (e.g., v-scroll:window)
   */
  arg?: string;
}

/**
 * Vue Scroll Directive
 * 
 * @example
 * Basic usage:
 *