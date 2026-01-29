/**
 * CSS Module loader configuration and style injection utilities.
 * This module handles dynamic CSS loading and applies styles to the DOM.
 */

/**
 * Style loader configuration options
 */
interface StyleLoaderOptions {
  /** Transform function for style tags before insertion */
  styleTagTransform: () => void;
  /** Function to set attributes on style elements */
  setAttributes: () => void;
  /** Function to insert styles into a specific DOM location */
  insert: (target: string) => void;
  /** DOM API handler for style manipulation */
  domAPI: () => void;
  /** Function to create and insert style elements */
  insertStyleElement: () => void;
}

/**
 * CSS Module locals type - contains the exported class names from CSS modules
 */
type CSSModuleLocals = Record<string, string> | undefined;

/**
 * CSS Module exports - includes both the locals and any named exports
 */
interface CSSModuleExports {
  /** The CSS class name mappings exported by the module */
  locals?: CSSModuleLocals;
  /** Any additional named exports from the CSS module */
  [key: string]: unknown;
}

/**
 * Re-exported named bindings from the CSS module (excluding 'default')
 */
export * from './styles.module.css';

/**
 * Default export: CSS Module class name mappings.
 * Returns the locals object containing hashed class names, or undefined if no locals exist.
 */
declare const cssModuleLocals: CSSModuleLocals;
export default cssModuleLocals;