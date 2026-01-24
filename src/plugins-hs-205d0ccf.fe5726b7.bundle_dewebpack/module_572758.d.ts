/**
 * CSS Module loader type definitions
 * This module handles dynamic CSS injection and provides typed access to CSS class names
 */

/**
 * CSS class names mapping exported by the CSS module
 * Maps semantic class identifiers to their generated CSS class strings
 */
export interface CSSModuleClasses {
  [className: string]: string;
}

/**
 * Style loader configuration options
 * Defines how CSS should be injected and managed in the DOM
 */
export interface StyleLoaderOptions {
  /**
   * Function to transform and inject style tags into the document
   */
  styleTagTransform: () => void;
  
  /**
   * Function to set custom attributes on style elements
   */
  setAttributes: () => void;
  
  /**
   * Function to insert style elements into a specific DOM location
   * Bound to insert into the document head by default
   */
  insert: (target: string) => void;
  
  /**
   * DOM manipulation API for style element operations
   */
  domAPI: () => void;
  
  /**
   * Factory function to create style elements
   */
  insertStyleElement: () => void;
}

/**
 * Re-exported items from the underlying CSS module (excluding 'default')
 * Provides access to any named exports from the original stylesheet
 */
export * from './style-module';

/**
 * Default export: CSS Module class name mappings
 * Returns an object mapping logical class names to their hashed/scoped equivalents
 * Returns undefined if the module has no local class definitions
 * 
 * @example
 *