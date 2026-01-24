/**
 * Document Element Module
 * 
 * Exports the documentElement of the global document object.
 * This module provides access to the root <html> element of the document.
 * 
 * @module DocumentElement
 */

/**
 * The root element of the HTML document (typically the <html> element).
 * Returns undefined if the document or documentElement is not available.
 * 
 * @remarks
 * This is commonly used in browser environments to access the document root.
 * In non-browser environments (like Node.js), this will be undefined.
 */
declare const documentElement: HTMLElement | undefined;

export default documentElement;