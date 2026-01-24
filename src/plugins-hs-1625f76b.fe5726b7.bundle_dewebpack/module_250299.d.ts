/**
 * CSS Module Export Type Definition
 * 
 * This module represents a CSS-in-JS loader configuration that exports
 * local class names from a CSS module.
 */

/**
 * CSS Module locals object containing mapped class names
 * @description Represents the class name mappings exported by a CSS module.
 * Each key is the original class name, and the value is the hashed/scoped class name.
 */
export interface CSSModuleLocals {
  [className: string]: string;
}

/**
 * Style loader configuration options
 * @description Configuration object for webpack style-loader or similar CSS injection tools
 */
export interface StyleLoaderOptions {
  /**
   * Function to transform and inject style tags into the DOM
   */
  styleTagTransform: () => void;
  
  /**
   * Function to set attributes on style elements
   */
  setAttributes: () => void;
  
  /**
   * Function to insert style elements into a specific DOM location
   * @param target - The DOM insertion point (e.g., 'head')
   */
  insert: (target: string) => void;
  
  /**
   * DOM API utilities for style manipulation
   */
  domAPI: () => void;
  
  /**
   * Function to create and insert style elements
   */
  insertStyleElement: () => void;
}

/**
 * CSS Module default export
 * @description The processed CSS module locals, or undefined if no locals are present
 */
declare const cssModuleExport: CSSModuleLocals | undefined;

export default cssModuleExport;

/**
 * Re-exported members from the CSS module loader
 * @description Additional utilities or metadata exported by the CSS loader
 */
export * from './css-module-loader';