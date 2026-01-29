/**
 * CSS Module Declaration
 * 
 * This module exports CSS styles for a popup/guide component with the following structure:
 * - Main wrapper container with fixed width
 * - Image display area
 * - Title section with step numbering
 * - Description text
 * - Learn more button
 * - Bottom action buttons (skip all, next)
 */

/**
 * CSS Module Loader Function
 * 
 * Represents a Webpack CSS loader module that injects styles into the application.
 * 
 * @param exports - The module exports object to be populated
 * @param require - The require function for loading dependencies
 * @param moduleId - The unique identifier for this module
 */
declare function CSSModuleLoader(
  exports: { id: string; exports: CSSExports },
  require: RequireFunction,
  moduleId: string
): void;

/**
 * Webpack require function type
 */
interface RequireFunction {
  /**
   * Loads a module by its ID
   * @param moduleId - The module identifier
   * @returns The loaded module's exports
   */
  (moduleId: number): CSSLoaderAPI;
}

/**
 * CSS Loader API
 * 
 * Provides methods for managing CSS content in Webpack bundles
 */
interface CSSLoaderAPI {
  /**
   * Creates a new CSS loader instance
   * @param sourceMap - Whether to include source maps
   * @returns CSS loader with push method
   */
  (sourceMap: boolean): CSSLoader;
}

/**
 * CSS Loader instance with style injection capabilities
 */
interface CSSLoader {
  /**
   * Adds CSS content to the loader
   * @param entry - Array containing module ID and CSS string
   */
  push(entry: [string, string]): void;
}

/**
 * Module exports containing CSS content
 */
interface CSSExports {
  id: string;
  exports: CSSLoader;
}

/**
 * CSS Class Names exported by this module
 * 
 * Use these class names to style the popup guide component:
 * 
 * @example
 *