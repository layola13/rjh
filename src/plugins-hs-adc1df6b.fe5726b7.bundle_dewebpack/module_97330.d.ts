/**
 * CSS Module type definitions
 * This module handles CSS-in-JS loading and style injection
 */

/**
 * CSS Module class names mapping
 * Maps semantic class identifiers to their hashed/scoped equivalents
 */
export interface CSSModuleClasses {
  [className: string]: string;
}

/**
 * Style loader options for runtime style injection
 */
export interface StyleLoaderOptions {
  /**
   * Transforms style tags before insertion into DOM
   */
  styleTagTransform: () => void;
  
  /**
   * Sets attributes on style elements
   */
  setAttributes: () => void;
  
  /**
   * Inserts style elements into specified DOM location
   * @param target - DOM selector where styles will be injected (e.g., "head")
   */
  insert: (target: string) => void;
  
  /**
   * DOM manipulation API for style operations
   */
  domAPI: () => void;
  
  /**
   * Creates and inserts style elements
   */
  insertStyleElement: () => void;
}

/**
 * CSS Module exports
 * Contains both the class name mappings and re-exported utilities
 */
declare const cssModule: CSSModuleClasses | undefined;

export default cssModule;

/**
 * Re-export all named exports from the underlying CSS module
 * Allows direct import of CSS variables, animations, etc.
 */
export * from './styles';