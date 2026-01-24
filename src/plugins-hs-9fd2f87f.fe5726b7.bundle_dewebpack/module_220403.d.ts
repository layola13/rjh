/**
 * CSS Module type definitions for module_220403
 * 
 * This module represents a CSS modules import with style injection capabilities.
 * It handles client-side style tag insertion and provides typed class name exports.
 */

/**
 * CSS Modules class name mapping interface
 * Maps CSS class names to their hashed/scoped equivalents
 */
export interface CSSModuleClasses {
  readonly [className: string]: string;
}

/**
 * Style loader configuration options
 */
export interface StyleLoaderOptions {
  /** Function to transform and inject style tags into the DOM */
  styleTagTransform: () => void;
  
  /** Function to set attributes on style elements */
  setAttributes: () => void;
  
  /** Function to insert style elements into a specific DOM location */
  insert: (target: string) => void;
  
  /** DOM manipulation API for style injection */
  domAPI: () => void;
  
  /** Function to create and insert style elements */
  insertStyleElement: () => void;
}

/**
 * CSS Module exports
 * Contains the scoped class names defined in the stylesheet
 * 
 * @example
 * import styles from './module_220403';
 * const className = styles.myClass; // Returns hashed class name
 */
declare const cssModuleExports: CSSModuleClasses | undefined;

export default cssModuleExports;

/**
 * Re-exported style utilities and helpers
 * These are additional exports from the underlying style loader module
 */
export * from './style-loader-module';