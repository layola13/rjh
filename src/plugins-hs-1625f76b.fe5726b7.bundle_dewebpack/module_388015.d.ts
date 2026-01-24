/**
 * CSS Module type definitions
 * @module CSSModuleDefinitions
 */

/**
 * CSS module class names mapping
 * Represents the exported class names from a CSS module
 */
interface CSSModuleClasses {
  readonly [key: string]: string;
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
   * Function to insert style elements into a specific DOM location
   * @param target - The DOM location to insert styles (e.g., "head")
   */
  insert: (target: string) => void;
  
  /**
   * DOM API methods for style manipulation
   */
  domAPI: () => void;
  
  /**
   * Function to create and insert style elements
   */
  insertStyleElement: () => void;
}

/**
 * Re-exported members from the CSS module (excluding 'default')
 */
export * from './css-module-source';

/**
 * Default export: CSS module class names mapping
 * Returns the local class names if available, otherwise undefined
 */
declare const cssModuleExport: CSSModuleClasses | undefined;

export default cssModuleExport;