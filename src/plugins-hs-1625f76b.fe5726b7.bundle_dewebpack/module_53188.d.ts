/**
 * CSS Module Loader Type Definitions
 * 
 * This module represents a CSS module loader that processes stylesheets
 * and injects them into the DOM with support for CSS Modules.
 */

/**
 * Configuration options for style injection into the DOM
 */
interface StyleInjectionOptions {
  /**
   * Transforms style tags before insertion
   */
  styleTagTransform: () => void;
  
  /**
   * Sets attributes on style elements
   */
  setAttributes: () => void;
  
  /**
   * Inserts style elements into a specified DOM location
   * @param target - The target element selector (e.g., "head")
   * @param element - The style element to insert
   */
  insert: (target: string, element: HTMLElement) => void;
  
  /**
   * DOM manipulation API adapter
   */
  domAPI: () => void;
  
  /**
   * Creates and returns a style element for insertion
   */
  insertStyleElement: () => HTMLStyleElement;
}

/**
 * CSS Module locals object containing class name mappings
 * Maps authored class names to their hashed/scoped equivalents
 */
interface CSSModuleLocals {
  [className: string]: string;
}

/**
 * CSS Module export structure
 */
interface CSSModuleExport {
  /**
   * Local class name mappings (scoped CSS class names)
   */
  locals?: CSSModuleLocals;
  
  /**
   * Additional module metadata
   */
  [key: string]: unknown;
}

/**
 * Default export: CSS Module class name mappings or undefined
 * Contains the scoped class names that can be applied to elements
 */
declare const cssModuleLocals: CSSModuleLocals | undefined;

export default cssModuleLocals;

/**
 * Re-exported members from the CSS module
 * Includes any named exports from the original stylesheet module
 */
export * from 'css-module-source';