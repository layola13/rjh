/**
 * CSS Module Type Definitions
 * 
 * This module provides type definitions for a CSS Module that uses style-loader
 * for runtime style injection in webpack bundles.
 */

/**
 * CSS Modules class name mapping
 * Maps the original class names to their hashed/scoped equivalents
 */
export interface CSSModuleClasses {
  readonly [className: string]: string;
}

/**
 * Style loader configuration options
 * Configures how styles are injected and managed in the DOM
 */
export interface StyleLoaderOptions {
  /** Transform function to apply to style tags before insertion */
  styleTagTransform?: (css: string, styleElement: HTMLStyleElement) => void;
  
  /** Function to set custom attributes on style elements */
  setAttributes?: (element: HTMLStyleElement) => void;
  
  /** DOM insertion strategy - specifies where to inject style tags */
  insert?: (element: HTMLStyleElement) => void;
  
  /** DOM API abstraction for cross-platform compatibility */
  domAPI?: {
    update: (obj: { id: number; css: string }) => void;
    remove: (id: number) => void;
  };
  
  /** Function to create and insert style elements into the DOM */
  insertStyleElement?: (options: { element: HTMLStyleElement }) => void;
}

/**
 * Default export: CSS Module class name mappings
 * 
 * Returns an object where keys are the original CSS class names from the source file
 * and values are the transformed/hashed class names for use in JavaScript.
 * 
 * Returns undefined if no local class names are defined in the CSS module.
 * 
 * @example
 *