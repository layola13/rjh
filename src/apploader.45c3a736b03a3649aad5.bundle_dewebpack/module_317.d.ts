/**
 * Style injection utility for dynamically appending style elements to the DOM.
 * Caches style targets (head elements) to avoid repeated DOM queries.
 */

/**
 * Cache mapping CSS selectors to their corresponding DOM head elements.
 * Used to optimize repeated style injections to the same target.
 */
interface StyleTargetCache {
  [selector: string]: HTMLHeadElement | null;
}

/**
 * Appends a style-related element to a target DOM node identified by a CSS selector.
 * Supports iframe content document heads with fallback to main document.
 * 
 * @param selector - CSS selector string identifying the target element (typically 'head' or iframe selector)
 * @param styleElement - The style or link element to be appended to the target
 * @throws {Error} When the target element cannot be found or accessed
 * 
 * @example
 *