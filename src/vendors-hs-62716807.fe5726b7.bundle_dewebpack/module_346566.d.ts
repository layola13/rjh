/**
 * CSS Module Loader
 * 
 * This module handles the dynamic loading and injection of CSS styles into the DOM.
 * It exports the processed CSS module with optional local class name mappings.
 * 
 * @module CSSModuleLoader
 */

/**
 * Configuration options for style injection
 */
interface StyleLoaderOptions {
  /** Transform function to process style tags before injection */
  styleTagTransform: () => void;
  
  /** Function to set attributes on style elements */
  setAttributes: () => void;
  
  /** Function to insert style elements into the DOM (bound to 'head' element) */
  insert: (target: string) => void;
  
  /** DOM API implementation for style manipulation */
  domAPI: () => void;
  
  /** Function to create and insert style elements */
  insertStyleElement: () => void;
}

/**
 * CSS Module locals mapping
 * Maps exported class names to their scoped/hashed equivalents
 */
interface CSSModuleLocals {
  [className: string]: string;
}

/**
 * CSS Module export
 * Contains the style content and optional local class name mappings
 */
interface CSSModule {
  /** Local class name mappings (if CSS modules are enabled) */
  locals?: CSSModuleLocals;
}

/**
 * Default export: CSS module locals or undefined
 * 
 * When CSS modules are enabled, this contains the mapping of original class names
 * to their scoped versions. Otherwise, it's undefined.
 * 
 * @example
 *