/**
 * CSS Module type definitions
 * Webpack style-loader module wrapper converted to TypeScript declarations
 */

/**
 * CSS class name mappings exported by the CSS module
 * Contains locally scoped class names that can be imported and used in components
 */
export type CSSModuleClasses = Record<string, string>;

/**
 * Style loader options for injecting CSS into the DOM
 */
export interface StyleLoaderOptions {
  /**
   * Function to transform and inject style tags into the document
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
   * DOM API utilities for style manipulation
   */
  domAPI: () => void;
  
  /**
   * Function to create and insert style elements
   */
  insertStyleElement: () => void;
}

/**
 * Default export: CSS module class name mappings
 * Returns an object mapping CSS class names to their hashed/scoped equivalents
 * Returns undefined if no local class names are defined
 */
declare const cssModuleExports: CSSModuleClasses | undefined;

export default cssModuleExports;

/**
 * Re-exported named exports from the original CSS module (module_885866)
 * All named exports except 'default' are forwarded
 */
export * from './module_885866';