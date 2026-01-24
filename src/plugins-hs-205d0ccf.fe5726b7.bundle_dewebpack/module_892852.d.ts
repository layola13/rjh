/**
 * Style loader module configuration and exports
 * Handles CSS module loading, style injection, and local class name exports
 */

/**
 * CSS Modules class name mapping
 * Maps local class names to their hashed/scoped equivalents
 */
export interface CSSModuleLocals {
  [className: string]: string;
}

/**
 * Style loader configuration options
 */
export interface StyleLoaderOptions {
  /**
   * Transform function to manipulate style tags before insertion
   */
  styleTagTransform: () => void;
  
  /**
   * Function to set attributes on style elements
   */
  setAttributes: () => void;
  
  /**
   * DOM insertion function
   * @param target - The DOM element selector or element to insert styles into
   */
  insert: (target: string) => void;
  
  /**
   * DOM API interface for style manipulation
   */
  domAPI: () => void;
  
  /**
   * Function to create and insert style elements
   */
  insertStyleElement: () => void;
}

/**
 * CSS Module export with optional locals
 * Contains the processed styles and their local class name mappings
 */
declare const cssModule: CSSModuleLocals | undefined;

export default cssModule;

/**
 * Re-export all named exports from the original CSS module
 */
export * from './original-css-module';