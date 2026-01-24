/**
 * CSS Style Module Loader Configuration
 * This module handles CSS-in-JS style injection and transformation
 */

/**
 * Style transformation options configuration
 */
export interface StyleLoaderOptions {
  /**
   * Function to transform and inject style tags into the DOM
   * @param styles - The CSS content to be injected
   * @param options - Configuration options for style injection
   */
  styleTagTransform: (styles: string, options?: StyleInjectionOptions) => void;

  /**
   * Function to set attributes on injected style elements
   * @param element - The style element to modify
   * @param attributes - Key-value pairs of attributes to set
   */
  setAttributes: (element: HTMLStyleElement, attributes: Record<string, string>) => void;

  /**
   * Function to insert style elements into the specified DOM location
   * @param target - CSS selector or HTMLElement where styles should be inserted (e.g., 'head')
   * @param element - The style element to insert
   */
  insert: (target: string | HTMLElement, element: HTMLStyleElement) => void;

  /**
   * DOM manipulation API for style operations
   * Provides methods for creating, updating, and removing style elements
   */
  domAPI: StyleDOMAPI;

  /**
   * Function to create and insert style elements into the DOM
   * @param options - Configuration for the style element creation
   */
  insertStyleElement: (options: StyleElementOptions) => HTMLStyleElement;
}

/**
 * Style injection configuration options
 */
export interface StyleInjectionOptions {
  /**
   * Whether to use singleton pattern (single style tag for all styles)
   */
  singleton?: boolean;

  /**
   * Custom attributes to add to the style element
   */
  attributes?: Record<string, string>;

  /**
   * Insertion point in the DOM
   */
  insert?: string | HTMLElement;
}

/**
 * DOM API for style manipulation
 */
export interface StyleDOMAPI {
  /**
   * Update existing style content
   * @param element - The style element to update
   * @param content - New CSS content
   */
  update(element: HTMLStyleElement, content: string): void;

  /**
   * Remove style element from DOM
   * @param element - The style element to remove
   */
  remove(element: HTMLStyleElement): void;
}

/**
 * Configuration for creating style elements
 */
export interface StyleElementOptions {
  /**
   * CSS content to inject
   */
  css: string;

  /**
   * Custom attributes for the style element
   */
  attributes?: Record<string, string>;
}

/**
 * CSS Module export type
 * Contains class name mappings from the CSS module
 */
export interface CSSModuleLocals {
  /**
   * Mapping of CSS class names to their hashed/scoped equivalents
   * Key: original class name
   * Value: transformed class name (e.g., with hash suffix)
   */
  [className: string]: string;
}

/**
 * CSS Module structure returned by the style loader
 */
export interface CSSModule {
  /**
   * The actual CSS content as a string
   */
  toString(): string;

  /**
   * Local class name mappings
   * Returns undefined if no locals are exported from the CSS module
   */
  locals?: CSSModuleLocals;

  /**
   * Module identifier
   */
  id?: string;
}

/**
 * Main module export
 * Represents the default export from a CSS module loader
 * Returns the locals object containing class name mappings, or undefined if no locals exist
 */
declare const cssModuleExport: CSSModuleLocals | undefined;

export default cssModuleExport;

/**
 * Re-exported members from the CSS module
 * All named exports from the source CSS module are available here
 */
export * from './css-module-source';