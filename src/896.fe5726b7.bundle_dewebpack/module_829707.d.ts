/**
 * CSS Module exports type definition
 * Represents the typed interface for CSS class names exported from a stylesheet module
 */

/**
 * Style loader configuration interface
 * Defines the configuration object used by style-loader to inject styles into the DOM
 */
interface StyleLoaderConfig {
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
   * Function to insert style elements into the document
   */
  insertStyleElement: () => void;
}

/**
 * CSS Module locals type
 * Represents the class name mappings exported by a CSS module
 */
type CSSModuleLocals = Record<string, string> | undefined;

/**
 * CSS Module exports
 * Contains all named exports from the stylesheet module
 */
declare const exports: Record<string, unknown>;

/**
 * Default export - CSS Module class names
 * Maps CSS class names to their hashed/scoped equivalents
 * Returns undefined if no local class names are defined
 */
declare const _default: CSSModuleLocals;

export default _default;
export { exports as namedExports };