/**
 * Checks if an element matches a CSS selector using the appropriate browser-specific method.
 * 
 * This function provides cross-browser compatibility by falling back through various
 * vendor-prefixed implementations of the matches API.
 * 
 * @param element - The DOM element to test against the selector
 * @param selector - The CSS selector string to match against
 * @returns `true` if the element matches the selector, `false` otherwise, or `undefined` if no matching method is available
 * 
 * @example
 *