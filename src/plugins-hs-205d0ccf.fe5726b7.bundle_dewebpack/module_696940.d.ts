/**
 * CSS Module type definitions
 * Represents a webpack CSS module loader configuration and its exports
 */

/**
 * CSS Module class names mapping
 * Maps CSS class names to their hashed/scoped equivalents
 */
export interface CSSModuleClasses {
  readonly [className: string]: string;
}

/**
 * Style loader configuration options
 */
export interface StyleLoaderOptions {
  /** Function to transform and insert style tags into the DOM */
  styleTagTransform: () => void;
  
  /** Function to set attributes on style elements */
  setAttributes: () => void;
  
  /** Function to insert style elements into a specific DOM location */
  insert: (target: string) => void;
  
  /** DOM API methods for style manipulation */
  domAPI: () => void;
  
  /** Function to create and insert style elements */
  insertStyleElement: () => void;
}

/**
 * CSS Module exports
 * Contains the local class name mappings for the CSS module
 */
declare const cssModuleLocals: CSSModuleClasses | undefined;

/**
 * Default export of CSS module locals
 * Provides access to scoped CSS class names
 */
export default cssModuleLocals;

/**
 * Re-exported members from the CSS module
 * All named exports except 'default' from the original module
 */
export * from './css-module-source';