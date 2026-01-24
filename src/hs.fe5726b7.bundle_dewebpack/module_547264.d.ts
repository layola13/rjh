/**
 * Style loader module configuration
 * Handles CSS module loading and injection into the DOM
 */

/**
 * CSS module exports interface
 * Contains locally scoped class names from the CSS module
 */
export interface CSSModuleLocals {
  [className: string]: string;
}

/**
 * Style loader options configuration
 */
export interface StyleLoaderOptions {
  /**
   * Function to transform style tags before insertion
   */
  styleTagTransform: () => void;
  
  /**
   * Function to set attributes on style elements
   */
  setAttributes: () => void;
  
  /**
   * Function to insert style elements into the DOM
   * @param target - The DOM target element (e.g., "head")
   */
  insert: (target: string) => void;
  
  /**
   * DOM API manipulation functions
   */
  domAPI: () => void;
  
  /**
   * Function to create and insert style elements
   */
  insertStyleElement: () => void;
}

/**
 * CSS module locals or undefined if not available
 * Represents the exported class names from the CSS module
 */
declare const cssModuleLocals: CSSModuleLocals | undefined;

export default cssModuleLocals;

/**
 * Re-export all named exports from the original CSS module
 */
export * from './original-css-module';