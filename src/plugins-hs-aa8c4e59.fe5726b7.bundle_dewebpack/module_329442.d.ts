/**
 * CSS Module Type Definition
 * @module StylesheetModule
 * @description Type definitions for autostyler component stylesheet module
 */

/**
 * Webpack module factory function type
 * @param moduleExports - The exports object to populate
 * @param require - Webpack require function for loading dependencies
 * @param moduleLoader - Webpack module loader utility function
 */
type WebpackModuleFactory = (
  moduleExports: WebpackModule,
  require: WebpackRequire,
  moduleLoader: WebpackModuleLoader
) => void;

/**
 * Webpack module object
 */
interface WebpackModule {
  /** Unique module identifier */
  id: string | number;
  /** Module exports object */
  exports: unknown;
}

/**
 * Webpack require function
 */
interface WebpackRequire {
  (moduleId: string | number): unknown;
}

/**
 * Webpack module loader utility
 * @param sourceMap - Whether to include source maps
 * @returns CSS loader API instance
 */
interface WebpackModuleLoader {
  (sourceMap: boolean): CSSLoaderAPI;
}

/**
 * CSS Loader API for handling CSS content
 */
interface CSSLoaderAPI {
  /**
   * Push CSS content to the module
   * @param entry - Tuple containing module ID and CSS string content
   */
  push(entry: [string | number, string]): void;
  
  /** String representation of all CSS content */
  toString(): string;
  
  /** Iterator for CSS entries */
  [Symbol.iterator](): Iterator<[string | number, string]>;
}

/**
 * Autostyler component stylesheet module
 * 
 * This module contains CSS styles for:
 * - Button components (.btn, .btn-primary, .btn-default)
 * - Modal overlay (.modalCover)
 * - Form inputs and selects (.model-input, .model-select)
 * - Template editor panel (.editStylerTemplatePanel)
 * - Warning indicators (.autostylerWarningShow)
 * 
 * @remarks
 * Original Webpack module ID: 329442
 * Dependencies: CSS loader module (986380)
 */
declare const autostylerStylesheetModule: WebpackModuleFactory;

export default autostylerStylesheetModule;

/**
 * CSS class names exported by this module
 */
export interface AutostylerClassNames {
  /** Base autostyler container class */
  autostyler: string;
  /** Button base styles */
  btn: string;
  /** Primary button variant */
  'btn-primary': string;
  /** Default button variant */
  'btn-default': string;
  /** Modal backdrop overlay */
  modalCover: string;
  /** Warning state indicator (red border) */
  autostylerWarningShow: string;
  /** Model input field styles */
  'model-input': string;
  /** Model select dropdown styles */
  'model-select': string;
  /** Template editor panel container */
  editStylerTemplatePanel: string;
  /** Dropdown menu for model select */
  'model-select-dropdown': string;
}