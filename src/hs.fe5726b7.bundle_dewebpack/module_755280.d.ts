/**
 * CSS Module type definitions for module_755280
 * 
 * This module exports CSS class names as a typed object, providing
 * type-safe access to CSS classes imported from a stylesheet.
 */

/**
 * CSS Modules class name mapping interface.
 * Maps CSS class names to their generated/hashed equivalents.
 */
export interface CSSModuleClasses {
  readonly [className: string]: string;
}

/**
 * Style loader configuration options for injecting CSS into the DOM.
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
   * @param target - The DOM selector where styles should be inserted (e.g., "head")
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
 * Default export: CSS Module class names object.
 * 
 * Contains the mapping of original CSS class names to their
 * processed equivalents. Returns undefined if no locals are defined.
 * 
 * @example
 *