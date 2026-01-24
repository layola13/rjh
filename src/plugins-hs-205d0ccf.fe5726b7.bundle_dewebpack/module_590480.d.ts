/**
 * CSS Module Declaration
 * Provides type definitions for CSS module exports and style injection functionality
 */

/**
 * Style loader options configuration
 * @interface StyleLoaderOptions
 */
export interface StyleLoaderOptions {
  /**
   * Function to transform style tags during injection
   */
  styleTagTransform: () => void;
  
  /**
   * Function to set attributes on style elements
   */
  setAttributes: () => void;
  
  /**
   * Function to insert style elements into the DOM
   * @param target - The DOM location where styles should be inserted (e.g., "head")
   */
  insert: (target: string) => void;
  
  /**
   * DOM API handler for style manipulation
   */
  domAPI: () => void;
  
  /**
   * Function to create and insert style elements
   */
  insertStyleElement: () => void;
}

/**
 * CSS Module Locals
 * Represents the exported class names from a CSS module
 * @interface CSSModuleLocals
 */
export interface CSSModuleLocals {
  [className: string]: string;
}

/**
 * CSS Module Export
 * The main export of a CSS module, containing class name mappings
 */
declare const cssModuleExport: CSSModuleLocals | undefined;

export default cssModuleExport;

/**
 * Re-exported types and utilities from the underlying CSS module
 * All named exports from the source CSS module are available here
 */
export * from './css-module-source';