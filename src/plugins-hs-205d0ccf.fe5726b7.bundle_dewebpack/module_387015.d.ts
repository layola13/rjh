/**
 * CSS Module exports and style injection configuration
 * This module handles CSS-in-JS style injection and exports CSS module class names
 */

/**
 * CSS Module class name mappings
 * Maps semantic class names to generated unique class identifiers
 */
declare const cssModuleLocals: Record<string, string> | undefined;

export default cssModuleLocals;

/**
 * Re-exported CSS module properties
 * All named exports from the original CSS module (excluding 'default')
 */
export * from './original-css-module';

/**
 * Style injection configuration object
 * Controls how CSS is injected into the DOM
 */
interface StyleInjectionOptions {
  /**
   * Transform function applied to style tags before insertion
   */
  styleTagTransform: () => void;

  /**
   * Sets custom attributes on injected style elements
   */
  setAttributes: () => void;

  /**
   * Inserts style elements into specified DOM location (bound to "head")
   */
  insert: (location: string) => void;

  /**
   * DOM manipulation API for style element operations
   */
  domAPI: () => void;

  /**
   * Factory function to create and insert style elements
   */
  insertStyleElement: () => void;
}