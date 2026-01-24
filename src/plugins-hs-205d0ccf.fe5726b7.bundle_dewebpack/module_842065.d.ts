/**
 * Style loader module configuration and re-exports
 * Handles CSS module loading and injection into the DOM
 */

import type * as StyleLoaderAPI from './style-loader-api';

/**
 * CSS module exports (typically class names mapping)
 * Contains the locally scoped CSS class names from the loaded stylesheet
 */
export type CSSModuleExports = Record<string, string> | undefined;

/**
 * Configuration options for style injection
 */
export interface StyleLoaderOptions {
  /**
   * Transform function applied to style tags before insertion
   */
  styleTagTransform: () => void;
  
  /**
   * Sets custom attributes on injected style elements
   */
  setAttributes: () => void;
  
  /**
   * Insertion function that determines where styles are injected
   * Bound to "head" target by default
   */
  insert: (element: HTMLElement) => void;
  
  /**
   * DOM manipulation API for style element operations
   */
  domAPI: () => void;
  
  /**
   * Factory function for creating style elements
   */
  insertStyleElement: () => void;
}

/**
 * Re-export all named exports from the style loader API module
 * (excluding the 'default' export)
 */
export * from './style-loader-api';

/**
 * Default export containing CSS module class name mappings
 * Returns locally scoped class names if available, otherwise undefined
 */
declare const cssModuleLocals: CSSModuleExports;

export default cssModuleLocals;