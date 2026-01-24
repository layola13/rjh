/**
 * CSS Module exports for module_960387
 * This module handles CSS-in-JS style injection and exports CSS class names
 */

/**
 * CSS class name mappings exported by the CSS module
 * Maps semantic class names to their hashed/scoped equivalents
 */
export interface CSSModuleClasses {
  [className: string]: string;
}

/**
 * Style injection configuration options
 */
interface StyleInjectionOptions {
  /** Transform function to modify style tags before insertion */
  styleTagTransform: () => void;
  /** Set attributes on style elements */
  setAttributes: () => void;
  /** Insert styles into specified DOM location */
  insert: (target: string) => void;
  /** DOM manipulation API */
  domAPI: () => void;
  /** Create and insert style element */
  insertStyleElement: () => void;
}

/**
 * CSS module loader that injects styles into the document
 * @returns The CSS class name mappings, or undefined if no locals exist
 */
declare const cssModule: CSSModuleClasses | undefined;

export default cssModule;

/**
 * Re-export all named exports from the original CSS module
 * (excluding the default export)
 */
export * from './original-css-module';