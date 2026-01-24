/**
 * CSS Module type definitions
 * This module represents a dynamically imported CSS module with style injection capabilities.
 * 
 * Original Module ID: 124172
 * Module Type: CSS Module with style-loader integration
 */

/**
 * Style loader configuration options
 * Used to configure how CSS styles are injected into the DOM
 */
interface StyleLoaderOptions {
  /**
   * Function to transform and apply style tags to the DOM
   */
  styleTagTransform: () => void;
  
  /**
   * Function to set attributes on style elements
   */
  setAttributes: () => void;
  
  /**
   * Function to insert style elements into a specific DOM location
   * @param target - The target element selector (e.g., "head")
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
 * CSS Module exports containing class name mappings
 * Maps original class names to their hashed/scoped equivalents
 */
interface CSSModuleLocals {
  [className: string]: string;
}

/**
 * CSS Module with optional locals property
 */
interface CSSModule {
  /**
   * Scoped CSS class name mappings
   * Present when CSS modules are enabled, undefined otherwise
   */
  locals?: CSSModuleLocals;
}

/**
 * Default export: CSS module class name mappings
 * Returns the scoped class names if CSS modules are enabled, undefined otherwise
 */
declare const cssModuleExports: CSSModuleLocals | undefined;

export default cssModuleExports;

/**
 * Re-exported members from the CSS module
 * All named exports from the original CSS module are re-exported here
 */
export * from './css-module-source';