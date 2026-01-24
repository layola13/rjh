/**
 * DOM utility module for handling React components and native DOM elements
 * @module DOMUtils
 */

/**
 * Interface representing a React element wrapper with a native DOM element
 */
interface ElementWrapper {
  /**
   * The underlying native DOM element (HTMLElement or SVGElement)
   */
  nativeElement: HTMLElement | SVGElement;
  [key: string]: unknown;
}

/**
 * Union type for supported DOM element types
 */
type DOMElement = HTMLElement | SVGElement;

/**
 * Input type for DOM-related operations
 * Can be a React Component, an ElementWrapper, or a native DOM element
 */
type DOMInput = React.Component | ElementWrapper | DOMElement | unknown;

/**
 * Checks whether the given value is a native DOM element (HTMLElement or SVGElement)
 * 
 * @param element - The value to check
 * @returns `true` if the element is an HTMLElement or SVGElement, `false` otherwise
 * 
 * @example
 *