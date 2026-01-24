/**
 * CSS Module type definitions
 * 
 * This module handles CSS module loading and style injection.
 * It provides type-safe access to CSS class names exported from a stylesheet.
 */

/**
 * Style loader configuration object
 * Configures how styles are injected and managed in the DOM
 */
interface StyleLoaderConfig {
  /**
   * Transform function applied to style tags before insertion
   */
  styleTagTransform: () => void;
  
  /**
   * Function to set attributes on style elements
   */
  setAttributes: () => void;
  
  /**
   * Function to insert style elements into the DOM
   * @param target - The DOM target (e.g., "head")
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
 * CSS Module locals/exports
 * Maps CSS class names to their scoped equivalents
 */
interface CSSModuleLocals {
  [className: string]: string;
}

/**
 * CSS Module with metadata
 */
interface CSSModule {
  /**
   * Scoped CSS class name mappings
   */
  locals?: CSSModuleLocals;
  
  [key: string]: unknown;
}

/**
 * Default export: CSS module class name mappings
 * Returns the scoped class names from the imported CSS module,
 * or undefined if no locals are available
 */
declare const cssModuleExports: CSSModuleLocals | undefined;

export default cssModuleExports;

/**
 * Re-exported members from the CSS module
 * All named exports from the underlying CSS module are re-exported here
 */
export * from './original-css-module';