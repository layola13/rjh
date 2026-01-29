/**
 * CSS Module loader type definitions
 * Handles style injection and CSS modules with typed class names
 */

/**
 * CSS Module class names mapping
 * Maps CSS class names to their scoped/hashed equivalents
 */
export interface CSSModuleClasses {
  readonly [className: string]: string;
}

/**
 * Style loader options configuration
 * Defines how styles are injected and managed in the DOM
 */
export interface StyleLoaderOptions {
  /**
   * Transforms and injects style tags into the document
   * @param css - The CSS content to inject
   * @param styleElement - The style element to apply transformations to
   */
  styleTagTransform: (css: string, styleElement: HTMLStyleElement) => void;
  
  /**
   * Sets attributes on the style element
   * @param element - The style element to configure
   * @param options - Attribute key-value pairs to set
   */
  setAttributes: (element: HTMLElement, options: Record<string, string>) => void;
  
  /**
   * Inserts the style element into the specified DOM location
   * @param element - The style element to insert
   */
  insert: (element: HTMLStyleElement) => void;
  
  /**
   * DOM manipulation API for style operations
   * Provides methods for creating, updating, and removing style elements
   */
  domAPI: {
    update: (element: HTMLStyleElement) => void;
    remove: (element: HTMLStyleElement) => void;
  };
  
  /**
   * Creates and returns a style element for insertion
   * @param options - Configuration for the style element
   */
  insertStyleElement: (options: Record<string, unknown>) => HTMLStyleElement;
}

/**
 * CSS Module export structure
 * Contains both the locals (class name mappings) and style metadata
 */
export interface CSSModuleExport {
  /**
   * Scoped class name mappings for this CSS module
   * undefined if module has no exported classes
   */
  readonly locals?: CSSModuleClasses;
  
  /**
   * Raw CSS content (may be present in certain loader configurations)
   */
  readonly css?: string;
  
  /**
   * Module identifier for HMR and debugging
   */
  readonly id?: string;
}

/**
 * Default export: CSS Module class names or undefined
 * This is the primary export used when importing CSS modules
 * 
 * @example
 *