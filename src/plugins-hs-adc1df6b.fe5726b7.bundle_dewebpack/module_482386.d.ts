/**
 * CSS module type definitions
 * Represents a CSS modules import with optional class name mappings
 */

/**
 * CSS module class name mappings
 * Maps CSS class names to their hashed/scoped equivalents
 */
export interface CSSModuleClasses {
  readonly [className: string]: string;
}

/**
 * Style loader configuration options
 * Configures how styles are injected and managed in the DOM
 */
export interface StyleLoaderOptions {
  /** Transform function for style tags before insertion */
  styleTagTransform: () => void;
  
  /** Function to set attributes on style elements */
  setAttributes: () => void;
  
  /** DOM insertion strategy function */
  insert: (target: string) => void;
  
  /** DOM manipulation API */
  domAPI: () => void;
  
  /** Function to create and insert style elements */
  insertStyleElement: () => void;
}

/**
 * Default export: CSS module class mappings
 * Contains the local class names defined in the associated CSS file
 * Returns undefined if no local classes are defined
 */
declare const cssModuleExport: CSSModuleClasses | undefined;

export default cssModuleExport;

/**
 * Re-exported members from the CSS module loader
 * Includes all named exports except 'default'
 */
export * from './css-module-loader';