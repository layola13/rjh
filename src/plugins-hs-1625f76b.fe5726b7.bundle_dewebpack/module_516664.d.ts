/**
 * CSS Module Type Definition
 * 
 * This module represents a CSS-in-JS or CSS Modules import with associated style injection logic.
 * It exports class names and handles runtime style injection into the DOM.
 */

/**
 * CSS class names mapping exported by the module.
 * Maps CSS class identifiers to their processed/hashed names.
 */
export interface CSSModuleClasses {
  [className: string]: string;
}

/**
 * Style loader configuration object.
 * Contains methods for injecting and managing styles in the DOM.
 */
export interface StyleLoaderConfiguration {
  /**
   * Transforms and applies style tags to the document.
   */
  styleTagTransform: () => void;
  
  /**
   * Sets attributes on style elements.
   */
  setAttributes: () => void;
  
  /**
   * Inserts style elements into a specified DOM location.
   * @param target - The DOM location where styles should be inserted (e.g., "head")
   */
  insert: (target: string) => void;
  
  /**
   * DOM manipulation API for style injection.
   */
  domAPI: () => void;
  
  /**
   * Creates and inserts style elements into the document.
   */
  insertStyleElement: () => void;
}

/**
 * Default export: CSS module class names.
 * Contains the locally scoped class names for this CSS module.
 * Returns undefined if no local classes are defined.
 */
declare const cssModuleLocals: CSSModuleClasses | undefined;

export default cssModuleLocals;

/**
 * Re-exported members from the underlying CSS module implementation.
 * All named exports except 'default' are forwarded from the base module.
 */
export * from './base-css-module';