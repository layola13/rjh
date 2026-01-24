/**
 * CSS Module type definitions
 * This module handles stylesheet imports and provides typed class name exports
 */

/**
 * CSS Module class names mapping
 * Contains all exported class names from the stylesheet as string properties
 */
interface CSSModuleClasses {
  readonly [className: string]: string;
}

/**
 * Style injection configuration options
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
   * Bound to insert into the document head
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
 * Default export: CSS module class names
 * Returns an object mapping class names to their hashed/scoped equivalents,
 * or undefined if no local classes are defined
 */
declare const cssModuleExport: CSSModuleClasses | undefined;

export default cssModuleExport;

/**
 * Re-exported members from the stylesheet module
 * Includes any named exports from the original CSS module
 */
export * from './stylesheet-module';