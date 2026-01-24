/**
 * Checks if an element has a specific CSS class.
 * Supports both standard elements and SVG elements with baseVal.
 * 
 * @param element - The DOM element to check
 * @param className - The CSS class name to look for
 * @returns True if the element has the specified class, false otherwise
 */
export default function hasClass(
  element: Element | HTMLElement | SVGElement,
  className: string | null | undefined
): boolean;

/**
 * Checks if an element has a specific CSS class.
 * 
 * @remarks
 * - Uses native classList.contains() when available (modern browsers)
 * - Falls back to string matching for older browsers
 * - Handles SVG elements with className.baseVal property
 * - Returns false if className is null, undefined, or empty
 * 
 * @param element - The DOM element to check for the class
 * @param className - The CSS class name to search for (can be null/undefined)
 * @returns True if the class is present, false otherwise
 * 
 * @example
 *