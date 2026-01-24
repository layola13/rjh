/**
 * CSS Module exports type definition
 * Represents a dynamically loaded CSS module with class name mappings
 */

/**
 * CSS class name mapping for the module
 * Maps style identifiers to their generated class names
 */
export type CSSModuleClasses = Record<string, string>;

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
   * @param target - The DOM element or selector where styles should be inserted
   */
  insert: (target: string) => void;

  /**
   * DOM manipulation API for style injection
   */
  domAPI: () => void;

  /**
   * Function to create and insert style elements
   */
  insertStyleElement: () => void;
}

/**
 * CSS Module locals (class name mappings)
 * Contains the exported class names from the CSS module
 */
declare const cssModuleLocals: CSSModuleClasses | undefined;

export default cssModuleLocals;

/**
 * Re-exported types and utilities from the underlying CSS module
 * All named exports from the original module (excluding 'default')
 */
export * from './original-css-module';