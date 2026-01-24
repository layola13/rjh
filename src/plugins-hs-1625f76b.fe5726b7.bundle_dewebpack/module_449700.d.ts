/**
 * CSS Module exports type definition
 * This module represents a CSS Modules import with style injection functionality
 */

/**
 * CSS Module class names mapping
 * Maps CSS class names to their hashed/scoped equivalents
 */
export interface CSSModuleClasses {
  [className: string]: string;
}

/**
 * Style injection configuration options
 */
export interface StyleLoaderOptions {
  /** Transform function to apply to style tags before insertion */
  styleTagTransform: () => void;
  
  /** Function to set attributes on style elements */
  setAttributes: () => void;
  
  /** DOM insertion strategy function */
  insert: (target: string) => void;
  
  /** DOM API manipulation utilities */
  domAPI: () => void;
  
  /** Factory function to create style elements */
  insertStyleElement: () => void;
}

/**
 * Default export: CSS Module class names
 * Returns the locally scoped class names for this CSS module, or undefined if not available
 */
declare const cssModuleLocals: CSSModuleClasses | undefined;

export default cssModuleLocals;

/**
 * Re-exported members from the underlying CSS module
 * All named exports from the CSS processor are available here
 */
export * from './underlying-css-module';