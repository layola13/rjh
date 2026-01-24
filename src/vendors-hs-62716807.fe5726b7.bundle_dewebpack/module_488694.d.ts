/**
 * CSS Module loader type definitions
 * Handles style injection and CSS module exports
 */

/**
 * CSS Module class names mapping
 * Maps local class names to their hashed/scoped equivalents
 */
export interface CSSModuleClasses {
  readonly [key: string]: string;
}

/**
 * Style loader configuration options
 */
export interface StyleLoaderOptions {
  /**
   * Transform function applied to style tags before insertion
   */
  styleTagTransform: () => void;
  
  /**
   * Sets attributes on style elements
   */
  setAttributes: () => void;
  
  /**
   * Insertion point for style elements in the DOM
   * @param target - DOM element selector (e.g., "head")
   */
  insert: (target: string) => void;
  
  /**
   * DOM manipulation API implementation
   */
  domAPI: () => void;
  
  /**
   * Creates and configures style elements
   */
  insertStyleElement: () => void;
}

/**
 * CSS module content with optional locals
 */
export interface CSSModuleContent {
  /**
   * Local class name mappings exported by the CSS module
   */
  locals?: CSSModuleClasses;
  
  [key: string]: unknown;
}

/**
 * Default export: CSS module class names or undefined
 * 
 * @remarks
 * Returns the locally scoped class names from the CSS module.
 * If the module has no local classes, returns undefined.
 * 
 * @example
 *