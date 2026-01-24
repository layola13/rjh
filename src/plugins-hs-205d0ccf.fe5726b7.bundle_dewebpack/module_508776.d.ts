/**
 * CSS Module type definitions
 * Represents a webpack CSS module with style injection capabilities
 */

/**
 * CSS module exports interface
 * Contains the CSS class name mappings for type-safe usage
 */
export interface CSSModuleLocals {
  [className: string]: string;
}

/**
 * Style loader options configuration
 */
export interface StyleLoaderOptions {
  /** Transform function to modify style tags before insertion */
  styleTagTransform?: () => void;
  /** Function to set attributes on style elements */
  setAttributes?: () => void;
  /** Function to insert style elements into the DOM */
  insert?: (target: string) => void;
  /** DOM API utilities for style manipulation */
  domAPI?: () => void;
  /** Function to create and insert style elements */
  insertStyleElement?: () => void;
}

/**
 * CSS module default export
 * Provides the class name mappings if available, otherwise undefined
 */
declare const cssModuleLocals: CSSModuleLocals | undefined;

export default cssModuleLocals;

/**
 * Re-exported members from the CSS module
 * All named exports from the original module are available here
 */
export * from './css-module-source';