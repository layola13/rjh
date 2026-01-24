/**
 * CSS Module Loader Type Definitions
 * 
 * This module handles CSS module loading and style injection in a webpack environment.
 * It exports CSS class names as a typed object for use in TypeScript components.
 */

/**
 * CSS Module class names mapping
 * Maps CSS class names to their hashed/scoped equivalents
 */
export type CSSModuleClasses = Record<string, string>;

/**
 * Style loader configuration options
 */
export interface StyleLoaderOptions {
  /** Function to transform and inject style tags into the DOM */
  styleTagTransform: () => void;
  
  /** Function to set attributes on style elements */
  setAttributes: () => void;
  
  /** Function to insert style elements into a specified DOM location */
  insert: (target: string) => void;
  
  /** DOM manipulation API for style injection */
  domAPI: () => void;
  
  /** Function to create and insert style elements */
  insertStyleElement: () => void;
}

/**
 * CSS Module with optional locals (class names)
 */
export interface CSSModule {
  /** The hashed CSS class name mappings, if available */
  locals?: CSSModuleClasses;
}

/**
 * Default export: CSS Module class names
 * 
 * Contains the mapping of original CSS class names to their scoped versions.
 * Returns undefined if no class names are exported from the CSS module.
 * 
 * @example
 * import styles from './styles.module.css';
 * const className = styles.button; // 'button_a3d9f2'
 */
declare const cssModuleExport: CSSModuleClasses | undefined;

export default cssModuleExport;

/**
 * Re-exported members from the CSS module loader
 * All named exports from the underlying CSS module are re-exported here
 */
export * from './css-module-loader';