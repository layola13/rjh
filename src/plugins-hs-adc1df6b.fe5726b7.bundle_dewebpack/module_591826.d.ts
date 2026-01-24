/**
 * CSS Module Type Definition
 * 
 * This module represents a CSS module loader configuration.
 * It exports CSS class name mappings and associated style injection utilities.
 */

/**
 * CSS class name mappings exported by the module.
 * Maps local class names to their hashed/scoped versions.
 */
export interface CSSModuleLocals {
  [className: string]: string;
}

/**
 * Style loader configuration options.
 * Defines how styles are injected and managed in the DOM.
 */
export interface StyleLoaderOptions {
  /** Transform function to process style tags before insertion */
  styleTagTransform: () => void;
  
  /** Function to set attributes on style elements */
  setAttributes: () => void;
  
  /** DOM insertion strategy - specifies where to inject style tags */
  insert: (target: string) => void;
  
  /** DOM manipulation API interface */
  domAPI: () => void;
  
  /** Factory function to create and insert style elements */
  insertStyleElement: () => void;
}

/**
 * The default export of the CSS module.
 * Contains the local class name mappings if available, otherwise undefined.
 */
declare const cssModuleExport: CSSModuleLocals | undefined;

export default cssModuleExport;

/**
 * Re-exported utilities from the underlying style loader module.
 * These may include additional helper functions for style management.
 */
export * from 'style-loader-module';