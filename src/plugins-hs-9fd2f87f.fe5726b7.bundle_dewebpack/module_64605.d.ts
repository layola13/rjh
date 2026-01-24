/**
 * CSS Module Loader Type Definitions
 * 
 * This module handles dynamic CSS injection and provides type-safe access to CSS module class names.
 * It represents a Webpack-style CSS module loader that injects styles into the DOM at runtime.
 */

/**
 * CSS Module class names mapping
 * Maps the class names defined in the source CSS/SCSS file to their hashed equivalents
 */
export type CSSModuleClasses = Record<string, string> | undefined;

/**
 * Style loader configuration options
 */
export interface StyleLoaderOptions {
  /**
   * Function to transform and inject style tags into the DOM
   */
  styleTagTransform: () => void;

  /**
   * Function to set attributes on style elements
   */
  setAttributes: () => void;

  /**
   * Function to insert style elements into a specific DOM location
   * Pre-bound to insert into the document head
   */
  insert: (target: string) => void;

  /**
   * DOM API utilities for style manipulation
   */
  domAPI: () => void;

  /**
   * Function to create and insert style elements
   */
  insertStyleElement: () => void;
}

/**
 * Re-exported members from the CSS module (excluding 'default')
 * Contains any named exports from the original stylesheet
 */
export * from './css-module-source';

/**
 * Default export: CSS module class names
 * 
 * @remarks
 * Returns a mapping of local class names to their generated/hashed class names.
 * Returns undefined if the CSS module has no local class names.
 * 
 * @example
 *