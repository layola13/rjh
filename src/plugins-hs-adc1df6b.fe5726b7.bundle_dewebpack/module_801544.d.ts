/**
 * CSS Module type definitions
 * 
 * This module handles CSS-in-JS styling through webpack loaders.
 * It processes style injections and exports CSS module class names.
 */

/**
 * CSS Modules class name mapping
 * Maps semantic class identifiers to generated CSS class names
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
  
  /** DOM API utilities for style manipulation */
  domAPI: () => void;
  
  /** Function to create and insert style elements */
  insertStyleElement: () => void;
}

/**
 * The default export containing CSS module class name mappings.
 * Returns undefined if no local class names are defined.
 */
declare const cssModuleExports: CSSModuleClasses | undefined;

export default cssModuleExports;

/**
 * Re-exported members from the underlying CSS module loader
 * Includes all named exports except 'default'
 */
export * from './css-module-loader';