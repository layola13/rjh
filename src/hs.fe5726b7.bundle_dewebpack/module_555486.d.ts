/**
 * CSS Module type definitions
 * @module CSSModuleLoader
 */

/**
 * CSS module class names mapping
 * Maps CSS class names to their hashed/scoped equivalents
 */
export interface CSSModuleClasses {
  readonly [className: string]: string;
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
   * @param target - The DOM selector or element where styles should be inserted
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
 * CSS module with metadata
 */
export interface CSSModule {
  /**
   * Local class name mappings
   */
  locals?: CSSModuleClasses;
  
  /**
   * Other module exports
   */
  [key: string]: unknown;
}

/**
 * Default export: CSS module class names or undefined if no locals exist
 */
declare const cssModuleExport: CSSModuleClasses | undefined;

export default cssModuleExport;