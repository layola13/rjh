/**
 * CSS Module type definitions
 * @module CSSModuleLoader
 */

/**
 * CSS Module class names mapping
 * An object containing the mapping between local class names and their hashed/scoped equivalents
 */
export interface CSSModuleClasses {
  [className: string]: string;
}

/**
 * Style loader configuration options
 */
export interface StyleLoaderOptions {
  /**
   * Function to transform and insert style tags into the DOM
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
   * DOM API utilities for manipulating style elements
   */
  domAPI: () => void;
  
  /**
   * Function to create and insert style elements
   */
  insertStyleElement: () => void;
}

/**
 * CSS Module export object containing local class name mappings
 */
export interface CSSModuleExport {
  /**
   * Local class names mapped to their scoped equivalents
   */
  locals?: CSSModuleClasses;
}

/**
 * Default export: CSS Module class names
 * Returns the local class name mappings if available, otherwise undefined
 */
declare const cssModuleClasses: CSSModuleClasses | undefined;

export default cssModuleClasses;

/**
 * Re-exported members from the CSS module
 * All named exports except 'default' from the original module
 */
export * from './css-module-source';