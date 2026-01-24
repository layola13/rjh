/**
 * Removes a CSS class from a DOM element.
 * Supports modern classList API and legacy className manipulation.
 * 
 * @module ClassNameRemover
 */

/**
 * Removes all occurrences of a class name from a string of space-separated classes.
 * Also normalizes whitespace by collapsing multiple spaces and trimming edges.
 * 
 * @param className - The original space-separated class names string
 * @param classToRemove - The specific class name to remove
 * @returns The cleaned class name string with the specified class removed
 */
declare function removeClassFromString(
  className: string,
  classToRemove: string
): string;

/**
 * Removes a CSS class from a DOM element.
 * 
 * This function handles three scenarios:
 * 1. Modern browsers: Uses the native `classList.remove()` API
 * 2. Legacy string className: Manually removes the class from the string
 * 3. SVG elements: Handles the `baseVal` property of SVGAnimatedString
 * 
 * @param element - The DOM element from which to remove the class
 * @param className - The CSS class name to remove
 * 
 * @example
 *