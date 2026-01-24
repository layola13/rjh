/**
 * CSS Module Exports
 * Type definitions for CSS module with dynamic class name mappings
 */

/**
 * CSS class name mapping type
 * Maps CSS class names to their hashed/scoped equivalents
 */
export type CSSModuleClasses = Record<string, string>;

/**
 * Style loader configuration options
 * Defines how styles are injected and managed in the DOM
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
   * DOM insertion function for style elements
   * @param target - Target selector (e.g., "head")
   */
  insert: (target: string) => void;
  
  /**
   * DOM API abstraction for style manipulation
   */
  domAPI: () => void;
  
  /**
   * Function to create and insert style elements
   */
  insertStyleElement: () => void;
}

/**
 * Default export: CSS module class mappings
 * Contains the local class names as keys and their transformed names as values
 * Returns undefined if no locals are defined
 */
declare const cssModuleExport: CSSModuleClasses | undefined;

export default cssModuleExport;

/**
 * Re-exported members from the underlying CSS module
 * All named exports from the source module (excluding 'default')
 */
export * from './original-module';