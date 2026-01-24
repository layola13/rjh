/**
 * CSS Module loader configuration and exports
 * Handles style injection and CSS module transformation
 */

/**
 * CSS module class name mappings
 * Maps local class names to their hashed/scoped equivalents
 */
export type CSSModuleClasses = Record<string, string> | undefined;

/**
 * Style loader configuration options
 */
interface StyleLoaderOptions {
  /**
   * Transform function to inject styles into the DOM
   */
  styleTagTransform: () => void;
  
  /**
   * Function to set attributes on style elements
   */
  setAttributes: () => void;
  
  /**
   * Function to insert style elements into a specific DOM location
   * @param target - The DOM selector where styles should be injected (e.g., "head")
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
 * CSS module metadata including styles and local class mappings
 */
interface CSSModule {
  /**
   * Local class name mappings for CSS modules
   */
  locals?: Record<string, string>;
  
  /**
   * Additional CSS module properties
   */
  [key: string]: unknown;
}

/**
 * Default export: CSS module class name mappings
 * Contains the locally scoped class names that can be used in components
 */
declare const cssModuleClasses: CSSModuleClasses;

export default cssModuleClasses;

/**
 * Re-exported members from the CSS module (excluding 'default')
 * Allows direct access to any named exports from the original CSS module
 */
export * from './css-module-source';