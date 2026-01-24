/**
 * CSS Module Loader
 * 
 * This module handles dynamic CSS injection and provides typed CSS module exports.
 * It re-exports all named exports from the source CSS module and provides locals
 * for CSS class name mapping.
 */

/**
 * CSS module class name mapping.
 * Maps CSS class names to their generated/hashed equivalents.
 */
export type CSSModuleLocals = Record<string, string>;

/**
 * Style loader configuration options.
 */
export interface StyleLoaderOptions {
  /**
   * Transform function to modify style tags before insertion.
   */
  styleTagTransform: () => void;

  /**
   * Function to set attributes on style elements.
   */
  setAttributes: () => void;

  /**
   * Function to insert style elements into the DOM.
   * Bound to insert into the "head" element.
   */
  insert: (target: string) => void;

  /**
   * DOM API utilities for style manipulation.
   */
  domAPI: () => void;

  /**
   * Function to create and insert style elements.
   */
  insertStyleElement: () => void;
}

/**
 * Default export: CSS module locals object.
 * Contains the mapping of local class names to their processed equivalents.
 * 
 * @remarks
 * Returns `undefined` if the CSS module has no locals defined.
 */
declare const locals: CSSModuleLocals | undefined;
export default locals;

/**
 * Re-export all named exports from the source CSS module.
 * Excludes the 'default' export to avoid conflicts.
 */
export * from './source-css-module';