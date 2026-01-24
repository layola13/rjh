/**
 * CSS Module type definitions
 * Handles style injection and CSS module exports
 */

/**
 * CSS Module class names mapping
 * Maps local class names to their hashed/scoped equivalents
 */
export interface CSSModuleClasses {
  readonly [className: string]: string;
}

/**
 * Style loader options for managing CSS injection
 */
export interface StyleLoaderOptions {
  /** Transform function for style tag manipulation */
  styleTagTransform: () => void;
  /** Function to set attributes on style elements */
  setAttributes: () => void;
  /** DOM insertion strategy */
  insert: (target: string) => void;
  /** DOM API abstraction layer */
  domAPI: () => void;
  /** Factory for creating style elements */
  insertStyleElement: () => void;
}

/**
 * CSS Module exports
 * Contains the locally scoped class names for this module
 */
declare const cssModuleExports: CSSModuleClasses | undefined;

export default cssModuleExports;

/**
 * Re-exported utilities from the style loader
 * All named exports from the original CSS loader module
 */
export * from './style-loader-runtime';