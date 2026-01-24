/**
 * CSS Module style loader configuration and exports.
 * This module handles the injection and management of CSS styles at runtime.
 */

/**
 * Configuration object for style loading operations.
 * Contains functions and settings for DOM manipulation and style injection.
 */
interface StyleLoaderConfig {
  /** Transform function applied to style tags before insertion */
  styleTagTransform: () => void;
  
  /** Function to set attributes on style elements */
  setAttributes: () => void;
  
  /** DOM insertion function bound to target element */
  insert: (element: HTMLElement) => void;
  
  /** DOM API utilities for style manipulation */
  domAPI: () => void;
  
  /** Function to create and insert style elements */
  insertStyleElement: (element: HTMLElement) => void;
}

/**
 * CSS Module locals object containing class name mappings.
 * Maps original class names to their hashed/scoped equivalents.
 */
interface CSSModuleLocals {
  [className: string]: string;
}

/**
 * Style module interface representing imported CSS module structure.
 */
interface StyleModule {
  /** Optional locals object with CSS class name mappings */
  locals?: CSSModuleLocals;
}

/**
 * Default export: CSS Module class name mappings.
 * Returns the locals object if available, otherwise undefined.
 */
declare const cssModuleExport: CSSModuleLocals | undefined;

export default cssModuleExport;

/**
 * Re-export all named exports from the style module (excluding 'default').
 * Allows direct import of any additional exports provided by the CSS loader.
 */
export * from './style-module';