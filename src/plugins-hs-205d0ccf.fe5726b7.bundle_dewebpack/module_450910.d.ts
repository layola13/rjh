/**
 * CSS Module type definitions
 * 
 * This module represents a CSS-in-JS/CSS Modules configuration typically used
 * with webpack's style-loader and css-loader. It provides type-safe access to
 * CSS class names and handles style injection into the DOM.
 */

/**
 * CSS Modules locals object containing exported class names
 * Maps CSS class names to their hashed/scoped equivalents
 */
export interface CSSModuleLocals {
  readonly [className: string]: string;
}

/**
 * Style loader configuration options
 * Defines how styles should be injected and managed in the DOM
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
   * Bound to insert into 'head' element
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
 * CSS Module with optional locals
 * Represents the complete module including styles and class name mappings
 */
export interface CSSModule {
  /**
   * Exported CSS class names (if CSS Modules is enabled)
   */
  locals?: CSSModuleLocals;
  
  /**
   * Additional module metadata
   */
  [key: string]: unknown;
}

/**
 * Default export: CSS class names object or undefined
 * - Returns locals object if CSS Modules is enabled and contains class names
 * - Returns undefined if no locals are available
 */
declare const cssModuleExport: CSSModuleLocals | undefined;

export default cssModuleExport;

/**
 * Re-exported members from the underlying CSS module
 * All named exports (excluding 'default') from the original module are available
 */
export * from './css-module-source';