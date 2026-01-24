/**
 * CSS Module type definitions
 * This module handles style imports and exports CSS class names as typed properties.
 */

/**
 * CSS class names exported by the module
 * Maps CSS class selectors to their hashed/scoped names
 */
export interface CSSModuleClasses {
  readonly [className: string]: string;
}

/**
 * Style loader options configuration
 * Controls how CSS is injected and managed in the DOM
 */
export interface StyleLoaderOptions {
  /**
   * Transform function applied to style tags before insertion
   */
  styleTagTransform: () => void;
  
  /**
   * Sets custom attributes on injected style elements
   */
  setAttributes: () => void;
  
  /**
   * Inserts style elements into specified DOM location
   * @param target - DOM selector where styles should be inserted (e.g., "head")
   */
  insert: (target: string) => void;
  
  /**
   * DOM API adapter for style manipulation
   */
  domAPI: () => void;
  
  /**
   * Creates and configures style elements before insertion
   */
  insertStyleElement: () => void;
}

/**
 * CSS Module with metadata
 * Contains both the stylesheet content and exported class mappings
 */
export interface CSSModule {
  /**
   * Exported CSS class name mappings (if CSS Modules are enabled)
   */
  locals?: CSSModuleClasses;
  
  /**
   * Raw CSS content or identifier
   */
  [key: string]: unknown;
}

/**
 * Default export: CSS class name mappings
 * Returns an object mapping original class names to their scoped equivalents.
 * Returns undefined if CSS Modules are not enabled for this stylesheet.
 */
declare const cssModuleClasses: CSSModuleClasses | undefined;

export default cssModuleClasses;

/**
 * Re-exports all named exports from the underlying CSS module loader
 * (typically empty for pure CSS modules, but may include metadata)
 */
export * from './css-module-loader';