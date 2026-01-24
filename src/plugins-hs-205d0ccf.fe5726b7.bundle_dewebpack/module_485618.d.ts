/**
 * CSS Module Loader Type Definitions
 * 
 * This module provides type definitions for a CSS module loader system,
 * typically used in webpack-based applications to handle CSS imports with
 * type safety and style injection capabilities.
 */

/**
 * CSS module class name mappings
 * Maps CSS class names to their hashed/scoped equivalents
 */
export interface CSSModuleLocals {
  [className: string]: string;
}

/**
 * Configuration options for style injection
 */
export interface StyleLoaderOptions {
  /**
   * Function to transform and inject style tags into the DOM
   */
  styleTagTransform: () => void;
  
  /**
   * Function to set attributes on style elements
   */
  setAttributes: () => void;
  
  /**
   * Function to insert style elements into a specific DOM location
   * @param target - The DOM location identifier (e.g., "head")
   */
  insert: (target: string) => void;
  
  /**
   * DOM API utilities for style manipulation
   */
  domAPI: () => void;
  
  /**
   * Function to create and insert style elements
   */
  insertStyleElement: () => void;
}

/**
 * CSS module content interface
 * Represents the structure of imported CSS modules
 */
export interface CSSModule {
  /**
   * Local class name mappings for the CSS module
   */
  locals?: CSSModuleLocals;
  
  /**
   * Additional module metadata and methods
   */
  [key: string]: unknown;
}

/**
 * Default export: CSS module locals or undefined
 * 
 * When a CSS module is imported, this provides the class name mappings
 * that can be used in component code. Returns undefined if no locals exist.
 * 
 * @example
 * import styles from './styles.module.css';
 * // styles = { button: 'styles_button_a1b2c3', container: 'styles_container_d4e5f6' }
 */
declare const cssModuleLocals: CSSModuleLocals | undefined;

export default cssModuleLocals;

/**
 * Re-exported types and utilities from the CSS module system
 * All named exports from the underlying CSS module are available here
 */
export * from './css-module-types';