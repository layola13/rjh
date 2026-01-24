/**
 * CSS Module type definitions
 * Represents a stylesheet module with local class name mappings
 */

/**
 * Local class name mappings exported by the CSS module
 * Maps CSS class names to their hashed/scoped equivalents
 */
export type CSSModuleClasses = Record<string, string>;

/**
 * Style injection configuration for CSS modules
 * Controls how styles are inserted and managed in the DOM
 */
interface StyleLoaderOptions {
  /**
   * Transform function applied to style tags before insertion
   */
  styleTagTransform: () => void;
  
  /**
   * Sets attributes on the injected style elements
   */
  setAttributes: () => void;
  
  /**
   * Insert function that adds style elements to the DOM
   * @param target - Target element selector (e.g., "head")
   */
  insert: (target: string) => void;
  
  /**
   * DOM API utilities for style manipulation
   */
  domAPI: () => void;
  
  /**
   * Creates and configures style elements for insertion
   */
  insertStyleElement: () => void;
}

/**
 * CSS Module with metadata
 */
interface CSSModule {
  /**
   * Local class name mappings
   */
  locals?: CSSModuleClasses;
  
  /**
   * Additional module metadata
   */
  [key: string]: unknown;
}

/**
 * Default export: CSS module class mappings
 * Returns the local class names if available, undefined otherwise
 */
declare const cssModuleExport: CSSModuleClasses | undefined;

export default cssModuleExport;

/**
 * Re-exported members from the CSS module
 * All named exports except 'default' are re-exported
 */
export * from './original-css-module';