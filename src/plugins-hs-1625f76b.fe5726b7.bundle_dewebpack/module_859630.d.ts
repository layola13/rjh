/**
 * CSS Module exports type definition
 * Module: module_859630
 * Original ID: 859630
 */

/**
 * CSS Modules class name mapping interface.
 * Contains locally scoped class names exported from the CSS file.
 */
interface CSSModuleLocals {
  [className: string]: string;
}

/**
 * Style loader injection options configuration.
 * Defines how CSS is injected and managed in the DOM.
 */
interface StyleLoaderOptions {
  /**
   * Transform function applied to style tags before insertion
   */
  styleTagTransform: () => void;
  
  /**
   * Function to set custom attributes on style elements
   */
  setAttributes: () => void;
  
  /**
   * DOM insertion strategy bound to specific target element
   * @param target - The DOM insertion target (e.g., "head")
   */
  insert: (target: string) => void;
  
  /**
   * DOM API utility for style manipulation
   */
  domAPI: () => void;
  
  /**
   * Function to create and insert style elements into the DOM
   */
  insertStyleElement: () => void;
}

/**
 * CSS Module exports.
 * If the module has local class names, they are exported as a key-value mapping.
 * Otherwise, returns undefined.
 */
declare const cssModuleExports: CSSModuleLocals | undefined;

export default cssModuleExports;

/**
 * Re-export all named exports from the underlying CSS module
 * (excluding the default export)
 */
export * from './css-module-source';