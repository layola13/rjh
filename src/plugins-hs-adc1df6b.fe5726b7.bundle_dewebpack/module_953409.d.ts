/**
 * CSS Module type definitions
 * 
 * This module represents a CSS-in-JS loader configuration that exports
 * style class names and handles style injection into the DOM.
 */

/**
 * CSS module class names mapping
 * Maps CSS class names to their hashed/scoped equivalents
 */
export interface CSSModuleClasses {
  [className: string]: string;
}

/**
 * Style loader configuration options
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
   * Function to insert style elements into a specific DOM location
   * @param target - The DOM element selector where styles should be injected (e.g., "head")
   */
  insert: (target: string) => void;
  
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
 * CSS module exports
 * Contains the mapping of local class names to their globally unique identifiers
 */
declare const cssModuleExports: CSSModuleClasses | undefined;

export default cssModuleExports;

/**
 * Re-exported utilities from the style loader module
 * These are additional exports available from the original module
 */
export * from './style-loader-types';