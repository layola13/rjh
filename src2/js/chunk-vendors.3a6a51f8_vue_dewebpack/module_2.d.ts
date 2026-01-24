/**
 * Polyfill for Element.prototype.matches
 * 
 * Ensures the `matches` method is available on all Element instances by falling back
 * to vendor-prefixed implementations (matchesSelector, msMatchesSelector, webkitMatchesSelector)
 * if the standard `matches` method is not natively supported.
 * 
 * @remarks
 * This polyfill is automatically executed when the module is loaded and modifies
 * the global Element prototype to ensure cross-browser compatibility.
 * 
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/matches | MDN Element.matches}
 */

declare global {
  interface Element {
    /**
     * Returns true if the element would be selected by the specified CSS selector string;
     * otherwise, returns false.
     * 
     * @param selectors - A string containing a selector list to test the Element against
     * @returns true if the element matches the selector, false otherwise
     * 
     * @example
     *