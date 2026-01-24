/**
 * CSS Module type definitions for module_474129
 * This module handles CSS-in-JS style injection and exports CSS module class names.
 */

/**
 * CSS Module class names mapping interface.
 * Contains all the exported CSS class names from the stylesheet.
 */
export interface CSSModuleClasses {
  /** CSS class name mappings exported from the module */
  [className: string]: string;
}

/**
 * Style loader configuration options for runtime style injection.
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
 * Default export containing CSS module locals (class name mappings).
 * Returns undefined if no locals are available.
 */
declare const cssModuleLocals: CSSModuleClasses | undefined;

export default cssModuleLocals;

/**
 * Re-exported members from the underlying CSS module.
 * All named exports except 'default' are available here.
 */
export * from './css-module-source';