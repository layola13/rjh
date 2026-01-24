/**
 * CSS Module type definitions
 * Handles dynamic CSS injection and style management
 */

/**
 * CSS module class names mapping
 * Maps semantic class names to their generated/hashed equivalents
 */
export interface CSSModuleClasses {
  [className: string]: string;
}

/**
 * Style injection options configuration
 */
export interface StyleInjectionOptions {
  /**
   * Transforms style tags before insertion
   */
  styleTagTransform: () => void;
  
  /**
   * Sets attributes on style elements
   */
  setAttributes: () => void;
  
  /**
   * Inserts style elements into the specified container
   * @param container - Target DOM container (e.g., 'head')
   */
  insert: (container: string) => void;
  
  /**
   * DOM API for style manipulation
   */
  domAPI: () => void;
  
  /**
   * Creates and inserts style elements
   */
  insertStyleElement: () => void;
}

/**
 * Re-exported items from the original CSS module
 * Excludes the default export
 */
export * from './original-css-module';

/**
 * Default export: CSS module locals (class name mappings)
 * Returns the class names object if available, otherwise undefined
 */
declare const cssModuleLocals: CSSModuleClasses | undefined;

export default cssModuleLocals;