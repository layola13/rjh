/**
 * CSS Module exports with HMR (Hot Module Replacement) support.
 * This module handles style injection and provides typed CSS class names.
 */

/**
 * Configuration options for CSS module loading and injection.
 */
interface CSSModuleOptions {
  /** Transform function to apply styles to DOM */
  styleTagTransform: () => void;
  /** Function to set attributes on style elements */
  setAttributes: () => void;
  /** Function to insert style elements into DOM */
  insert: (target: string) => void;
  /** DOM API utilities for style manipulation */
  domAPI: () => void;
  /** Function to create and insert style elements */
  insertStyleElement: () => void;
}

/**
 * CSS Module with optional locals (class name mappings).
 */
interface CSSModule {
  /** Map of CSS class names to their hashed equivalents */
  locals?: Record<string, string>;
  /** Additional CSS module metadata */
  [key: string]: unknown;
}

/**
 * Re-exported types and utilities from the CSS loader module.
 * Excludes the 'default' export to avoid conflicts.
 */
export * from 'css-loader-module';

/**
 * CSS class name mappings exported by this module.
 * Maps original class names to their transformed (hashed) versions.
 * 
 * @example
 *