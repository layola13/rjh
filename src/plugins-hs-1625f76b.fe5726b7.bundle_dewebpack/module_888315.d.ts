/**
 * CSS Module Type Definitions
 * Module: module_888315
 * Original ID: 888315
 * 
 * This module handles CSS module imports and provides type-safe class name mappings.
 */

/**
 * CSS module class name mappings
 * Contains all exported class names from the CSS module
 */
export interface CSSModuleClasses {
  [className: string]: string;
}

/**
 * Style loader configuration options
 */
export interface StyleLoaderOptions {
  /** Transform function for style tags */
  styleTagTransform: () => void;
  /** Function to set attributes on style elements */
  setAttributes: () => void;
  /** Function to insert style elements into the DOM */
  insert: (target: string) => void;
  /** DOM API utilities */
  domAPI: () => void;
  /** Function to create and insert style elements */
  insertStyleElement: () => void;
}

/**
 * Default export: CSS module class name mappings
 * Returns an object where keys are class names and values are the transformed class names
 */
declare const cssModuleExport: CSSModuleClasses | undefined;

export default cssModuleExport;

/**
 * Re-exported members from the underlying CSS module
 * All named exports from the original module are available here
 */
export * from './original-css-module';