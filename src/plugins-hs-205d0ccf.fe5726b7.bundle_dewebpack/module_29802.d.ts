/**
 * CSS Module Definition
 * Provides type-safe access to CSS class names and module exports
 */

/**
 * CSS Module Locals
 * Contains the mapping of CSS class names to their generated unique identifiers
 */
export interface CSSModuleLocals {
  [className: string]: string;
}

/**
 * Style injection configuration options
 */
export interface StyleLoaderOptions {
  /** Function to transform and inject style tags into the DOM */
  styleTagTransform: () => void;
  
  /** Function to set attributes on style elements */
  setAttributes: () => void;
  
  /** Function to insert style elements into a specific DOM location */
  insert: (target: string) => void;
  
  /** DOM manipulation API for style injection */
  domAPI: () => void;
  
  /** Function to create and insert style elements */
  insertStyleElement: () => void;
}

/**
 * Default export: CSS module class name mappings
 * Returns an object containing the CSS class names as keys and their hashed values
 * Returns undefined if no locals are defined
 */
declare const cssModuleExport: CSSModuleLocals | undefined;

export default cssModuleExport;

/**
 * Re-exported utilities from the CSS loader module
 * These are typically internal Webpack loaders but made available for advanced use cases
 */
export * from 'css-loader-module';