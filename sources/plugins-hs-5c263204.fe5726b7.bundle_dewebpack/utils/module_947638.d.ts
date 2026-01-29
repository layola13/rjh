/**
 * CSS Module Loader Type Definitions
 * 
 * This module represents a webpack CSS module with style injection capabilities.
 * It provides type-safe access to CSS class names and handles style injection into the DOM.
 */

/**
 * CSS Modules class name mapping.
 * Maps CSS class names to their hashed/scoped equivalents.
 */
export interface CSSModuleClasses {
  [className: string]: string;
}

/**
 * Style loader options for DOM manipulation and style injection.
 */
export interface StyleLoaderOptions {
  /**
   * Transforms style tags before insertion into the DOM.
   */
  styleTagTransform: () => void;

  /**
   * Sets attributes on style elements.
   */
  setAttributes: () => void;

  /**
   * Inserts style elements into a specified DOM location.
   * Bound to insert into the document head.
   */
  insert: (target: string) => void;

  /**
   * DOM API utilities for style manipulation.
   */
  domAPI: () => void;

  /**
   * Creates and inserts style elements into the DOM.
   */
  insertStyleElement: () => void;
}

/**
 * CSS Module content with metadata.
 */
export interface CSSModule {
  /**
   * Local class name mappings for CSS modules.
   * Contains the scoped class names that can be used in components.
   */
  locals?: CSSModuleClasses;

  /**
   * Additional CSS module properties.
   */
  [key: string]: unknown;
}

/**
 * Default export: CSS Module class names or undefined if no locals exist.
 * 
 * @example
 * import styles from './styles.module.css';
 * const className = styles?.myClass;
 */
declare const cssModuleExport: CSSModuleClasses | undefined;

export default cssModuleExport;

/**
 * Re-exported members from the underlying CSS module (excluding 'default').
 * Allows named imports of any additional exports from the CSS module.
 */
export * from './underlying-css-module';