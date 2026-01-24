/**
 * CSS Module Type Definitions
 * 
 * This module represents a CSS-in-JS module with style injection capabilities.
 * Typically used with css-loader and style-loader in webpack configurations.
 */

/**
 * Style loader configuration options
 * Contains methods for injecting and managing CSS styles in the DOM
 */
export interface StyleLoaderOptions {
  /**
   * Transform function to manipulate style tags before insertion
   */
  styleTagTransform: () => void;
  
  /**
   * Sets attributes on style elements
   */
  setAttributes: () => void;
  
  /**
   * Inserts style elements into the specified container
   * @param container - The DOM container (e.g., "head")
   */
  insert: (container: string) => void;
  
  /**
   * DOM manipulation API for style injection
   */
  domAPI: () => void;
  
  /**
   * Creates and inserts style elements into the DOM
   */
  insertStyleElement: () => void;
}

/**
 * CSS Module locals (class name mappings)
 * Maps CSS class names to their hashed/scoped equivalents
 */
export type CSSModuleLocals = Record<string, string> | undefined;

/**
 * CSS Module export structure
 */
export interface CSSModuleExport {
  /**
   * Local class name mappings for CSS modules
   * If CSS modules are enabled, this contains the mapping of original class names
   * to their scoped versions. Otherwise, it's undefined.
   */
  locals?: Record<string, string>;
}

/**
 * Default export representing the CSS module locals
 * Contains the scoped class name mappings when CSS modules are enabled
 */
declare const cssModuleLocals: CSSModuleLocals;

export default cssModuleLocals;

/**
 * Re-exported types and values from the underlying CSS loader module
 * Includes all named exports except 'default' from the original module
 */
export * from './css-loader-module';