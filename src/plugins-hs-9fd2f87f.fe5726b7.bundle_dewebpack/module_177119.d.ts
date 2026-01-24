/**
 * CSS Module loader configuration and exports
 * Handles style injection and CSS module loading through webpack
 */

/**
 * CSS Module loading options configuration
 */
interface StyleLoaderOptions {
  /**
   * Transform function for style tag manipulation
   * Applies transformations to the style element before insertion
   */
  styleTagTransform: () => void;

  /**
   * Function to set attributes on style elements
   * Configures attributes for the injected style tags
   */
  setAttributes: () => void;

  /**
   * Insertion function for style elements
   * @param target - The DOM location where styles should be inserted (e.g., "head")
   */
  insert: (target: string) => void;

  /**
   * DOM API handler for style manipulation
   * Provides interface for interacting with DOM style elements
   */
  domAPI: () => void;

  /**
   * Function to create and insert style elements
   * Handles the creation of <style> tags in the document
   */
  insertStyleElement: () => void;
}

/**
 * CSS Module locals type
 * Represents the exported class names from a CSS module
 */
type CSSModuleLocals = Record<string, string> | undefined;

/**
 * Default export - CSS Module class names mapping
 * Contains the local class names exported from the CSS module
 * Returns undefined if no locals are defined
 */
declare const cssModuleExport: CSSModuleLocals;

export default cssModuleExport;

/**
 * Re-exported named exports from the CSS loader module
 * Includes all named exports except 'default' from the original module
 */
export * from './css-loader-module';