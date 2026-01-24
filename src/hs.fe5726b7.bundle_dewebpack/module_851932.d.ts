/**
 * CSS Module Loader Type Definitions
 * 
 * This module provides type definitions for a CSS module with style injection capabilities.
 * It handles CSS-in-JS loading, style tag transformation, and DOM manipulation for styles.
 */

/**
 * Configuration for style loader operations
 */
interface StyleLoaderOptions {
  /** Transform function for style tag content */
  styleTagTransform: () => void;
  
  /** Function to set attributes on style elements */
  setAttributes: () => void;
  
  /** Function to insert style elements into the DOM */
  insert: (target: string) => void;
  
  /** DOM API interface for style manipulation */
  domAPI: () => void;
  
  /** Function to insert style element into DOM */
  insertStyleElement: () => void;
}

/**
 * CSS Module exports structure
 */
interface CSSModuleExports {
  /** Local class name mappings for CSS modules */
  locals?: Record<string, string>;
  
  [key: string]: unknown;
}

/**
 * Re-exported values from the CSS module
 * All named exports except 'default' are re-exported from the original module
 */
export * from './css-module';

/**
 * Default export representing CSS module class name mappings
 * Returns undefined if no local class names are defined
 */
declare const cssModuleLocals: Record<string, string> | undefined;

export default cssModuleLocals;