/**
 * CSS Module Type Definitions
 * Provides type-safe access to CSS class names and module exports
 */

/**
 * CSS class name mappings exported by the module
 * Maps logical class names to their actual (possibly hashed) class names
 */
export interface CSSModuleLocals {
  [className: string]: string;
}

/**
 * Style loader configuration options
 */
export interface StyleLoaderOptions {
  /** Function to transform and inject style tags into the DOM */
  styleTagTransform: () => void;
  
  /** Function to set attributes on style elements */
  setAttributes: () => void;
  
  /** Function to insert style elements into the document */
  insert: (target: string) => void;
  
  /** DOM manipulation API */
  domAPI: () => void;
  
  /** Function to create and insert style elements */
  insertStyleElement: () => void;
}

/**
 * CSS module export structure
 */
export interface CSSModuleExports {
  /** CSS class name mappings (if CSS Modules are enabled) */
  locals?: CSSModuleLocals;
  
  /** Additional module exports */
  [key: string]: unknown;
}

/**
 * Default export: CSS class name mappings or undefined
 * Use this to access type-safe CSS class names in your components
 * 
 * @example
 * import styles from './styles.css';
 * const className = styles?.buttonPrimary ?? '';
 */
declare const cssModuleExports: CSSModuleLocals | undefined;

export default cssModuleExports;

/**
 * Re-exported members from the underlying CSS module
 * All named exports from the original module are available here
 */
export * from './css-module-base';