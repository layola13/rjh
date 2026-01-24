/**
 * CSS Module exports type definition
 * Module ID: 772375
 * 
 * This module handles CSS module loading and style injection with the following responsibilities:
 * - Importing style transformation utilities
 * - Configuring style injection into the DOM
 * - Exporting CSS class name mappings
 */

/**
 * CSS Modules class name mapping
 * Maps the class names defined in the CSS file to their hashed/scoped equivalents
 */
export interface CSSModuleClasses {
  readonly [className: string]: string;
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
  
  /** DOM manipulation API for style injection */
  domAPI: () => void;
  
  /** Function to create and insert style elements */
  insertStyleElement: () => void;
}

/**
 * Default export containing the CSS module class name mappings
 * Returns undefined if no local class names are defined
 */
declare const cssModuleExports: CSSModuleClasses | undefined;

export default cssModuleExports;

/**
 * Re-exported utilities from the style loader package
 * All named exports from the original module (excluding 'default')
 */
export * from './style-loader-utilities';