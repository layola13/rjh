/**
 * Style loader module configuration
 * Handles CSS module imports and style injection
 */

/**
 * CSS module class names mapping
 * Contains the generated class names for CSS modules
 */
export type CSSModuleClasses = Record<string, string> | undefined;

/**
 * Style loader configuration options
 */
export interface StyleLoaderOptions {
  /**
   * Function to transform style tags before insertion
   */
  styleTagTransform: () => void;

  /**
   * Function to set attributes on style elements
   */
  setAttributes: () => void;

  /**
   * Function to insert style elements into the DOM
   * Bound to insert into the "head" element
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
 * CSS module exports
 * Re-exports all named exports from the imported CSS module
 */
export * from './styles';

/**
 * Default export containing CSS module class names
 * Returns the locals (class names mapping) if available, otherwise undefined
 */
declare const cssModuleClasses: CSSModuleClasses;
export default cssModuleClasses;