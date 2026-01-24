/**
 * CSS Module Type Definition
 * 
 * This module represents a CSS-in-JS module with style injection capabilities.
 * It exports CSS class names as a typed object for use in TypeScript components.
 */

/**
 * CSS class names exported by this module.
 * Maps semantic class names to their generated/hashed equivalents.
 */
export interface CSSModuleClasses {
  [className: string]: string;
}

/**
 * Style injection configuration options.
 */
export interface StyleInjectionOptions {
  /**
   * Transforms and injects style tags into the DOM.
   */
  styleTagTransform: () => void;
  
  /**
   * Sets attributes on style elements.
   */
  setAttributes: () => void;
  
  /**
   * Inserts style elements into specified DOM location.
   * @param target - Target DOM location (e.g., "head")
   */
  insert: (target: string) => void;
  
  /**
   * DOM manipulation API for style injection.
   */
  domAPI: () => void;
  
  /**
   * Creates and inserts style elements into the document.
   */
  insertStyleElement: () => void;
}

/**
 * CSS module export containing class name mappings.
 * Returns undefined if no local class names are defined.
 */
declare const cssModuleExport: CSSModuleClasses | undefined;

export default cssModuleExport;

/**
 * Re-export all named exports from the original CSS module.
 * Allows importing specific class names directly.
 */
export * from './original-css-module';