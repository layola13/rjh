/**
 * CSS Module type definitions
 * Module: module_244086
 * Original ID: 244086
 */

/**
 * CSS class names exported by the module
 * Maps semantic class identifiers to their generated CSS class strings
 */
export interface CSSModuleClasses {
  [className: string]: string;
}

/**
 * Style injection configuration options
 */
export interface StyleLoaderOptions {
  /**
   * Transform function for style tag manipulation
   */
  styleTagTransform: () => void;
  
  /**
   * Function to set attributes on style elements
   */
  setAttributes: () => void;
  
  /**
   * Insert function bound to target container (typically "head")
   */
  insert: () => void;
  
  /**
   * DOM API interface for style manipulation
   */
  domAPI: () => void;
  
  /**
   * Function to insert style elements into the DOM
   */
  insertStyleElement: () => void;
}

/**
 * CSS Module exports
 * Contains the locally scoped class names from the stylesheet
 * Returns undefined if no local classes are defined
 */
declare const cssModuleLocals: CSSModuleClasses | undefined;

export default cssModuleLocals;