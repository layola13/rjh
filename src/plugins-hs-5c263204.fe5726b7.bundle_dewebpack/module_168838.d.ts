/**
 * CSS Module type definitions
 * 
 * This module represents a CSS module loader that handles style injection
 * and provides typed access to CSS class names.
 */

/**
 * CSS module class names mapping
 * Maps CSS class names defined in the stylesheet to string identifiers
 */
interface CSSModuleClasses {
  readonly [className: string]: string;
}

/**
 * Style loader configuration options
 */
interface StyleLoaderOptions {
  /**
   * Function to transform and inject style tags into the DOM
   */
  styleTagTransform: () => void;
  
  /**
   * Function to set attributes on style elements
   */
  setAttributes: () => void;
  
  /**
   * Function to insert style elements into a specified DOM location
   * @param target - The DOM location where styles should be inserted (e.g., "head")
   */
  insert: (target: string) => void;
  
  /**
   * DOM API handler for style manipulation
   */
  domAPI: () => void;
  
  /**
   * Function to create and insert style elements
   */
  insertStyleElement: () => void;
}

/**
 * CSS module object containing stylesheet data and local class mappings
 */
interface CSSModule {
  /**
   * Optional mapping of local CSS class names to their hashed/scoped equivalents
   */
  locals?: CSSModuleClasses;
}

/**
 * Default export: CSS module class names
 * 
 * Provides type-safe access to CSS class names defined in the associated stylesheet.
 * Returns undefined if no local class mappings are available.
 */
declare const cssModuleExport: CSSModuleClasses | undefined;

export default cssModuleExport;

/**
 * Re-exported members from the underlying CSS module
 * Includes any named exports from the stylesheet (if applicable)
 */
export * from './css-module-source';