/**
 * Finds the closest ancestor element (including the element itself) that matches the given CSS selector.
 * Polyfills Element.prototype.matches for older browsers.
 * 
 * @param element - The starting DOM element to search from
 * @param selector - CSS selector string to match against
 * @returns The matching ancestor element, or undefined if no match found
 * 
 * @example
 *