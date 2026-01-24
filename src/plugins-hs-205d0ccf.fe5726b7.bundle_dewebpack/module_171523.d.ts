/**
 * CSS Module type definitions
 * Module: module_171523
 * Original ID: 171523
 * 
 * This module handles CSS-in-JS style injection and exports CSS module class names.
 */

/**
 * CSS Module class names mapping
 * Maps CSS class identifiers to their hashed/scoped versions
 */
export interface CSSModuleClasses {
  [className: string]: string;
}

/**
 * Style loader options configuration
 */
export interface StyleLoaderOptions {
  /** Transform function for style tag manipulation */
  styleTagTransform: () => void;
  /** Function to set attributes on style elements */
  setAttributes: () => void;
  /** DOM insertion function */
  insert: (target: string) => void;
  /** DOM API utility functions */
  domAPI: () => void;
  /** Function to create and insert style elements */
  insertStyleElement: () => void;
}

/**
 * CSS Module with locals (class name mappings)
 */
export interface CSSModuleExport {
  /** Local class name mappings */
  locals?: CSSModuleClasses;
  /** Additional module properties */
  [key: string]: unknown;
}

/**
 * Default export: CSS module class names or undefined if no locals exist
 */
declare const cssModuleClasses: CSSModuleClasses | undefined;

export default cssModuleClasses;

/**
 * Re-exported members from the CSS module (excluding 'default')
 * All named exports from the original CSS module are available
 */
export * from './original-css-module';