/**
 * CSS Module type definitions
 * Represents a CSS module that exports class names and handles style injection
 */

/**
 * CSS Module exports interface
 * Contains the class names defined in the CSS module
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
   * @param target - The DOM location where styles should be inserted (e.g., "head")
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
 * Default export: CSS module class names
 * Returns an object mapping CSS class names to their hashed/scoped equivalents,
 * or undefined if no local class names are defined
 */
declare const cssModuleLocals: CSSModuleClasses | undefined;

export default cssModuleLocals;

/**
 * Re-exported items from the underlying CSS module
 * All named exports from the original module (excluding 'default') are available
 */
export * from './original-css-module';