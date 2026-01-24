/**
 * Document Element Accessor Module
 * 
 * This module provides access to the document's root element (documentElement).
 * It safely checks for the existence of the document object before attempting
 * to access its documentElement property.
 * 
 * @module DocumentElement
 * @returns The document's root element (typically <html>) or undefined if document doesn't exist
 */

/**
 * Represents the document object with its documentElement property
 */
interface DocumentObject {
  /** The root element of the document (typically the <html> element) */
  documentElement: HTMLElement;
}

/**
 * Module that may contain a document object
 */
interface DocumentModule {
  /** The document object, may be undefined in non-browser environments */
  document?: DocumentObject;
}

/**
 * The root HTML element of the document, or undefined if the document doesn't exist.
 * This is typically the <html> element in a browser environment.
 */
declare const documentElement: HTMLElement | undefined;

export default documentElement;