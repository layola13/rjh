/**
 * CSS Module exports
 * Provides typed class names for imported CSS modules
 */

/**
 * CSS class name mappings exported by this module.
 * Each property represents a class name defined in the source CSS file.
 */
export interface CSSModuleClasses {
  [className: string]: string;
}

/**
 * Style injection configuration for CSS modules.
 * Controls how styles are inserted and managed in the DOM.
 */
export interface StyleInjectionOptions {
  /** Transform function applied to style tags before insertion */
  styleTagTransform: () => void;
  
  /** Function to set attributes on style elements */
  setAttributes: () => void;
  
  /** Function to insert style elements into the DOM */
  insert: (target: string) => void;
  
  /** DOM manipulation API interface */
  domAPI: () => void;
  
  /** Function to create and insert style elements */
  insertStyleElement: () => void;
}

/**
 * CSS Module loader result.
 * Contains the class name mappings if available, otherwise undefined.
 */
declare const cssModule: CSSModuleClasses | undefined;

export default cssModule;

/**
 * Re-exported members from the underlying CSS module loader.
 * Includes all named exports except 'default'.
 */
export * from './css-module-types';