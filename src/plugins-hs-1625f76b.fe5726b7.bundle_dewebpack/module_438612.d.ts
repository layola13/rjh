/**
 * CSS Module exports for module_438612
 * 
 * This module handles CSS-in-JS style injection and exports CSS module class names.
 * It uses style-loader to dynamically inject styles into the DOM.
 */

/**
 * CSS Module class name mappings
 * 
 * Contains the local class names exported by the CSS module.
 * Maps semantic class names to their hashed/scoped equivalents.
 */
export interface CSSModuleClasses {
  [className: string]: string;
}

/**
 * Style loader API configuration
 * 
 * Configuration object for the style-loader that handles
 * DOM insertion and transformation of CSS styles.
 */
export interface StyleLoaderAPI {
  /** Transform function for style tag manipulation */
  styleTagTransform: () => void;
  
  /** Sets attributes on style elements */
  setAttributes: () => void;
  
  /** Inserts style elements into the DOM */
  insert: (target: string) => void;
  
  /** DOM manipulation API */
  domAPI: () => void;
  
  /** Creates and inserts style elements */
  insertStyleElement: () => void;
}

/**
 * Default export containing CSS module class names
 * 
 * @returns CSS module locals (class name mappings) if available, undefined otherwise
 */
declare const cssModuleExports: CSSModuleClasses | undefined;

export default cssModuleExports;

/**
 * Re-exported members from the CSS module (excluding 'default')
 * 
 * All named exports from the original CSS module are re-exported here,
 * typically containing individual class name strings.
 */
export * from './original-css-module';