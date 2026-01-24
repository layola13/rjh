/**
 * CSS module type definitions
 * This file provides type definitions for a CSS module imported via webpack
 */

/**
 * CSS module class names mapping
 * Maps CSS class names to their scoped/hashed equivalents
 */
interface CSSModuleClasses {
  readonly [className: string]: string;
}

/**
 * Style loader configuration options
 * Defines how CSS modules are injected and managed in the DOM
 */
interface StyleLoaderOptions {
  /**
   * Transforms style tags before insertion into the DOM
   */
  styleTagTransform: () => void;
  
  /**
   * Sets attributes on style elements
   */
  setAttributes: () => void;
  
  /**
   * Inserts style elements into a specific DOM location
   * @param target - The DOM insertion point (e.g., "head")
   */
  insert: (target: string) => void;
  
  /**
   * DOM manipulation API for style injection
   */
  domAPI: () => void;
  
  /**
   * Creates and inserts style elements
   */
  insertStyleElement: () => void;
}

/**
 * Default export: CSS module class names
 * Returns the scoped class names for use in components, or undefined if no locals exist
 */
declare const cssModuleExport: CSSModuleClasses | undefined;

export default cssModuleExport;

/**
 * Re-exported members from the CSS module
 * All named exports from the original CSS module are available here
 */
export * from './css-module';