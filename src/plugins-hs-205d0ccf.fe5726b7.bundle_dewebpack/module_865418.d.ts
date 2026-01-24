/**
 * CSS Module type definitions
 * This module exports CSS class names as a typed object
 */

/**
 * CSS class names exported by this module
 * Contains locally scoped class names from the CSS/SCSS file
 */
export interface CSSModuleClasses {
  [className: string]: string;
}

/**
 * Style loader configuration options
 */
export interface StyleLoaderOptions {
  /** Function to transform and inject style tags into the DOM */
  styleTagTransform: () => void;
  
  /** Function to set attributes on style elements */
  setAttributes: () => void;
  
  /** Function to insert style elements into a specific DOM location */
  insert: (target: string) => void;
  
  /** DOM manipulation API interface */
  domAPI: () => void;
  
  /** Function to create and insert style elements */
  insertStyleElement: () => void;
}

/**
 * CSS Module exports
 * Maps CSS class names to their hashed/scoped equivalents
 */
declare const cssModuleExports: CSSModuleClasses | undefined;

export default cssModuleExports;

/**
 * Re-exported members from the underlying CSS loader module
 * Excludes the 'default' export to avoid conflicts
 */
export * from 'css-loader-module';