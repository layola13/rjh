/**
 * Adds a CSS class to a DOM element.
 * Supports both modern classList API and legacy className manipulation.
 * 
 * @param element - The DOM element to add the class to
 * @param className - The CSS class name to add
 */
export default function addClass(element: Element, className: string): void;