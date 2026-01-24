/**
 * CSS Module Type Definitions
 * 
 * This module represents a CSS-in-JS module with style injection capabilities.
 * It handles dynamic stylesheet insertion and management in the DOM.
 */

/**
 * CSS module locals interface
 * Maps CSS class names to their hashed/scoped equivalents
 */
export interface CSSModuleLocals {
  [className: string]: string;
}

/**
 * Style injection options
 * Configuration for how styles are injected into the document
 */
export interface StyleInjectionOptions {
  /** Transform function for style tags before insertion */
  styleTagTransform: () => void;
  
  /** Function to set attributes on style elements */
  setAttributes: () => void;
  
  /** Insert function bound to target element (typically "head") */
  insert: (target: string) => void;
  
  /** DOM manipulation API */
  domAPI: () => void;
  
  /** Function to create and insert style elements */
  insertStyleElement: () => void;
}

/**
 * Default export: CSS module class name mappings
 * Returns the local class name mappings if available, otherwise undefined
 */
declare const cssModuleExport: CSSModuleLocals | undefined;

export default cssModuleExport;

/**
 * Re-exported members from the stylesheet module (if any)
 * All named exports from the source CSS module are re-exported here
 */
export * from './stylesheet-module';