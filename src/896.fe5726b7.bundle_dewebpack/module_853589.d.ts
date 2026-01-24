/**
 * CSS Module Loader Type Definitions
 * Provides type definitions for a webpack CSS module with style injection capabilities
 */

/**
 * CSS Module class names mapping
 * Maps CSS class names to their hashed/scoped equivalents
 */
export type CSSModuleClasses = Record<string, string>;

/**
 * Style injection options for CSS modules
 */
export interface StyleInjectionOptions {
  /**
   * Transforms the style tag before insertion
   * @param css - The CSS content to transform
   * @param styleElement - The style element being inserted
   */
  styleTagTransform: (css: string, styleElement: HTMLStyleElement) => void;

  /**
   * Sets attributes on the style element
   * @param element - The style element to configure
   */
  setAttributes: (element: HTMLStyleElement) => void;

  /**
   * Inserts the style element into the DOM
   * @param element - The style element to insert
   */
  insert: (element: HTMLStyleElement) => void;

  /**
   * DOM manipulation API
   */
  domAPI: {
    /**
     * Updates style content in the DOM
     * @param element - The style element to update
     * @param content - The new CSS content
     */
    update: (element: HTMLStyleElement, content: string) => void;
    
    /**
     * Removes style element from the DOM
     * @param element - The style element to remove
     */
    remove: (element: HTMLStyleElement) => void;
  };

  /**
   * Creates and returns a style element
   * @returns The created style element
   */
  insertStyleElement: () => HTMLStyleElement;
}

/**
 * CSS Module export structure
 */
export interface CSSModule {
  /**
   * Local class name mappings
   * Maps original class names to their scoped/hashed versions
   */
  locals?: CSSModuleClasses;

  /**
   * Raw CSS content
   */
  toString(): string;
}

/**
 * Default export: CSS module class names
 * Returns undefined if no local class mappings exist
 */
declare const cssModuleExport: CSSModuleClasses | undefined;

export default cssModuleExport;

/**
 * Re-exported bindings from the underlying CSS module
 * All named exports except 'default' are re-exported
 */
export * from './css-module-source';