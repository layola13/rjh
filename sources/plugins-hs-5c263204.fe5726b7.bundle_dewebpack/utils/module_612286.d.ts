/**
 * CSS Module type definitions for module_612286
 * 
 * This module exports CSS class names as a typed object.
 * The actual styles are loaded and injected into the DOM using style-loader.
 */

/**
 * CSS Modules locals object containing exported class names
 * Maps CSS class names to their hashed/scoped equivalents
 */
export type CSSModuleClasses = Record<string, string>;

/**
 * Style loader options for DOM manipulation and style injection
 */
export interface StyleLoaderOptions {
  /**
   * Transform function to apply to style tags before insertion
   */
  styleTagTransform: () => void;
  
  /**
   * Function to set attributes on style elements
   */
  setAttributes: () => void;
  
  /**
   * Insert function bound to target element (typically "head")
   */
  insert: (element: HTMLElement) => void;
  
  /**
   * DOM API utilities for style manipulation
   */
  domAPI: () => void;
  
  /**
   * Function to create and insert style elements
   */
  insertStyleElement: () => void;
}

/**
 * Default export: CSS module class names
 * Returns an object mapping original class names to their scoped versions,
 * or undefined if no locals are exported
 */
declare const cssModuleLocals: CSSModuleClasses | undefined;

export default cssModuleLocals;

/**
 * Re-export all named exports from the CSS module
 * Allows importing specific class names directly
 */
export * from './styles';