/**
 * Resize directive for Vue.js
 * Listens to window resize events and triggers a callback
 * @module Resize
 */

/**
 * Options for the resize event listener
 */
export interface ResizeEventOptions extends AddEventListenerOptions {
  /** Whether the event listener is passive (default: true) */
  passive?: boolean;
}

/**
 * Callback function type for resize events
 */
export type ResizeCallback = (event?: UIEvent) => void;

/**
 * Internal state stored on the element
 */
interface ResizeElementState {
  /** The resize callback function */
  callback: ResizeCallback;
  /** Event listener options */
  options: ResizeEventOptions;
}

/**
 * Extended HTML element with resize state
 */
interface ResizeElement extends HTMLElement {
  /** Internal state for resize directive */
  _onResize?: ResizeElementState;
}

/**
 * Vue directive binding for resize
 */
export interface ResizeDirectiveBinding {
  /** The resize callback function */
  value: ResizeCallback;
  /** Event listener options */
  options?: ResizeEventOptions;
  /** Directive modifiers */
  modifiers?: {
    /** If true, prevents immediate callback invocation on insert */
    quiet?: boolean;
  };
}

/**
 * Vue resize directive
 * Automatically attaches/detaches window resize listeners
 */
export interface ResizeDirective {
  /**
   * Called when the bound element is inserted into the DOM
   * @param element - The element the directive is bound to
   * @param binding - The directive binding object
   */
  inserted(element: ResizeElement, binding: ResizeDirectiveBinding): void;

  /**
   * Called when the directive is unbound from the element
   * @param element - The element the directive was bound to
   */
  unbind(element: ResizeElement): void;
}

/**
 * Resize directive instance
 */
export declare const Resize: ResizeDirective;

/**
 * Default export of the Resize directive
 */
declare const _default: ResizeDirective;
export default _default;