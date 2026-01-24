/**
 * CSS Module exports type definition
 * Represents the local class name mappings from a CSS/SCSS module
 */

/**
 * CSS module class name mappings.
 * Maps local class names to their hashed/scoped equivalents.
 */
export interface CSSModuleLocals {
  [className: string]: string;
}

/**
 * Style injection configuration for CSS modules.
 * Defines how styles are inserted and managed in the DOM.
 */
export interface StyleLoaderOptions {
  /** Transforms and applies style tags to the DOM */
  styleTagTransform: () => void;
  
  /** Sets attributes on style elements */
  setAttributes: () => void;
  
  /** Inserts style elements into specified DOM location */
  insert: (target: string) => void;
  
  /** DOM manipulation API for style injection */
  domAPI: () => void;
  
  /** Creates and inserts style elements */
  insertStyleElement: () => void;
}

/**
 * CSS module content with optional locals.
 */
export interface CSSModule {
  /** Local class name mappings, if available */
  locals?: CSSModuleLocals;
  
  /** Additional module properties */
  [key: string]: unknown;
}

/**
 * Default export: CSS module locals or undefined.
 * Contains the mapping of local class names to their scoped versions.
 * Returns undefined if no local class names are defined.
 */
declare const cssModuleExports: CSSModuleLocals | undefined;

export default cssModuleExports;

/**
 * Re-exported members from the CSS module.
 * All named exports from the original module (excluding 'default').
 */
export * from './original-css-module';