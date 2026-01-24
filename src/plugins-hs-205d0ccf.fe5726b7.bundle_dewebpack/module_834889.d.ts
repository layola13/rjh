/**
 * CSS Module loader type definitions
 * Generated from webpack CSS module bundle
 */

/**
 * CSS Module class names mapping
 * Maps CSS class names to their hashed/scoped equivalents
 */
export interface CSSModuleClasses {
  readonly [className: string]: string;
}

/**
 * Style loader insertion options
 * Configuration for injecting styles into the DOM
 */
export interface StyleLoaderOptions {
  /**
   * Transform function applied to style tags before insertion
   */
  styleTagTransform: () => void;
  
  /**
   * Function to set attributes on style elements
   */
  setAttributes: () => void;
  
  /**
   * DOM insertion function bound to target element
   * @param target - Target element selector (e.g., "head")
   */
  insert: (target: string) => void;
  
  /**
   * DOM API utility functions for style manipulation
   */
  domAPI: () => void;
  
  /**
   * Factory function to create and insert style elements
   */
  insertStyleElement: () => void;
}

/**
 * Default export: CSS Module class names
 * Contains the locally scoped class names from the CSS module
 * Returns undefined if no local classes are defined
 */
declare const cssModuleExport: CSSModuleClasses | undefined;

export default cssModuleExport;

/**
 * Re-exported members from the CSS module loader
 * All named exports except 'default' are re-exported here
 */
export * from './css-module-loader';