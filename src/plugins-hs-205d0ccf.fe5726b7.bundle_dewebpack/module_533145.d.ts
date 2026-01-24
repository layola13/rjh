/**
 * CSS Module type definitions
 * Represents a CSS module loader configuration and its exported class names
 */

/**
 * CSS Module class names mapping
 * Maps CSS class names to their hashed/scoped equivalents
 */
export interface CSSModuleClasses {
  [className: string]: string;
}

/**
 * Style loader options configuration
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
   * DOM insertion strategy bound to target element
   * @param target - The DOM target for style insertion (e.g., "head")
   */
  insert: (target: string) => void;
  
  /**
   * DOM manipulation API handler
   */
  domAPI: () => void;
  
  /**
   * Function to create and insert style elements
   */
  insertStyleElement: () => void;
}

/**
 * CSS Module export structure
 * Contains both the module content and local class name mappings
 */
export interface CSSModule {
  /**
   * Local class names exported by this CSS module
   */
  locals?: CSSModuleClasses;
  
  /**
   * Module content/metadata
   */
  [key: string]: unknown;
}

/**
 * Default export: CSS module class names
 * Returns the local class names mapping if available, undefined otherwise
 */
declare const cssModuleLocals: CSSModuleClasses | undefined;

export default cssModuleLocals;