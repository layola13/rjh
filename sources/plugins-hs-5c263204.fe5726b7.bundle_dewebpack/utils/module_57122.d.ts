/**
 * CSS Module loader type definitions
 * 
 * This module handles CSS module imports and their associated styles.
 * It configures style injection into the DOM and exports CSS module class names.
 */

/**
 * CSS Module class names mapping
 * Maps CSS class names from the stylesheet to their hashed/scoped equivalents
 */
export type CSSModuleClasses = Record<string, string>;

/**
 * Style loader configuration options
 */
export interface StyleLoaderOptions {
  /** Function to transform and inject style tags into the DOM */
  styleTagTransform: () => void;
  
  /** Function to set attributes on style elements */
  setAttributes: () => void;
  
  /** Function to insert style elements into a specified DOM location */
  insert: (target: string) => void;
  
  /** DOM manipulation API for style injection */
  domAPI: () => void;
  
  /** Function to create and insert style elements */
  insertStyleElement: () => void;
}

/**
 * CSS Module export structure
 */
export interface CSSModuleExport {
  /** Local class name mappings for CSS modules */
  locals?: CSSModuleClasses;
}

/**
 * Default export: CSS module class names
 * Returns the locally scoped class names from the imported CSS module,
 * or undefined if no local class mappings exist.
 */
declare const cssModuleClasses: CSSModuleClasses | undefined;

export default cssModuleClasses;