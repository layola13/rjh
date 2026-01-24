/**
 * CSS Module loader type definitions
 * This module handles CSS-in-JS style injection and exports CSS module class names
 */

/**
 * CSS Module class names mapping
 * Maps CSS class names to their hashed/scoped equivalents
 */
export interface CSSModuleClasses {
  [className: string]: string;
}

/**
 * Style loader configuration options
 */
interface StyleLoaderOptions {
  /**
   * Function to transform and inject style tags into the DOM
   */
  styleTagTransform: () => void;
  
  /**
   * Function to set attributes on style elements
   */
  setAttributes: () => void;
  
  /**
   * Function to insert style elements into a specific DOM location
   * @param target - DOM selector where styles should be injected (e.g., "head")
   */
  insert: (target: string) => void;
  
  /**
   * DOM manipulation API for style injection
   */
  domAPI: () => void;
  
  /**
   * Function to create and insert style elements
   */
  insertStyleElement: () => void;
}

/**
 * CSS Module exports structure
 */
interface CSSModuleExports {
  /**
   * Local class name mappings from the CSS module
   */
  locals?: CSSModuleClasses;
  
  [key: string]: unknown;
}

/**
 * Default export: CSS Module class names
 * Returns the locally scoped class names from the CSS module,
 * or undefined if no local classes are defined
 */
declare const cssModuleClasses: CSSModuleClasses | undefined;

export default cssModuleClasses;

/**
 * Re-exported members from the CSS module
 * All named exports from the original CSS module are available here
 */
export * from './original-css-module';