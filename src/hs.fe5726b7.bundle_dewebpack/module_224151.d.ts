/**
 * CSS Module Loader Type Definitions
 * Handles style injection and CSS module exports
 */

/**
 * Style loader configuration options
 */
export interface StyleLoaderOptions {
  /** Transform function for style tags */
  styleTagTransform: () => void;
  /** Function to set attributes on style elements */
  setAttributes: () => void;
  /** DOM insertion function */
  insert: (target: string) => void;
  /** DOM API utilities */
  domAPI: () => void;
  /** Function to create and insert style elements */
  insertStyleElement: () => void;
}

/**
 * CSS Module locals/exports
 * Contains the class names exported by the CSS module
 */
export interface CSSModuleLocals {
  [className: string]: string;
}

/**
 * CSS Module export structure
 */
export interface CSSModuleExport {
  /** Local class name mappings */
  locals?: CSSModuleLocals;
  /** Additional module metadata */
  [key: string]: unknown;
}

/**
 * Re-exported utilities from the style loader module (230426)
 */
export * from './style-loader-utils';

/**
 * Default export: CSS module locals or undefined
 * Returns the locally scoped class names if available
 */
declare const cssModuleLocals: CSSModuleLocals | undefined;
export default cssModuleLocals;