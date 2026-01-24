/**
 * CSS Module type definitions
 * @module CSSModuleDefinitions
 */

/**
 * CSS class names exported from the stylesheet module
 * Represents the locally scoped class names available for import
 */
export interface CSSModuleClasses {
  readonly [className: string]: string;
}

/**
 * Style loader configuration options
 * Defines how CSS modules are injected and managed in the DOM
 */
export interface StyleLoaderOptions {
  /** Transform function to process style tags before insertion */
  styleTagTransform: () => void;
  
  /** Function to set attributes on style elements */
  setAttributes: () => void;
  
  /** DOM insertion strategy for style elements */
  insert: (target: string) => void;
  
  /** DOM manipulation API for style management */
  domAPI: () => void;
  
  /** Function to create and insert style elements */
  insertStyleElement: () => void;
}

/**
 * Default export representing the CSS module's class mappings
 * Maps original class names to their hashed/scoped equivalents
 * Returns undefined if no local classes are defined
 */
declare const cssModuleLocals: CSSModuleClasses | undefined;

export default cssModuleLocals;

/**
 * Re-exports all named exports from the original CSS module
 * Allows direct import of specific class names or variables
 */
export * from './stylesheet';