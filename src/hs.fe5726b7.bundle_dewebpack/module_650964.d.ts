/**
 * CSS Module Style Loader Configuration
 * 
 * This module configures webpack's style-loader for injecting CSS modules into the DOM.
 * It sets up the transformation pipeline with necessary loaders and configurations.
 */

/**
 * Style loader options configuration
 * Defines how CSS will be injected and transformed in the application
 */
interface StyleLoaderOptions {
  /**
   * Function that transforms style tags before insertion
   * Handles style element manipulation and attribute setting
   */
  styleTagTransform: () => void;

  /**
   * Function that sets custom attributes on style elements
   * Used for identifying or marking injected styles
   */
  setAttributes: () => void;

  /**
   * Insertion strategy function
   * Determines where in the DOM the style element will be injected
   * @param target - The DOM location target (e.g., 'head', 'body')
   */
  insert: (target: string) => void;

  /**
   * DOM API interface for style manipulation
   * Provides methods for interacting with the document's style elements
   */
  domAPI: () => void;

  /**
   * Function that creates and inserts style elements
   * Handles the actual insertion of style tags into the document
   */
  insertStyleElement: () => void;
}

/**
 * CSS Module Locals
 * Represents the exported class names from a CSS module
 * Maps local class names to their hashed/scoped equivalents
 */
type CSSModuleLocals = Record<string, string> | undefined;

/**
 * CSS Module Export Structure
 * Contains both the module locals (class name mappings) and the style loader configuration
 */
interface CSSModuleExport {
  /**
   * Local class name mappings from the CSS module
   * Undefined if the CSS module has no local class definitions
   */
  locals?: CSSModuleLocals;
}

/**
 * Default export: CSS module locals
 * Contains the mapping of local class names to their scoped/hashed versions
 * Returns undefined if no locals are defined in the CSS module
 */
declare const cssModuleLocals: CSSModuleLocals;

export default cssModuleLocals;

/**
 * Re-exported members from the underlying CSS module loader (module 127677)
 * Excludes the 'default' export to avoid conflicts
 */
export * from 'css-module-loader';