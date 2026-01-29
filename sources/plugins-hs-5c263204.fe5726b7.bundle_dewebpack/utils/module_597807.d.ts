/**
 * Webpack module loader function type definition
 * This module exports CSS styles for a feedback textarea edit component
 * 
 * @module module_597807
 * @description Defines styles for feedback textarea with character limit, editor states, and theme variants
 */

/**
 * Webpack module exports object
 */
interface WebpackModuleExports {
  /** Module identifier */
  id: string | number;
  /** Module exports value */
  exports: any;
}

/**
 * CSS loader push function that accepts module ID and CSS content array
 */
interface CSSLoaderPushFunction {
  /**
   * Push CSS module content
   * @param content - Array containing module ID and CSS string
   */
  (content: [string | number, string]): void;
}

/**
 * CSS loader instance with push method
 */
interface CSSLoader {
  /** Push method to add CSS content */
  push: CSSLoaderPushFunction;
}

/**
 * Webpack require function for loading modules
 */
interface WebpackRequire {
  /**
   * Load a module by ID
   * @param moduleId - The numeric or string identifier of the module
   * @returns The loaded module (CSS loader in this case)
   */
  (moduleId: number): (sourceMap: boolean) => CSSLoader;
}

/**
 * Webpack module factory function
 * 
 * @param moduleExports - The exports object for this module
 * @param moduleThis - The module context object (unused in this module)
 * @param webpackRequire - Webpack's require function to load dependencies
 * 
 * @description
 * This module contains CSS styles for a feedback textarea editor component with the following features:
 * - Character limit indicator with red highlight when exceeded
 * - Rich text editor integration (w-e-toolbar, w-e-text-container)
 * - Customizable size variants (large)
 * - Theme support (default and black theme)
 * - Responsive border states (hover, focus, active)
 * - Image rendering within the editor
 */
type WebpackModuleFactory = (
  moduleExports: WebpackModuleExports,
  moduleThis: any,
  webpackRequire: WebpackRequire
) => void;

/**
 * CSS content for feedback textarea edit component
 * 
 * @remarks
 * Includes styles for:
 * - `.textareedit-limit` - Character counter display
 * - `.textareedit-limit-red` - Red color for limit exceeded state
 * - `.feedback-textarea-edit` - Main editor container
 * - `.w-e-toolbar` - Hidden toolbar
 * - `.w-e-text-container` - Text container with custom borders
 * - `.w-e-text` - Editable text area with rounded borders and hover states
 * - `.feedback-textarea-edit-large` - Large size variant (180px height)
 * - `.feedback-black` - Dark theme variant with semi-transparent white text
 */
declare const cssContent: string;

export type { 
  WebpackModuleFactory, 
  WebpackModuleExports, 
  WebpackRequire, 
  CSSLoader, 
  CSSLoaderPushFunction 
};