/**
 * CSS Module type definitions
 * Module: module_512873
 * Original ID: 512873
 * 
 * This module handles CSS module loading and style injection.
 * It provides typed access to CSS class names exported by the stylesheet.
 */

/**
 * CSS Module class names mapping
 * Keys represent the original class names in the CSS file
 * Values are the transformed/hashed class names used at runtime
 */
export interface CSSModuleClasses {
  [className: string]: string;
}

/**
 * Style injection configuration
 * Contains methods and strategies for inserting styles into the DOM
 */
export interface StyleInjectionConfig {
  /** Transform and apply style tags to the DOM */
  styleTagTransform: () => void;
  /** Set attributes on style elements */
  setAttributes: () => void;
  /** Insert style element into specified container */
  insert: (container: string) => void;
  /** DOM manipulation API for style handling */
  domAPI: () => void;
  /** Create and insert style element into DOM */
  insertStyleElement: () => void;
}

/**
 * Default export - CSS Module class names
 * Returns the local class name mappings if available, undefined otherwise
 */
declare const cssModuleExports: CSSModuleClasses | undefined;

export default cssModuleExports;

/**
 * Re-exported members from the underlying CSS module
 * All named exports from the original stylesheet are available here
 */
export * from './stylesheet';