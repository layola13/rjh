/**
 * Resize directive for Vue 2.x
 * Listens to window resize events and executes a callback
 * @module Resize
 */

/**
 * Callback function type for resize events
 */
export type ResizeCallback = (event?: UIEvent) => void;

/**
 * AddEventListener options for resize event
 */
export interface ResizeEventOptions extends AddEventListenerOptions {
  /**
   * Indicates that the event listener will never call preventDefault()
   * @default true
   */
  passive?: boolean;
  /**
   * If true, the listener will be automatically removed after first invocation
   */
  once?: boolean;
  /**
   * If true, the event will be dispatched to this listener before any other EventTarget beneath it in the DOM tree
   */
  capture?: boolean;
}

/**
 * Internal state stored on the element
 */
interface ResizeElementState {
  /**
   * The resize callback function
   */
  callback: ResizeCallback;
  /**
   * Event listener options
   */
  options: ResizeEventOptions;
}

/**
 * Extended HTMLElement with resize directive state
 */
interface ResizeElement extends HTMLElement {
  /**
   * Internal storage for resize directive state
   */
  _onResize?: ResizeElementState;
}

/**
 * Vue directive binding for resize
 */
export interface ResizeDirectiveBinding {
  /**
   * The resize callback function passed to the directive
   */
  value: ResizeCallback;
  /**
   * Event listener options (defaults to { passive: true })
   */
  options?: ResizeEventOptions;
  /**
   * Directive modifiers
   */
  modifiers?: {
    /**
     * If true, prevents immediate invocation of callback on bind
     */
    quiet?: boolean;
    [key: string]: boolean | undefined;
  };
}

/**
 * Vue 2.x Resize Directive
 * 
 * Usage:
 * - v-resize="onResizeCallback" - Calls callback on window resize and immediately on mount
 * - v-resize.quiet="onResizeCallback" - Calls callback only on resize, not on mount
 * 
 * @example
 *