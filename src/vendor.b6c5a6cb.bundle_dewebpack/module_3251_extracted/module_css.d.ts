/**
 * CSS manipulation module for DOM elements
 * Provides functionality to get or set CSS properties on elements
 */

/**
 * Interface representing computed styles cache
 */
interface ComputedStylesCache {
  [key: string]: string;
}

/**
 * Gets one or multiple CSS properties from an element, or sets a CSS property
 * 
 * @param element - The DOM element to manipulate
 * @param property - CSS property name(s) to get/set. Can be a string or an array of strings
 * @param value - Optional value to set. If provided, sets the CSS property; otherwise gets it
 * @returns When getting a single property: returns the property value as string
 *          When getting multiple properties: returns an object mapping property names to their values
 *          When setting a property: returns void
 * 
 * @example
 * // Get single property
 * const color = css(element, 'color');
 * 
 * @example
 * // Get multiple properties
 * const styles = css(element, ['color', 'background-color']);
 * // Returns: { color: 'rgb(0,0,0)', 'background-color': 'rgb(255,255,255)' }
 * 
 * @example
 * // Set property
 * css(element, 'color', 'red');
 */
export function css(
  element: HTMLElement,
  property: string,
  value: string | number
): void;

export function css(
  element: HTMLElement,
  property: string
): string;

export function css(
  element: HTMLElement,
  property: string[],
): ComputedStylesCache;