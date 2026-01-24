/**
 * CSS Module Loader Type Definitions
 * 
 * This module handles CSS module imports with style injection capabilities.
 * It processes CSS modules and provides type-safe access to locally scoped class names.
 */

import type { CSSModuleExports, StyleLoaderAPI, StyleLoaderOptions } from './style-loader-types';

/**
 * CSS Module class name mappings
 * Maps the original class names to their hashed/scoped equivalents
 */
export type CSSModuleLocals = Record<string, string> | undefined;

/**
 * Style loader configuration options
 */
interface StyleLoaderConfig {
  /** Transform function to apply to style tags before insertion */
  styleTagTransform: StyleLoaderAPI['styleTagTransform'];
  
  /** Function to set attributes on style elements */
  setAttributes: StyleLoaderAPI['setAttributes'];
  
  /** Function to insert style elements into the DOM */
  insert: StyleLoaderAPI['insert'];
  
  /** DOM manipulation API provider */
  domAPI: StyleLoaderAPI['domAPI'];
  
  /** Function to create and insert style elements */
  insertStyleElement: StyleLoaderAPI['insertStyleElement'];
}

/**
 * CSS Module exports interface
 * Contains both the style content and local class name mappings
 */
interface CSSModuleContent {
  /** Locally scoped class name mappings */
  locals?: Record<string, string>;
  
  /** Other exported properties from the CSS module */
  [key: string]: unknown;
}

/**
 * Default export: Locally scoped CSS class names
 * Returns undefined if no local class names are defined
 */
declare const cssModuleLocals: CSSModuleLocals;
export default cssModuleLocals;

/**
 * Re-export all named exports from the CSS module
 * (excluding the 'default' export which is handled separately)
 */
export * from './css-module-source';