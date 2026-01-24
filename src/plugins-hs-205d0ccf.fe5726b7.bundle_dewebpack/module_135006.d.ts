/**
 * CSS Module type definitions
 * 
 * This module provides CSS-in-JS functionality with style injection capabilities.
 * It exports CSS class names as a typed object for use in TypeScript applications.
 */

/**
 * CSS class name mapping interface
 * Maps CSS class names from the stylesheet to their generated unique identifiers
 */
export interface CSSModuleClasses {
  [className: string]: string;
}

/**
 * Style loader options for managing CSS injection behavior
 */
export interface StyleLoaderOptions {
  /**
   * Transform function applied to style tags before insertion
   */
  styleTagTransform: () => void;
  
  /**
   * Sets custom attributes on injected style elements
   */
  setAttributes: () => void;
  
  /**
   * Insertion strategy for style elements into the DOM
   * @param target - Target selector (e.g., "head")
   */
  insert: (target: string) => void;
  
  /**
   * DOM manipulation API abstraction layer
   */
  domAPI: () => void;
  
  /**
   * Creates and inserts style elements into the document
   */
  insertStyleElement: () => void;
}

/**
 * CSS Module export
 * Contains the generated CSS class names that can be applied to elements
 * Returns undefined if no local class names are defined
 */
declare const cssModuleExport: CSSModuleClasses | undefined;

export default cssModuleExport;

/**
 * Re-exported utilities from the underlying CSS loader
 * Includes all named exports except 'default' from the source module
 */
export * from './css-loader-module';