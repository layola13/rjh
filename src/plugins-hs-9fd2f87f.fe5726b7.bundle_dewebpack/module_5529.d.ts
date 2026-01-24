/**
 * CSS Module loader type definitions
 * Handles dynamic style injection and CSS module exports
 */

/**
 * CSS Module class names mapping
 * Maps CSS class names to their scoped/hashed equivalents
 */
export type CSSModuleClasses = Record<string, string>;

/**
 * Style injection options for CSS loader
 */
export interface StyleLoaderOptions {
  /**
   * Transform function to apply to style tags before insertion
   */
  styleTagTransform: () => void;

  /**
   * Function to set custom attributes on style elements
   */
  setAttributes: () => void;

  /**
   * DOM insertion function with target element
   * @param target - Target element selector (e.g., "head")
   */
  insert: (target: string) => void;

  /**
   * DOM API interface for style manipulation
   */
  domAPI: () => void;

  /**
   * Function to create and insert style elements
   */
  insertStyleElement: () => void;
}

/**
 * CSS Module with metadata and class mappings
 */
export interface CSSModule {
  /**
   * Scoped CSS class name mappings
   */
  locals?: CSSModuleClasses;

  /**
   * Raw CSS content or metadata
   */
  [key: string]: unknown;
}

/**
 * Default export: CSS Module class names or undefined if no locals
 * Use to access scoped CSS class names in TypeScript
 * 
 * @example
 * import styles from './styles.module.css';
 * const className = styles?.myClass;
 */
declare const cssModuleExport: CSSModuleClasses | undefined;

export default cssModuleExport;

/**
 * Re-exported types and utilities from the underlying CSS module
 */
export * from './original-css-module';