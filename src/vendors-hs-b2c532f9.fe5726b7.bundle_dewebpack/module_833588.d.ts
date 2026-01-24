/**
 * DOM utility functions for perfect-scrollbar library
 * Provides helpers for element manipulation, scrolling state management, and environment detection
 */

/**
 * Converts a string value to integer, returning 0 if conversion fails
 * @param value - The string value to convert
 * @returns The parsed integer or 0 as fallback
 */
export function toInt(value: string | number): number {
  return parseInt(String(value), 10) || 0;
}

/**
 * Generates CSS class names for scrolling state
 * @param axis - Optional scroll axis ('x' or 'y'). If undefined, returns classes for both axes
 * @returns Array of CSS class names for scrolling state
 */
function getScrollingClassNames(axis?: 'x' | 'y'): string[] {
  const baseClass = 'ps--in-scrolling';
  if (axis === undefined) {
    return [baseClass, 'ps--x', 'ps--y'];
  }
  return [baseClass, `ps--${axis}`];
}

/**
 * Checks if an element is editable (input, select, textarea, button, or contenteditable)
 * @param element - The DOM element to check
 * @returns True if the element is editable
 */
export function isEditable(element: Element): boolean {
  const selectors = [
    'input',
    'select',
    'textarea',
    'button',
    '[contenteditable]'
  ];
  
  return selectors.some(selector => {
    return element.matches(`${selector}, ${selector}[contenteditable]`);
  });
}

/**
 * Removes all perfect-scrollbar CSS classes (prefixed with 'ps-') from an element
 * @param element - The DOM element to clean
 */
export function removePsClasses(element: Element): void {
  const classList = Array.from(element.classList);
  
  for (const className of classList) {
    if (className.indexOf('ps-') === 0) {
      element.classList.remove(className);
    }
  }
}

/**
 * Calculates the total outer width of an element including padding and borders
 * @param element - The DOM element to measure
 * @returns The total outer width in pixels
 */
export function outerWidth(element: Element): number {
  const computedStyle = window.getComputedStyle(element);
  
  return (
    toInt(computedStyle.width) +
    toInt(computedStyle.paddingLeft) +
    toInt(computedStyle.paddingRight) +
    toInt(computedStyle.borderLeftWidth) +
    toInt(computedStyle.borderRightWidth)
  );
}

/**
 * Adds scrolling state CSS classes to an element
 * @param element - The DOM element to modify
 * @param axis - Optional scroll axis ('x' or 'y'). If undefined, applies to both axes
 */
export function startScrolling(element: Element, axis?: 'x' | 'y'): void {
  const classNames = getScrollingClassNames(axis);
  
  for (const className of classNames) {
    element.classList.add(className);
  }
}

/**
 * Removes scrolling state CSS classes from an element
 * @param element - The DOM element to modify
 * @param axis - Optional scroll axis ('x' or 'y'). If undefined, removes from both axes
 */
export function stopScrolling(element: Element, axis?: 'x' | 'y'): void {
  const classNames = getScrollingClassNames(axis);
  
  for (const className of classNames) {
    element.classList.remove(className);
  }
}

/**
 * Environment detection for browser capabilities
 */
export interface Environment {
  /** True if running in a WebKit-based browser */
  readonly isWebKit: boolean;
  /** True if the device supports touch events */
  readonly supportsTouch: boolean;
  /** True if the browser supports IE pointer events */
  readonly supportsIePointer: boolean;
}

/**
 * Detected browser environment capabilities
 */
export const env: Environment = {
  isWebKit:
    typeof document !== 'undefined' &&
    'WebkitAppearance' in document.documentElement.style,
  
  supportsTouch:
    typeof window !== 'undefined' &&
    ('ontouchstart' in window ||
      (window.DocumentTouch !== undefined &&
        document instanceof window.DocumentTouch)),
  
  supportsIePointer:
    typeof window !== 'undefined' &&
    window.navigator.msMaxTouchPoints !== null &&
    window.navigator.msMaxTouchPoints !== undefined
};