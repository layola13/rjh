/**
 * CSS Module type definitions
 * Generated from webpack CSS loader output
 */

/**
 * CSS Modules class name mapping interface
 * Maps CSS class names to their hashed/scoped equivalents
 */
export interface CSSModuleClasses {
  readonly [className: string]: string;
}

/**
 * Style loader insertion options
 * Configuration for injecting styles into the document
 */
export interface StyleLoaderOptions {
  /**
   * Transform function applied to style tags before insertion
   */
  styleTagTransform?: () => void;
  
  /**
   * Function to set attributes on style elements
   */
  setAttributes?: () => void;
  
  /**
   * DOM insertion strategy bound to target element
   */
  insert?: (target: string) => void;
  
  /**
   * DOM manipulation API implementation
   */
  domAPI?: () => void;
  
  /**
   * Factory function for creating style elements
   */
  insertStyleElement?: () => void;
}

/**
 * CSS Module exports
 * Default export contains the scoped class name mappings
 */
declare const cssModuleExports: CSSModuleClasses | undefined;

export default cssModuleExports;

/**
 * Re-exported members from the original CSS module
 * All named exports except 'default' are preserved
 */
export * from './original-css-module';