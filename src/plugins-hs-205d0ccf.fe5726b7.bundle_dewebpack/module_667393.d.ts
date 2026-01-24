/**
 * CSS Modules type definitions
 * This module represents a CSS module loaded through webpack's style-loader chain
 */

/**
 * CSS Module class names mapping
 * Maps CSS class names to their hashed/scoped equivalents
 */
export interface CSSModuleClasses {
  readonly [className: string]: string;
}

/**
 * Style loader options for runtime style injection
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
   * Bound to insert into the document head
   */
  insert: (target: string) => void;
  
  /**
   * DOM manipulation API for style operations
   */
  domAPI: () => unknown;
  
  /**
   * Function to create and insert style DOM elements
   */
  insertStyleElement: () => void;
}

/**
 * Default export: CSS Module class names
 * Contains the locally scoped CSS class names for this module
 * Returns undefined if no local classes are defined
 */
declare const cssModuleClasses: CSSModuleClasses | undefined;

export default cssModuleClasses;

/**
 * Re-exported members from the underlying CSS module
 * All named exports from the source CSS module (excluding 'default')
 */
export * from './source-css-module';