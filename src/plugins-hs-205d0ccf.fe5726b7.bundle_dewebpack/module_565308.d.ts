/**
 * CSS Module type definitions
 * Original Module ID: 565308
 * 
 * This module represents a CSS-in-JS or CSS Module loader configuration
 * that exports styles and their class name mappings.
 */

/**
 * CSS Module class name mappings
 * Maps CSS class names to their hashed/scoped equivalents
 */
export interface CSSModuleClasses {
  [className: string]: string;
}

/**
 * Style loader configuration options
 */
export interface StyleLoaderOptions {
  /** Function to transform and inject style tags into the DOM */
  styleTagTransform: () => void;
  
  /** Function to set attributes on style elements */
  setAttributes: () => void;
  
  /** Function to insert style elements into a specified DOM location */
  insert: (target: string) => void;
  
  /** DOM manipulation API for style injection */
  domAPI: () => void;
  
  /** Function to create and insert style elements */
  insertStyleElement: () => void;
}

/**
 * Default export: CSS Module class name mappings
 * Returns an object mapping original class names to their scoped versions,
 * or undefined if no local class names are defined.
 */
declare const cssModuleLocals: CSSModuleClasses | undefined;

export default cssModuleLocals;

/**
 * Re-exported members from the underlying CSS module loader
 * All named exports from the source module (except 'default') are re-exported
 */
export * from './css-module-loader';