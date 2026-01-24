/**
 * DOM utility module for handling React components and native DOM elements
 * @module DOMUtils
 */

/**
 * Checks if the given value is a valid DOM element (HTML or SVG)
 * @param element - The value to check
 * @returns True if the element is an HTMLElement or SVGElement
 */
export function isDOM(element: unknown): element is HTMLElement | SVGElement {
  return element instanceof HTMLElement || element instanceof SVGElement;
}

/**
 * Extracts the native DOM element from various input types
 * @param element - The element to extract DOM from (can be a wrapper object or native element)
 * @returns The native DOM element if found, null otherwise
 */
export function getDOM(element: unknown): HTMLElement | SVGElement | null {
  if (!element || typeof element !== 'object') {
    return null;
  }

  // Check if it's a wrapper object with nativeElement property
  const elementWithNative = element as { nativeElement?: unknown };
  if (elementWithNative.nativeElement && isDOM(elementWithNative.nativeElement)) {
    return elementWithNative.nativeElement;
  }

  // Check if it's already a DOM element
  if (isDOM(element)) {
    return element;
  }

  return null;
}

/**
 * Retrieves the DOM node from a React component, wrapper object, or native element
 * Falls back to ReactDOM.findDOMNode for React Component instances
 * @param element - React component, wrapper object, or native DOM element
 * @returns The corresponding DOM element or null if not found
 */
export default function getDOMNode(element: unknown): HTMLElement | SVGElement | null {
  // Try to get DOM directly first
  const domElement = getDOM(element);
  if (domElement) {
    return domElement;
  }

  // Fallback to ReactDOM.findDOMNode for React components
  if (element && typeof element === 'object') {
    const Component = (element as any).constructor?.Component;
    if (Component && element instanceof Component) {
      const ReactDOM = require('react-dom') as { findDOMNode?: (component: any) => Element | null | Text };
      return (ReactDOM.findDOMNode?.(element) as HTMLElement | SVGElement | null) ?? null;
    }
  }

  return null;
}