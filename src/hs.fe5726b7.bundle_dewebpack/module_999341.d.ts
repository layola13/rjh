/**
 * CSS Module Type Definitions
 * 
 * This module exports CSS class names as typed properties.
 * The actual styles are loaded via CSS loaders in the build process.
 */

/**
 * CSS module class names mapping
 * Maps class name strings to their scoped/hashed equivalents
 */
export interface CSSModuleClasses {
  readonly [className: string]: string;
}

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
   * Function to insert style elements into specified location
   * Bound to "head" insertion point
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
 * CSS Module Locals
 * Contains the exported class names from the CSS module
 * Returns undefined if no locals are defined
 */
export type CSSModuleLocals = CSSModuleClasses | undefined;

/**
 * Default export: CSS module class names
 * Use this to access typed CSS class names in your components
 * 
 * @example
 * import styles from './styles.module.css';
 * const className = styles.container; // Type-safe access
 */
declare const cssModuleExport: CSSModuleLocals;

export default cssModuleExport;

/**
 * Re-exported items from the underlying CSS module loader
 * These are typically internal implementation details
 */
export * from './css-module-loader';