/**
 * Target type that can be used to specify scroll position or element location.
 * Can be a numeric offset, CSS selector, DOM element, or Vue component instance.
 */
export type Target = number | string | HTMLElement | VueComponent;

/**
 * Container type that can be used to specify a scrolling container.
 * Can be a CSS selector, DOM element, or Vue component instance.
 */
export type Container = string | HTMLElement | VueComponent;

/**
 * Vue component interface with internal properties.
 */
interface VueComponent {
  /** Internal Vue flag indicating this is a Vue instance */
  _isVue: boolean;
  /** The root DOM element of the Vue component */
  $el: HTMLElement;
}

/**
 * Calculates the absolute offset (top position) of a target element from the document top.
 * 
 * @param target - A number representing offset, CSS selector, HTMLElement, or Vue component
 * @returns The vertical offset in pixels from the document top
 * @throws {Error} When a string selector doesn't match any element
 * @throws {TypeError} When target type is invalid
 * 
 * @example
 *