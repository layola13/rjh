/**
 * CSS Module type definitions
 * Represents a CSS module with local class name mappings
 */

/**
 * CSS Module Locals
 * Maps CSS class names to their hashed/scoped equivalents
 */
export interface CSSModuleLocals {
  readonly [className: string]: string;
}

/**
 * Style loader configuration options
 */
export interface StyleLoaderOptions {
  /** Transform function to inject style tags into DOM */
  styleTagTransform: () => void;
  
  /** Function to set attributes on style elements */
  setAttributes: () => void;
  
  /** Function to insert style elements into specified location */
  insert: (target: string) => void;
  
  /** DOM API utilities for style manipulation */
  domAPI: () => void;
  
  /** Function to create and insert style elements */
  insertStyleElement: () => void;
}

/**
 * CSS Module Export
 * The default export contains the local class name mappings if available
 */
declare const cssModuleLocals: CSSModuleLocals | undefined;

export default cssModuleLocals;

/**
 * Re-exported types and utilities from the original CSS module
 * All named exports from the CSS module are re-exported here
 */
export * from './original-css-module';