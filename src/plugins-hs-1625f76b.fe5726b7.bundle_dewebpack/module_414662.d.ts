/**
 * CSS module loader type definitions
 * 
 * This module handles CSS-in-JS loading with style injection support.
 * Typically used in webpack configurations with css-loader and style-loader.
 */

/**
 * CSS module class names mapping
 * Maps CSS class names to their hashed/scoped equivalents
 */
export type CSSModuleClasses = Record<string, string>;

/**
 * Style loader options configuration
 */
interface StyleLoaderOptions {
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
   * @param target - The DOM target selector (e.g., "head")
   */
  insert: (target: string) => void;
  
  /**
   * DOM manipulation API for style injection
   */
  domAPI: () => void;
  
  /**
   * Function to create and insert style elements
   */
  insertStyleElement: () => void;
}

/**
 * CSS module metadata
 */
interface CSSModule {
  /**
   * Local class name mappings (scoped CSS classes)
   */
  locals?: CSSModuleClasses;
  
  /**
   * Raw CSS content
   */
  [key: string]: unknown;
}

/**
 * Default export: CSS module class names
 * Returns the scoped class names if available, otherwise undefined
 */
declare const cssModuleExport: CSSModuleClasses | undefined;

export default cssModuleExport;

/**
 * Re-exported named exports from the CSS module
 * All named exports except 'default' are re-exported
 */
export * from './css-module-source';