/**
 * CSS Module exports and style injection configuration
 * Handles dynamic CSS loading and provides typed class name exports
 */

/**
 * CSS class name mappings exported by the CSS module
 * Maps semantic class names to their hashed/scoped equivalents
 */
export type CSSModuleClasses = Record<string, string>;

/**
 * Style injection configuration options
 */
interface StyleLoaderOptions {
  /**
   * Transform function to apply to style tags before insertion
   */
  styleTagTransform: () => void;
  
  /**
   * Function to set custom attributes on style elements
   */
  setAttributes: () => void;
  
  /**
   * DOM insertion strategy - where to inject style elements
   * @param target - Target DOM selector (e.g., "head")
   */
  insert: (target: string) => void;
  
  /**
   * DOM manipulation API adapter
   */
  domAPI: () => void;
  
  /**
   * Factory function to create style elements
   */
  insertStyleElement: () => void;
}

/**
 * CSS Module metadata
 */
interface CSSModuleMetadata {
  /**
   * Local class name mappings (module.css exports)
   */
  locals?: CSSModuleClasses;
  
  /**
   * Raw CSS content
   */
  [key: string]: unknown;
}

/**
 * Default export: CSS Module class names
 * Contains the locally scoped class names for use in components
 * 
 * @example
 *