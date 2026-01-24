/**
 * CSS Modules style loader configuration and exports
 * This module handles the injection and management of CSS styles in the application
 */

/**
 * Style loader API configuration object
 */
interface StyleLoaderAPI {
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
   * @param target - The DOM selector where styles should be inserted (e.g., "head")
   */
  insert: (target: string) => void;

  /**
   * DOM manipulation API for style injection
   */
  domAPI: () => void;

  /**
   * Function to create and insert style elements
   */
  insertStyleElement: () => void;
}

/**
 * CSS Module with local class name mappings
 */
interface CSSModule {
  /**
   * Map of local class names to their hashed/scoped equivalents
   * @example { button: "button_a1b2c3", container: "container_d4e5f6" }
   */
  locals?: Record<string, string>;
}

/**
 * Re-exported style loader utilities
 */
export * from 'style-loader-module';

/**
 * CSS Module locals (class name mappings)
 * Contains the mapping between local class names and their generated scoped names
 * Returns undefined if no local class names are defined
 */
declare const cssModuleLocals: Record<string, string> | undefined;

export default cssModuleLocals;