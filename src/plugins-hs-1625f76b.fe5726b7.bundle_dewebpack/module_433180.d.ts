/**
 * CSS Module Loader Configuration
 * Provides type definitions for a CSS module with style injection capabilities
 */

/**
 * Style loader configuration options
 */
interface StyleLoaderOptions {
  /**
   * Transform function to manipulate style tags
   */
  styleTagTransform: () => void;
  
  /**
   * Function to set attributes on style elements
   */
  setAttributes: () => void;
  
  /**
   * Insert function to add style elements to the DOM
   * @param target - Target element selector, typically "head"
   */
  insert: (target: string) => void;
  
  /**
   * DOM API interface for style manipulation
   */
  domAPI: () => void;
  
  /**
   * Function to insert style elements into the document
   */
  insertStyleElement: () => void;
}

/**
 * CSS Module export with optional local classname mappings
 */
interface CSSModule {
  /**
   * Local CSS class name mappings
   * Maps class names used in the module to their transformed equivalents
   */
  locals?: Record<string, string>;
}

/**
 * Default export type for the CSS module
 * Returns the local class mappings if available, undefined otherwise
 */
declare const cssModuleExport: Record<string, string> | undefined;

export default cssModuleExport;

/**
 * Re-exported members from the CSS module loader (module 494681)
 * Excludes the 'default' export
 */
export * from './css-module-loader';