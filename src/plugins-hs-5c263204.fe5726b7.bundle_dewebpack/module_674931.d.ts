/**
 * Webpack CSS Module Loader Type Definition
 * @module FeedbackListRowStyles
 * @description Type definitions for a Webpack-bundled CSS module that exports feedback list row styles.
 * This module uses css-loader to process and inject CSS into the DOM.
 */

/**
 * CSS Loader API interface
 * @description Provides methods to manage CSS modules and their exports
 */
interface CSSLoaderAPI {
  /**
   * Pushes CSS content into the module's stylesheet collection
   * @param entry - A tuple containing module metadata and CSS content
   *   - entry[0]: Module identifier (string or number)
   *   - entry[1]: CSS content as a string
   *   - entry[2]: Optional media query or other metadata
   */
  push(entry: [string | number, string, string?]): void;
}

/**
 * Webpack module context
 * @description Standard Webpack module wrapper parameters
 */
interface WebpackModuleContext {
  /** Module exports object */
  exports: CSSLoaderAPI;
  
  /** Module metadata including unique identifier */
  id: string | number;
}

/**
 * Webpack require function type
 * @description Function to load other modules by their ID
 * @param moduleId - The unique identifier of the module to require
 * @returns The loaded module, typically a factory function or API object
 */
type WebpackRequire = (moduleId: number) => CSSLoaderAPI;

/**
 * Feedback List Row CSS Module Factory
 * @description Factory function that initializes and exports the feedback list row stylesheet.
 * This module contains comprehensive styles for:
 * - Feedback list row containers and items
 * - Reply indicators and notification dots
 * - Extended row animations and transitions
 * - Carousel navigation controls
 * - Modal dialog layouts
 * - Dark theme variants
 * 
 * @param module - Webpack module context containing exports and module ID
 * @param exports - Direct reference to module.exports (typically unused in this pattern)
 * @param require - Webpack's require function to load dependencies
 * 
 * @remarks
 * - Depends on module 986380 (css-loader base functionality)
 * - CSS is injected with sourcemap support disabled (first argument: false)
 * - Includes styles for Ant Design components (Carousel, Modal)
 * - Supports both light and dark themes via `.feedback-black` modifier
 * 
 * @example
 * // Webpack internally calls this as:
 * // moduleFactory(module, module.exports, __webpack_require__)
 */
type FeedbackListRowCSSModuleFactory = (
  module: WebpackModuleContext,
  exports: CSSLoaderAPI,
  require: WebpackRequire
) => void;

/**
 * CSS Module Content
 * @description The actual CSS string content exported by this module
 * @remarks
 * Key style features:
 * - `.feedback-list-row`: Main container with flexbox layout
 * - `.feedback-list-row-item`: Individual feedback items with ellipsis overflow
 * - `.feedback-list-row-show-reply`: Interactive reply button with notification dot
 * - `.feedback-list-extended-row`: Animated expandable section (0.3s ease-out)
 * - `.feedback-carousel-modal`: Modal dialog for image carousel (900px width)
 * - `.feedback-black`: Dark theme variant with white text and transparent backgrounds
 */
export type CSSContent = string;

/**
 * Module Dependencies
 * @description External modules required by this CSS module
 */
export interface ModuleDependencies {
  /** CSS Loader base module (ID: 986380) - provides the API for CSS injection */
  cssLoaderBase: 986380;
}

/**
 * Module Metadata
 * @description Identifying information for this Webpack module
 */
export interface ModuleMetadata {
  /** Original module ID assigned by Webpack */
  readonly moduleId: 674931;
  
  /** Module type indicator */
  readonly type: 'css-module';
  
  /** Whether source maps are enabled (false in this case) */
  readonly sourceMap: false;
}

export {};