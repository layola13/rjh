/**
 * CSS Module type definitions
 * Module: module_875720
 * Original ID: 875720
 * 
 * This module handles CSS-in-JS style injection and exports CSS module class names.
 */

/**
 * Style loader configuration options
 */
interface StyleLoaderOptions {
  /** Transform function to apply styles to DOM */
  styleTagTransform: () => void;
  /** Function to set attributes on style elements */
  setAttributes: () => void;
  /** Function to insert style elements into DOM */
  insert: (target: string) => void;
  /** DOM API utilities for style manipulation */
  domAPI: () => void;
  /** Function to create and insert style elements */
  insertStyleElement: () => void;
}

/**
 * CSS Module locals - maps CSS class names to generated unique identifiers
 */
interface CSSModuleLocals {
  [className: string]: string;
}

/**
 * CSS Module with optional locals export
 */
interface CSSModule {
  locals?: CSSModuleLocals;
  [key: string]: unknown;
}

/**
 * Re-exported named exports from the CSS module (excluding 'default')
 */
export * from './source-module';

/**
 * Default export: CSS module class name mappings
 * Returns the locals object containing CSS class name mappings, or undefined if not available
 */
declare const cssModuleExport: CSSModuleLocals | undefined;
export default cssModuleExport;