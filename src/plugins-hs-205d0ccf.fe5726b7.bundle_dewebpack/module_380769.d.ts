/**
 * CSS Module type definitions
 * This module handles CSS-in-JS style injection and exports CSS module class names
 */

/**
 * CSS Module class names mapping
 * Maps semantic class identifiers to generated CSS class names
 */
export interface CSSModuleClasses {
  [className: string]: string;
}

/**
 * Style loader configuration options
 */
export interface StyleLoaderOptions {
  /**
   * Function to transform and inject style tags into the DOM
   */
  styleTagTransform: () => void;

  /**
   * Function to set attributes on style elements
   */
  setAttributes: () => void;

  /**
   * Function to insert style elements into a specific DOM location
   * @param target - The DOM target (e.g., "head")
   */
  insert: (target: string) => void;

  /**
   * DOM API adapter for style manipulation
   */
  domAPI: () => void;

  /**
   * Function to create and insert style elements
   */
  insertStyleElement: () => void;
}

/**
 * Default export: CSS module locals (class name mappings)
 * Returns undefined if no CSS classes are defined
 */
declare const cssModuleLocals: CSSModuleClasses | undefined;

export default cssModuleLocals;