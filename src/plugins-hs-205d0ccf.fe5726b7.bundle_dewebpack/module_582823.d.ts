/**
 * CSS Module loader type definitions
 * This module handles style injection and CSS module class name mappings
 */

/**
 * CSS Modules class name mapping
 * Maps CSS class names to their hashed/scoped equivalents
 */
export type CSSModuleClasses = Record<string, string>;

/**
 * Style loader configuration options
 */
export interface StyleLoaderOptions {
  /**
   * Transform function applied to style tags before insertion
   */
  styleTagTransform: () => void;
  
  /**
   * Function to set attributes on style elements
   */
  setAttributes: () => void;
  
  /**
   * Insertion method for style elements into the DOM
   * @param target - Target DOM location (e.g., "head")
   */
  insert: (target: string) => void;
  
  /**
   * DOM API interface for style manipulation
   */
  domAPI: () => void;
  
  /**
   * Function to create and insert style elements
   */
  insertStyleElement: () => void;
}

/**
 * CSS module content with metadata
 */
export interface CSSModuleContent {
  /**
   * Local class name mappings for CSS modules
   */
  locals?: CSSModuleClasses;
  
  [key: string]: unknown;
}

/**
 * Default export: CSS module class name mappings
 * Returns undefined if no local class names are defined
 */
declare const cssModuleExport: CSSModuleClasses | undefined;

export default cssModuleExport;

/**
 * Re-exported members from the original CSS module content
 * Excludes the 'default' export to prevent conflicts
 */
export * from './css-module-content';