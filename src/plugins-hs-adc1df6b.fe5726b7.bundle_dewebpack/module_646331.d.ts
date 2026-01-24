/**
 * CSS Module type definitions
 * Module: module_646331
 * Original ID: 646331
 * 
 * This module handles CSS Modules loading and style injection.
 * It exports CSS class name mappings as a default export.
 */

/**
 * CSS Module class name mappings
 * Maps CSS class names to their hashed/scoped equivalents
 */
interface CSSModuleClasses {
  [className: string]: string;
}

/**
 * Style loader configuration options
 */
interface StyleLoaderOptions {
  /** Function to transform and inject style tags into the DOM */
  styleTagTransform: () => void;
  
  /** Function to set attributes on style elements */
  setAttributes: () => void;
  
  /** Function to insert style elements into a specified DOM location */
  insert: (target: string) => void;
  
  /** DOM API implementation for style manipulation */
  domAPI: () => void;
  
  /** Function to create and insert style elements */
  insertStyleElement: () => void;
}

/**
 * Style content with optional locals (CSS Module class mappings)
 */
interface StyleContent {
  /** CSS Module class name mappings, if available */
  locals?: CSSModuleClasses;
}

/**
 * Default export: CSS Module class name mappings
 * Returns the locally scoped class names from the CSS Module,
 * or undefined if no locals are defined.
 */
declare const cssModuleClasses: CSSModuleClasses | undefined;

export default cssModuleClasses;

/**
 * Re-exported members from the underlying CSS loader module
 * Includes all named exports except 'default'
 */
export * from './css-loader-module';