/**
 * DOM manipulation utilities module
 * Provides helper functions for creating, styling, and manipulating DOM elements
 */

/**
 * CSS style value type - can be a string or number (numbers are converted to px)
 */
type CSSValue = string | number;

/**
 * CSS properties object with string keys and CSSValue values
 */
type CSSProperties = Record<string, CSSValue>;

/**
 * Creates a new DOM element with the specified tag name and class name
 * 
 * @param tagName - The HTML tag name (e.g., 'div', 'span')
 * @param className - The CSS class name to apply to the element
 * @returns The newly created HTML element
 */
export function create(tagName: string, className: string): HTMLElement;

/**
 * Appends a child element to a parent element
 * 
 * @param child - The element to append
 * @param parent - The parent element to append to
 * @returns The appended child element
 */
export function appendTo<T extends HTMLElement>(child: T, parent: HTMLElement): T;

/**
 * Gets or sets CSS styles on an element
 * 
 * @param element - The target HTML element
 * @param property - CSS property name or object of properties
 * @param value - CSS property value (optional, only when property is a string)
 * @returns The element (when setting) or the computed style value (when getting)
 */
export function css(element: HTMLElement, property: string): string;
export function css(element: HTMLElement, property: string, value: CSSValue): HTMLElement;
export function css(element: HTMLElement, properties: CSSProperties): HTMLElement;

/**
 * Checks if an element matches a CSS selector
 * Cross-browser compatible implementation
 * 
 * @param element - The element to test
 * @param selector - The CSS selector to match against
 * @returns True if the element matches the selector
 */
export function matches(element: HTMLElement, selector: string): boolean;

/**
 * Removes an element from the DOM
 * Cross-browser compatible implementation
 * 
 * @param element - The element to remove
 */
export function remove(element: HTMLElement): void;

/**
 * Queries and returns direct children of an element that match a selector
 * 
 * @param parent - The parent element to query
 * @param selector - The CSS selector to filter children by
 * @returns Array of matching child elements
 */
export function queryChildren(parent: HTMLElement, selector: string): HTMLElement[];