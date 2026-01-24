/**
 * CSS Module loader type definitions
 * Handles style injection and CSS module class name mappings
 */

/**
 * CSS Module class names mapping
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
   * Function to insert style elements into a target container
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
 * CSS Module exports
 * Contains the class name mappings for the imported CSS module
 */
declare const cssModuleClasses: CSSModuleClasses | undefined;

export default cssModuleClasses;

/**
 * Re-export all named exports from the CSS module
 * Allows direct destructuring of class names
 */
export * from './module_546132';