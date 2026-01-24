/**
 * CSS Module Loader Type Definitions
 * 
 * This module exports a function that processes CSS content and returns an array
 * containing the module ID and CSS string. Typically used by webpack css-loader.
 */

/**
 * CSS loader function type that processes CSS modules
 * 
 * @param sourceMap - Whether to generate source maps for the CSS
 * @returns A CSS loader instance with a push method
 */
type CSSLoaderFunction = (sourceMap: boolean) => CSSLoader;

/**
 * CSS Loader instance that collects CSS modules
 */
interface CSSLoader {
  /**
   * Adds a CSS module to the loader
   * 
   * @param entry - Tuple containing module ID and CSS content
   *   - entry[0]: Module identifier (string or number)
   *   - entry[1]: CSS content as string
   */
  push(entry: [moduleId: string | number, css: string]): void;
}

/**
 * Webpack module export function for CSS content
 * 
 * @param exports - The module.exports object to populate
 * @param module - The current module object containing metadata
 * @param require - Webpack's require function to load dependencies
 */
declare function cssModuleExport(
  exports: { exports: CSSLoader },
  module: { id: string | number },
  require: (moduleId: number) => CSSLoaderFunction
): void;

/**
 * CSS Module: teaching-modal styles
 * 
 * Contains styles for a draggable teaching modal component with light/dark themes:
 * - .teaching-modal: Absolute positioned modal container
 * - .drag-title: Draggable title bar with move cursor
 * - .zoom-title: Hidden zoom controls
 * - .teaching-light: Light theme variant (white background)
 * - .teaching-black: Dark theme variant (dark gray background with border)
 */
declare const cssContent: string;

export = cssModuleExport;