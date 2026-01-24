/**
 * CSS Module type definitions
 * 
 * This module represents a CSS modules loader configuration that exports
 * class names and their corresponding scoped identifiers.
 */

/**
 * CSS module class names mapping
 * Maps original class names to their scoped/hashed versions
 */
export interface CSSModuleClasses {
  readonly [className: string]: string;
}

/**
 * Style loader configuration options
 */
export interface StyleLoaderOptions {
  /**
   * Transform function to apply styles to the DOM
   */
  styleTagTransform: () => void;
  
  /**
   * Function to set attributes on style elements
   */
  setAttributes: () => void;
  
  /**
   * Function to insert style elements into the document
   * @param target - The target element selector (e.g., "head")
   */
  insert: (target: string) => void;
  
  /**
   * DOM manipulation API interface
   */
  domAPI: () => void;
  
  /**
   * Function to insert style elements
   */
  insertStyleElement: () => void;
}

/**
 * Default export: CSS module class names or undefined
 * 
 * When CSS modules are available, exports an object mapping class names
 * to their scoped identifiers. Returns undefined if no locals are present.
 */
declare const cssModuleExport: CSSModuleClasses | undefined;

export default cssModuleExport;

/**
 * Re-exported members from the CSS module (excluding 'default')
 * Allows named imports of any additional exports from the CSS module
 */
export * from './css-module-source';