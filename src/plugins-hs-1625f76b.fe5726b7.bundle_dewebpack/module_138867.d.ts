/**
 * CSS Module type definitions
 * Module: module_138867
 * Original ID: 138867
 * 
 * This module handles CSS-in-JS style injection and exports CSS module class names.
 */

/**
 * CSS module class name mappings
 * Maps semantic class names to their hashed/scoped equivalents
 */
export interface CSSModuleClasses {
  [className: string]: string;
}

/**
 * Style injection configuration options
 */
export interface StyleLoaderOptions {
  /** Transform function to apply to style tag before insertion */
  styleTagTransform: () => void;
  /** Function to set attributes on style elements */
  setAttributes: () => void;
  /** DOM insertion function, bound to target container */
  insert: (target: string) => void;
  /** DOM manipulation API provider */
  domAPI: () => void;
  /** Factory function to create style element */
  insertStyleElement: () => void;
}

/**
 * CSS module content structure
 */
export interface CSSModuleContent {
  /** Local class name mappings */
  locals?: CSSModuleClasses;
  /** CSS content as string or array */
  toString?: () => string;
  [key: string]: unknown;
}

/**
 * Default export: CSS module class name mappings
 * Returns undefined if no local class names are defined
 */
declare const cssModuleExport: CSSModuleClasses | undefined;

export default cssModuleExport;

/**
 * Re-exported members from the CSS module content
 * Excludes the 'default' export to prevent conflicts
 */
export * from './css-module-content';