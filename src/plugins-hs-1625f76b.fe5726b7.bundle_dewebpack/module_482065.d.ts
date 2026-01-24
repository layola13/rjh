/**
 * CSS Module type definitions
 * This module handles style injection and exports CSS class name mappings
 */

/**
 * CSS class name mappings exported by the CSS module
 * Maps semantic class names to their hashed/scoped equivalents
 */
export interface CSSModuleClasses {
  [className: string]: string;
}

/**
 * Configuration options for style injection
 */
export interface StyleInjectionOptions {
  /**
   * Transforms style tags before insertion into DOM
   */
  styleTagTransform: () => void;
  
  /**
   * Sets attributes on style elements
   */
  setAttributes: () => void;
  
  /**
   * Inserts style elements into specified DOM location
   * @param target - DOM insertion target (e.g., "head")
   */
  insert: (target: string) => void;
  
  /**
   * DOM manipulation API for style injection
   */
  domAPI: () => void;
  
  /**
   * Creates and inserts style element into DOM
   */
  insertStyleElement: () => void;
}

/**
 * CSS Module with optional locals (class name mappings)
 */
export interface CSSModule {
  /**
   * Local class name mappings if CSS Modules are enabled
   */
  locals?: CSSModuleClasses;
}

/**
 * Default export: CSS class name mappings or undefined
 * Use this to access scoped CSS class names in your components
 * 
 * @example
 * import styles from './styles.module.css';
 * <div className={styles.container} />
 */
declare const cssModuleExports: CSSModuleClasses | undefined;

export default cssModuleExports;

/**
 * Re-exported items from the underlying CSS module
 * Allows direct import of specific exports if available
 */
export * from './styles.module.css';