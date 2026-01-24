/**
 * CSS Module Declaration
 * 
 * This module handles CSS style injection and transformation.
 * It provides CSS module locals and style loading functionality.
 * 
 * @module module_5503
 * @originalId 5503
 */

/**
 * CSS module locals - contains exported CSS class names
 */
export interface CSSModuleLocals {
  [className: string]: string;
}

/**
 * Style loader options configuration
 */
export interface StyleLoaderOptions {
  /**
   * Function to transform and inject style tags into the DOM
   */
  styleTagTransform: () => void;
  
  /**
   * Function to set attributes on style elements
   */
  setAttributes: () => void;
  
  /**
   * Function to insert style elements into the specified location
   * @param target - The target element selector (e.g., "head")
   */
  insert: (target: string) => void;
  
  /**
   * DOM API utility for style manipulation
   */
  domAPI: () => void;
  
  /**
   * Function to create and insert style elements
   */
  insertStyleElement: () => void;
}

/**
 * CSS module exports
 * Returns the CSS module locals (class name mappings) if available, otherwise undefined
 */
declare const cssModule: CSSModuleLocals | undefined;

export default cssModule;