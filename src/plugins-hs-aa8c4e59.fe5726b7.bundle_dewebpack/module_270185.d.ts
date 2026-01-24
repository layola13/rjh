/**
 * CSS Module type definitions
 * This module represents a CSS module loader with style injection functionality
 */

/**
 * CSS class names exported by the module
 * Maps CSS class names to their generated/hashed versions
 */
export interface CSSModuleClasses {
  readonly [className: string]: string;
}

/**
 * Style loader options for injecting styles into the DOM
 */
export interface StyleLoaderOptions {
  /**
   * Function to transform and insert style tags into the DOM
   */
  styleTagTransform: () => void;
  
  /**
   * Function to set attributes on style elements
   */
  setAttributes: () => void;
  
  /**
   * Function to insert style elements at a specific location
   * Bound to insert into the document head
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
 * CSS module locals/exports
 * Contains the class name mappings for this CSS module
 * Returns undefined if no local classes are defined
 */
declare const cssModuleExports: CSSModuleClasses | undefined;

export default cssModuleExports;

/**
 * Re-exports all named exports from the underlying CSS module
 * Allows direct import of specific class names
 */
export * from './css-module-source';