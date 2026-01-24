/**
 * CSS Module loader type definitions
 * This module handles CSS module imports with style injection capabilities
 */

/**
 * CSS Module class name mappings
 * Maps the class names defined in the CSS file to their hashed equivalents
 */
export interface CSSModuleClasses {
  readonly [key: string]: string;
}

/**
 * Style loader options for injecting styles into the DOM
 */
export interface StyleLoaderOptions {
  /**
   * Function to transform and inject style tags into the document
   */
  styleTagTransform: () => void;
  
  /**
   * Function to set attributes on style elements
   */
  setAttributes: () => void;
  
  /**
   * Function to insert style elements into a specified DOM location
   * Bound to "head" target by default
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
 * CSS Module export structure
 */
export interface CSSModuleExport {
  /**
   * Local class name mappings from the CSS module
   * Returns undefined if no locals are defined
   */
  locals?: CSSModuleClasses;
}

/**
 * Default export: CSS Module class name mappings
 * Contains the transformed class names that can be used in component styling
 */
declare const cssModuleClasses: CSSModuleClasses | undefined;

export default cssModuleClasses;