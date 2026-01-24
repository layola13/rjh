/**
 * CSS Module Loader
 * Handles style injection and CSS module exports
 */

/**
 * Configuration options for style injection
 */
interface StyleLoaderOptions {
  /**
   * Transform function to manipulate style tags before insertion
   */
  styleTagTransform: () => void;
  
  /**
   * Function to set attributes on style elements
   */
  setAttributes: () => void;
  
  /**
   * DOM insertion function, bound to target element (typically "head")
   */
  insert: () => void;
  
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
 * CSS Module exports
 * Contains typed CSS class names exported from the stylesheet
 */
type CSSModuleExports = Record<string, string>;

/**
 * Default export: CSS module locals object
 * Maps class names to their hashed equivalents
 * Returns undefined if no locals are available
 */
declare const _default: CSSModuleExports | undefined;

export default _default;

/**
 * Re-exports all named exports from the CSS module (module 304261)
 * Allows direct import of CSS class names
 */
export * from 'module_304261';