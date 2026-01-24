/**
 * CSS Module type definitions
 * Represents a stylesheet module with local class name mappings
 */

/**
 * Local class name mappings exported by the CSS module
 * Maps CSS class names to their hashed/scoped equivalents
 */
export type CSSModuleClasses = Record<string, string> | undefined;

/**
 * Style loader configuration options
 */
export interface StyleLoaderOptions {
  /** Function to transform and inject style tags into the DOM */
  styleTagTransform: () => void;
  
  /** Function to set attributes on style elements */
  setAttributes: () => void;
  
  /** Function to insert style elements into the specified DOM location */
  insert: (target: string) => void;
  
  /** DOM API utilities for style manipulation */
  domAPI: () => void;
  
  /** Function to create and insert style elements */
  insertStyleElement: () => void;
}

/**
 * CSS Module exports
 * Contains the local class name mappings if CSS Modules are enabled
 */
declare const cssModuleLocals: CSSModuleClasses;

export default cssModuleLocals;

/**
 * Re-exported members from the base CSS module
 * All named exports from the underlying stylesheet are available
 */
export * from './base-css-module';