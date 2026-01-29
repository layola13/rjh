import ReactDOM from 'react-dom';
import React from 'react';

/**
 * Check if the given value is a DOM element (HTML or SVG)
 */
function isDOM(element: unknown): element is HTMLElement | SVGElement {
  return element instanceof HTMLElement || element instanceof SVGElement;
}

/**
 * Extract the native DOM element from various wrapper types
 */
function getDOM(element: unknown): HTMLElement | SVGElement | null {
  if (!element || typeof element !== 'object') {
    return null;
  }

  const elementWithNative = element as { nativeElement?: unknown };
  
  if (elementWithNative.nativeElement && isDOM(elementWithNative.nativeElement)) {
    return elementWithNative.nativeElement;
  }

  if (isDOM(element)) {
    return element;
  }

  return null;
}

/**
 * Get DOM node from React component, element wrapper, or native DOM element
 */
export default function getDOMNode(element: unknown): HTMLElement | SVGElement | null {
  const domElement = getDOM(element);
  
  if (domElement) {
    return domElement;
  }

  if (element instanceof React.Component) {
    return ReactDOM.findDOMNode?.(element) as HTMLElement | SVGElement | null ?? null;
  }

  return null;
}

export { getDOM, isDOM };