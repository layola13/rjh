/**
 * CSS Module Loader Configuration
 * 
 * This module configures and applies CSS styles using style-loader infrastructure.
 * It handles the injection of CSS into the DOM and provides module locals (CSS class names).
 */

/**
 * Style loader configuration options for DOM manipulation and CSS injection
 */
interface StyleLoaderOptions {
  /**
   * Function to transform style tags before insertion into the DOM
   * Typically handles prefixing, minification, or other CSS transformations
   */
  styleTagTransform: () => void;

  /**
   * Function to set attributes on generated style elements
   * Used for adding nonce, data attributes, or other metadata
   */
  setAttributes: () => void;

  /**
   * Function to insert style elements into a specific DOM location
   * Bound to "head" element for standard CSS injection
   * @param target - The DOM element selector where styles should be injected
   */
  insert: (target: string) => void;

  /**
   * DOM API interface for style manipulation operations
   * Provides browser-compatible methods for style element handling
   */
  domAPI: () => void;

  /**
   * Factory function to create and insert style elements into the document
   * Manages the lifecycle of dynamically generated style tags
   */
  insertStyleElement: () => void;
}

/**
 * CSS Module exports with typed class name mappings
 * 
 * Represents the local class names exported by a CSS module.
 * Each key is a class name defined in the CSS file, and values are
 * the transformed (hashed/scoped) class names used in the DOM.
 * 
 * @example
 *