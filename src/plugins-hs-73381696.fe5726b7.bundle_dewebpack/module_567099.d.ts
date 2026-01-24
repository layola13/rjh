/**
 * CSS Module type definitions
 * This module handles CSS stylesheet imports with CSS Modules support
 */

/**
 * CSS Module class names mapping
 * Maps CSS class names to their hashed/scoped equivalents
 */
interface CSSModuleClasses {
  readonly [key: string]: string;
}

/**
 * Style loader options for injecting CSS into the DOM
 */
interface StyleLoaderOptions {
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
   * @param target - The DOM element or selector where styles should be inserted
   */
  insert: (target: string) => void;
  
  /**
   * DOM manipulation API for style injection
   */
  domAPI: () => void;
  
  /**
   * Function to create and configure style elements
   */
  insertStyleElement: () => void;
}

/**
 * CSS Module exports
 * Contains the scoped class names from the imported stylesheet
 */
declare const cssModuleExports: CSSModuleClasses | undefined;

export default cssModuleExports;

/**
 * Re-export all named exports from the source CSS module
 * Allows direct import of specific class names
 */
export * from './source-module';