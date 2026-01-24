/**
 * CSS Module Loader
 * Handles style injection and CSS module exports
 */

/**
 * CSS module class names mapping.
 * Maps local class names to their scoped equivalents.
 */
export type CSSModuleClasses = Record<string, string> | undefined;

/**
 * Style loader options for runtime style injection.
 */
export interface StyleLoaderOptions {
  /**
   * Transform function applied to style tags before insertion.
   */
  styleTagTransform: () => void;

  /**
   * Sets attributes on the style element.
   */
  setAttributes: () => void;

  /**
   * Inserts the style element into the specified DOM location.
   * Bound to insert into 'head' element.
   */
  insert: (target: string) => void;

  /**
   * DOM API utilities for style manipulation.
   */
  domAPI: () => void;

  /**
   * Creates and inserts a style element into the DOM.
   */
  insertStyleElement: () => void;
}

/**
 * CSS module metadata and content.
 */
export interface CSSModule {
  /**
   * Local class name mappings for CSS modules.
   * Maps original class names to their hashed/scoped versions.
   */
  locals?: Record<string, string>;

  /**
   * Raw CSS content or module metadata.
   */
  [key: string]: unknown;
}

/**
 * Default export: CSS module class names.
 * Contains the mapping of local class names to their scoped equivalents.
 * Returns undefined if no locals are defined.
 */
declare const cssModuleClasses: CSSModuleClasses;

export default cssModuleClasses;

/**
 * Re-exported members from the CSS module (excluding 'default').
 * Allows named imports of any additional exports from the CSS module.
 */
export * from './css-module-source';