/**
 * CSS Module declarations
 * 
 * This module provides CSS class name mappings and style injection functionality.
 * Typically generated from a CSS/SCSS file processed by css-loader with modules enabled.
 */

/**
 * CSS class name mappings exported by this module
 * Maps local class names to their hashed/scoped equivalents
 */
export interface CSSModuleClasses {
  [className: string]: string;
}

/**
 * Style injection configuration options
 */
export interface StyleInjectionOptions {
  /** Transform function applied to style tags before insertion */
  styleTagTransform?: () => void;
  /** Function to set attributes on style elements */
  setAttributes?: () => void;
  /** DOM insertion strategy */
  insert?: (target: string) => void;
  /** DOM manipulation API */
  domAPI?: () => void;
  /** Function to create and insert style elements */
  insertStyleElement?: () => void;
}

/**
 * CSS Module with locals (class name mappings)
 */
export interface CSSModuleWithLocals {
  /** Local class name mappings */
  locals?: CSSModuleClasses;
  [key: string]: unknown;
}

/**
 * Default export: CSS class name mappings
 * Returns the local class names object if available, otherwise undefined
 */
declare const cssModule: CSSModuleClasses | undefined;

export default cssModule;

/**
 * Re-exported named exports from the underlying CSS module
 * Includes any additional properties or methods exposed by the loader
 */
export * from './underlying-css-module';