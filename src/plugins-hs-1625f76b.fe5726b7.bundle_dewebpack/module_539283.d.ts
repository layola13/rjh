/**
 * CSS Module Definition
 * 
 * This module represents a CSS modules file that exports typed class names
 * and handles style injection into the DOM.
 */

/**
 * CSS module class names mapping
 * Maps CSS class names to their hashed/scoped equivalents
 */
export interface CSSModuleClasses {
  [className: string]: string;
}

/**
 * Style loader options for DOM manipulation
 */
export interface StyleLoaderOptions {
  /** Transforms style tags before insertion */
  styleTagTransform: () => void;
  /** Sets attributes on style elements */
  setAttributes: () => void;
  /** Inserts style elements into specified location */
  insert: (target: string) => void;
  /** DOM manipulation API */
  domAPI: () => void;
  /** Creates and inserts style elements */
  insertStyleElement: () => void;
}

/**
 * CSS Module export structure
 * Contains the scoped class names for use in components
 */
export type CSSModule = CSSModuleClasses | undefined;

/**
 * Default export: CSS module class names
 * Use this to access typed CSS class names in your components
 * 
 * @example
 * import styles from './styles.module.css';
 * <div className={styles.container} />
 */
declare const cssModuleExport: CSSModule;

export default cssModuleExport;

/**
 * Re-exported utilities from the underlying CSS module loader
 * These are typically used internally by the build system
 */
export * from './css-module-loader';