/**
 * Scroll directive for Vue.js
 * Attaches scroll event listeners to elements with support for modifiers and custom targets
 */

import { DirectiveOptions, VNode } from 'vue';

/**
 * Scroll event handler type
 */
export type ScrollHandler = 
  | ((event: Event) => void)
  | { handleEvent(event: Event): void; handler?: (event: Event) => void };

/**
 * Scroll directive value configuration
 */
export interface ScrollDirectiveValue {
  /**
   * Scroll event handler function or object with handleEvent method
   */
  handler?: ScrollHandler;
  /**
   * AddEventListener options for scroll event
   * @default { passive: true }
   */
  options?: AddEventListenerOptions;
}

/**
 * Internal tracking data attached to bound elements
 */
interface ScrollElementData {
  /**
   * The bound scroll handler
   */
  handler: ScrollHandler;
  /**
   * Event listener options
   */
  options: AddEventListenerOptions;
  /**
   * Target element the listener is attached to (undefined if self)
   */
  target?: EventTarget;
}

/**
 * Extended HTMLElement with scroll tracking data
 */
interface ScrollElement extends HTMLElement {
  _onScroll?: ScrollElementData;
}

/**
 * Default options for scroll event listener
 */
const DEFAULT_SCROLL_OPTIONS: AddEventListenerOptions = {
  passive: true
};

/**
 * Vue directive for handling scroll events with flexible target selection
 * 
 * Usage examples:
 * - v-scroll="handler" - Attaches to window
 * - v-scroll.self="handler" - Attaches to element itself
 * - v-scroll:selector="handler" - Attaches to element matching selector
 * - v-scroll="{ handler, options }" - With custom options
 * 
 * @example
 *