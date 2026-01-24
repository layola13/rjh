/**
 * CSS Module Definition
 * 
 * This module represents a CSS modules file that exports typed class names
 * and provides style injection functionality for client-side rendering.
 */

/**
 * CSS module class names mapping
 * Maps CSS class identifiers to their hashed/scoped equivalents
 */
export interface CSSModuleClasses {
  [className: string]: string;
}

/**
 * Style injection configuration for CSS modules
 */
export interface StyleLoaderConfig {
  /**
   * Transform and inject style tag into DOM
   */
  styleTagTransform: () => void;
  
  /**
   * Set attributes on style elements
   */
  setAttributes: () => void;
  
  /**
   * Insert style element into specified DOM location
   * @param target - DOM insertion point (e.g., "head")
   */
  insert: (target: string) => void;
  
  /**
   * DOM manipulation API for style injection
   */
  domAPI: () => void;
  
  /**
   * Create and insert style element
   */
  insertStyleElement: () => void;
}

/**
 * Default export: CSS module class names
 * Returns undefined if no local class names are defined
 */
declare const cssModuleExport: CSSModuleClasses | undefined;

export default cssModuleExport;

/**
 * Re-exported members from the underlying CSS module
 * Includes all named exports except 'default'
 */
export * from './css-module-source';