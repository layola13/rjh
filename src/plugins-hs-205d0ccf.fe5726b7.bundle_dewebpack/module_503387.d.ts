/**
 * CSS Module type definitions
 * Represents a dynamically imported CSS module with local class name mappings
 */

/**
 * Local class name mappings exported by the CSS module
 * Maps CSS class names to their hashed/scoped equivalents
 */
export interface CSSModuleLocals {
  [className: string]: string;
}

/**
 * Style loader configuration options
 * Defines how CSS should be injected and managed in the DOM
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
   * DOM insertion strategy for style elements
   * @param target - Target element selector (e.g., "head")
   */
  insert: (target: string) => void;
  
  /**
   * DOM API implementation for style manipulation
   */
  domAPI: () => void;
  
  /**
   * Function to create and insert style elements
   */
  insertStyleElement: () => void;
}

/**
 * CSS Module exports
 * Contains all named exports from the imported CSS module
 */
export type CSSModuleExports = Record<string, unknown>;

/**
 * Default export: CSS module locals mapping
 * Returns the local class name mappings if available, undefined otherwise
 */
declare const cssModuleLocals: CSSModuleLocals | undefined;

export default cssModuleLocals;