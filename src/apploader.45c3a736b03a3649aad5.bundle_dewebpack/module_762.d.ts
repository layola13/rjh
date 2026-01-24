/**
 * Creates and inserts a <style> element into the document with specified attributes.
 * This factory function is typically used by style loaders to inject CSS into the DOM.
 * 
 * @module StyleElementFactory
 */

/**
 * Configuration options for style element creation and insertion.
 */
export interface StyleLoaderOptions {
  /**
   * HTML attributes to be set on the style element (e.g., { type: 'text/css', nonce: '...' })
   */
  attributes: Record<string, string>;
  
  /**
   * Options controlling where and how the style element is inserted into the DOM
   */
  options: StyleInsertionOptions;
  
  /**
   * Function to set multiple attributes on an element
   * @param element - The target HTML element
   * @param attributes - Key-value pairs of attributes to set
   */
  setAttributes(element: HTMLElement, attributes: Record<string, string>): void;
  
  /**
   * Function to insert the style element into the document
   * @param element - The style element to insert
   * @param options - Options controlling the insertion behavior
   */
  insert(element: HTMLStyleElement, options: StyleInsertionOptions): void;
}

/**
 * Options for controlling style element insertion behavior.
 */
export interface StyleInsertionOptions {
  /**
   * Target container for insertion (e.g., 'head', selector, or HTMLElement)
   */
  insert?: string | HTMLElement;
  
  /**
   * Whether to insert at the beginning or end of the container
   */
  insertAt?: 'top' | 'bottom';
  
  /**
   * Additional custom insertion options
   */
  [key: string]: unknown;
}

/**
 * Factory function that creates a style element with the provided configuration.
 * 
 * @param config - Configuration object containing attributes, options, and utility functions
 * @returns The created and inserted HTMLStyleElement
 * 
 * @example
 *