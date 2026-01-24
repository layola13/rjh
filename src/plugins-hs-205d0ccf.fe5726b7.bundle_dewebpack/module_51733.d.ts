/**
 * CSS Module loader configuration and export
 * 
 * This module handles the dynamic injection of CSS styles into the DOM
 * and exports the CSS module's class name mappings.
 */

/**
 * CSS Module class name mappings
 * Maps semantic class names to their hashed/scoped equivalents
 */
export interface CSSModuleLocals {
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
  /** DOM API utilities for style manipulation */
  domAPI: () => void;
  /** Function to create and insert style elements */
  insertStyleElement: () => void;
}

/**
 * CSS Module metadata
 */
export interface CSSModule {
  /** Optional class name mappings for the CSS module */
  locals?: CSSModuleLocals;
  /** Additional module properties */
  [key: string]: unknown;
}

/**
 * Default export: CSS module class name mappings
 * Returns undefined if no locals are defined
 */
declare const cssModuleExports: CSSModuleLocals | undefined;
export default cssModuleExports;

/**
 * Re-exported members from the underlying CSS module
 * Excludes the 'default' export
 */
export * from './styles.module.css';