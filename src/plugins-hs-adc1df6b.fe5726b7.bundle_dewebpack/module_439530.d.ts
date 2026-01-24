/**
 * CSS Module type definitions
 * This module handles CSS-in-JS style injection and exports typed class names
 */

/**
 * CSS module class names mapping
 * Contains all the CSS classes exported by the stylesheet
 */
interface CSSModuleClasses {
  readonly [className: string]: string;
}

/**
 * Style loader options for injecting styles into the DOM
 */
interface StyleLoaderOptions {
  /**
   * Transform function to modify style tags before insertion
   */
  styleTagTransform: () => void;
  
  /**
   * Function to set attributes on style elements
   */
  setAttributes: () => void;
  
  /**
   * Insert function to add style elements to the specified location
   * @param target - DOM location to insert styles (e.g., "head")
   */
  insert: (target: string) => void;
  
  /**
   * DOM API interface for style manipulation
   */
  domAPI: () => void;
  
  /**
   * Function to create and insert style elements
   */
  insertStyleElement: () => void;
}

/**
 * CSS Module exports
 * Provides the class name mappings from the imported stylesheet
 * Returns undefined if no locals are defined
 */
declare const cssModuleExports: CSSModuleClasses | undefined;

export default cssModuleExports;

/**
 * Re-export all named exports from the original CSS module
 * Allows importing specific class names directly
 */
export * from './stylesheet';