/**
 * CSS Module type definitions
 * Represents a CSS module with typed class name exports
 */

/**
 * CSS Module Locals Interface
 * Defines the structure of CSS class names exported from the module
 */
export interface CSSModuleLocals {
  [className: string]: string;
}

/**
 * Style Loader Configuration
 * Configuration object for webpack style-loader
 */
export interface StyleLoaderConfig {
  /** Transform function to manipulate style tags before insertion */
  styleTagTransform: () => void;
  
  /** Function to set attributes on style elements */
  setAttributes: () => void;
  
  /** Function to insert style elements into the DOM */
  insert: (target: string) => void;
  
  /** DOM manipulation API */
  domAPI: () => void;
  
  /** Function to create and insert style elements */
  insertStyleElement: () => void;
}

/**
 * CSS Module Export
 * The default export containing CSS class name mappings
 * Returns undefined if no local class names are defined
 */
declare const cssModuleExport: CSSModuleLocals | undefined;

export default cssModuleExport;

/**
 * Re-exported members from the CSS module
 * All named exports from the original module are re-exported here
 */
export * from './style-module';