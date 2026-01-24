/**
 * CSS Module type definitions
 * Original Module ID: 358802
 * 
 * This module handles CSS-in-JS style injection and exports CSS module class names.
 */

/**
 * CSS Module class names mapping
 * Maps CSS class identifiers to their hashed/scoped equivalents
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
   * Bound to insert into the document head
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
 * CSS module exports
 * Contains the locally scoped class names for this CSS module
 */
declare const cssModuleExports: CSSModuleClasses | undefined;

export default cssModuleExports;

/**
 * Re-exported utilities from the underlying CSS module loader
 */
export * from './320271';