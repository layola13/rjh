/**
 * CSS Module Loader Type Definitions
 * 
 * This module handles CSS module imports with style injection.
 * It provides type-safe access to CSS class names exported from a CSS module.
 */

/**
 * CSS Module class name mapping.
 * Maps CSS class names to their scoped equivalents.
 */
export interface CSSModuleClasses {
  readonly [className: string]: string;
}

/**
 * Style loader options for injecting CSS into the DOM.
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
   * Function to insert style elements into a target container
   * @param target - The DOM element selector (e.g., "head")
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
 * CSS Module with metadata.
 * Contains both the style content and exported class names.
 */
export interface CSSModule {
  /**
   * Exported CSS class name mappings (if CSS modules are enabled)
   */
  readonly locals?: CSSModuleClasses;
  
  /**
   * Additional module metadata
   */
  [key: string]: unknown;
}

/**
 * Default export: CSS module class names.
 * Returns undefined if the module has no local class exports.
 */
declare const cssModuleExport: CSSModuleClasses | undefined;

export default cssModuleExport;

/**
 * Re-exported members from the CSS module.
 * All named exports from the original CSS module are available here.
 */
export * from './css-module-source';