/**
 * CSS Module type definitions
 * @module CSSModuleLoader
 */

/**
 * CSS Module class names mapping
 * Represents the exported CSS class names from a CSS/SCSS module
 */
export interface CSSModuleClasses {
  /** Dynamically indexed CSS class names */
  [className: string]: string;
}

/**
 * Style loader configuration options
 * Configuration for injecting styles into the DOM
 */
export interface StyleLoaderOptions {
  /** Transform function for style tag manipulation */
  styleTagTransform: () => void;
  
  /** Function to set attributes on style elements */
  setAttributes: () => void;
  
  /** Function to insert style elements into the DOM */
  insert: (target: string) => void;
  
  /** DOM API interface for style manipulation */
  domAPI: () => void;
  
  /** Function to create and insert style elements */
  insertStyleElement: () => void;
}

/**
 * CSS Module exports
 * Contains both the style injection logic and the class name mappings
 */
declare const cssModuleExports: CSSModuleClasses | undefined;

export default cssModuleExports;

/**
 * Re-exported members from the CSS module
 * All named exports from the original CSS module (excluding 'default')
 */
export * from './style-module';