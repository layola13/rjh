/**
 * CSS Module exports for module_807970
 * This module handles style injection and exports CSS class name mappings
 */

/**
 * CSS class name mappings exported by the CSS module.
 * Maps semantic class names to their hashed/scoped equivalents.
 */
export interface CSSModuleClasses {
  [className: string]: string;
}

/**
 * Configuration object for style injection
 */
interface StyleInjectionConfig {
  /** Transforms style tags before insertion */
  styleTagTransform: () => void;
  /** Sets attributes on style elements */
  setAttributes: () => void;
  /** Inserts style elements into the DOM */
  insert: (target: string) => void;
  /** API for DOM manipulation */
  domAPI: () => void;
  /** Creates and inserts style elements */
  insertStyleElement: () => void;
}

/**
 * Default export containing the CSS module's class name mappings.
 * Returns undefined if no locals are defined in the CSS module.
 */
declare const cssModuleExports: CSSModuleClasses | undefined;

export default cssModuleExports;

/**
 * Re-exports all named exports from the underlying CSS module
 * (excluding 'default')
 */
export * from './style-module';