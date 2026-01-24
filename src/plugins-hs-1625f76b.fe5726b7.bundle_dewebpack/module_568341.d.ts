/**
 * CSS Module loader type definitions
 * This module handles CSS-in-JS style injection and provides typed class name exports
 */

/**
 * CSS Modules class name mapping
 * Maps CSS class names to their hashed/scoped equivalents
 */
type CSSModuleClasses = Record<string, string>;

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
   * Function to insert style elements into a target container
   * @param target - The DOM selector or element to insert into (e.g., "head")
   */
  insert: (target: string) => void;

  /**
   * DOM API abstraction for style manipulation
   */
  domAPI: () => void;

  /**
   * Function to create and insert style elements
   */
  insertStyleElement: () => void;
}

/**
 * Re-exported types and utilities from the CSS module
 * All named exports except 'default' are preserved here
 */
export * from './css-module-source';

/**
 * Default export: CSS Modules class name mapping
 * Contains the locally scoped class names for this CSS module
 * Returns undefined if no local classes are defined
 */
declare const cssModuleExports: CSSModuleClasses | undefined;

export default cssModuleExports;