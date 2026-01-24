/**
 * Document Element Module
 * 
 * This module provides access to the document's root element (documentElement).
 * Returns the <html> element if document is available, otherwise undefined.
 * 
 * @module DocumentElement
 */

/**
 * Global object containing the document property
 */
interface GlobalObject {
  document?: Document;
}

/**
 * Retrieves the global object's document
 * @returns The global document object or undefined
 */
declare function getGlobalDocument(): GlobalObject;

/**
 * The root element of the document (<html>)
 * Returns undefined if document is not available (e.g., in Node.js environment)
 */
const documentElement: HTMLElement | undefined = 
  getGlobalDocument()?.document?.documentElement;

export default documentElement;