/**
 * CSS Module loader type definitions
 * Handles style injection and CSS module exports
 */

/**
 * CSS Module class name mappings
 * Maps local class names to their generated/hashed equivalents
 */
export interface CSSModuleClasses {
  readonly [key: string]: string;
}

/**
 * Style loader options for runtime style injection
 */
export interface StyleLoaderOptions {
  /**
   * Transform function to process style tags before insertion
   */
  styleTagTransform: () => void;
  
  /**
   * Function to set attributes on style elements
   */
  setAttributes: () => void;
  
  /**
   * DOM insertion function, bound to insert into specified element
   * @param target - Target element selector (e.g., "head")
   */
  insert: (target: string) => void;
  
  /**
   * DOM API implementation for style manipulation
   */
  domAPI: () => void;
  
  /**
   * Function to create and insert style elements
   */
  insertStyleElement: () => void;
}

/**
 * CSS Module with metadata
 */
export interface CSSModule {
  /**
   * Local class name mappings (present in CSS modules)
   */
  locals?: CSSModuleClasses;
  
  /**
   * Additional module properties
   */
  [key: string]: unknown;
}

/**
 * Default export: CSS Module class names or undefined
 * Contains the mapping of local CSS class names to their hashed versions
 */
declare const cssModuleExports: CSSModuleClasses | undefined;

export default cssModuleExports;

/**
 * Re-exported members from the CSS module
 * All named exports from the original CSS file are available here
 */
export * from './styles.module.css';