/**
 * CSS Module exports type definition
 * Represents a dynamically loaded CSS module with potential class name mappings
 */

/**
 * CSS Module class names mapping
 * Maps CSS class identifiers to their hashed/scoped counterparts
 */
export type CSSModuleClasses = Record<string, string> | undefined;

/**
 * Style loader configuration options
 * Configures how CSS is injected and managed in the DOM
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
   * Insertion strategy bound to a specific DOM location
   * @param target - The DOM location where styles will be inserted (e.g., "head")
   */
  insert: (target: string) => void;
  
  /**
   * DOM API adapter for style manipulation
   */
  domAPI: () => void;
  
  /**
   * Factory function to create style elements
   */
  insertStyleElement: () => void;
}

/**
 * CSS Module with potential locale/class mappings
 */
export interface CSSModule {
  /**
   * Local class name mappings exported by the CSS module
   */
  locals?: Record<string, string>;
}

/**
 * Default export representing the CSS module's class name mappings
 * Returns the locals object if available, otherwise undefined
 */
declare const cssModuleExports: CSSModuleClasses;

export default cssModuleExports;

/**
 * Re-exported members from the underlying CSS module
 * Excludes the 'default' export to avoid conflicts
 */
export * from './css-module-source';