/**
 * CSS Module Loader Type Definition
 * 
 * This module exports CSS styles for the grid viewer component.
 * Typically used with css-loader in webpack configurations.
 */

/**
 * Represents the exported CSS content from css-loader
 */
interface CSSExport {
  /** Unique identifier for the CSS module */
  id: string;
  /** CSS content as a string */
  toString(): string;
  /** CSS source map (optional) */
  map?: string;
  /** Array containing module information and CSS content */
  [index: number]: [string, string] | [string, string, string];
}

/**
 * CSS Loader function that processes CSS content
 * @param sourceMap - Whether to include source maps
 * @returns CSS export object with push method
 */
type CSSLoaderFunction = (sourceMap: boolean) => {
  /**
   * Adds CSS module content to the export
   * @param content - Tuple containing module ID and CSS string, optionally media query or source map
   */
  push(content: [string, string] | [string, string, string]): void;
};

/**
 * Module loader function signature
 * @param exports - The module exports object
 * @param module - The current module object
 * @param require - The require function to load dependencies
 */
type ModuleLoaderFunction = (
  exports: Record<string, unknown>,
  module: { exports: CSSExport; id: string },
  require: (id: number) => CSSLoaderFunction
) => void;

/**
 * Grid Viewer Component Styles
 * 
 * Contains CSS definitions for:
 * - `.grid-viewer-wrapper`: Main container with 100% height
 * - `.grid-no-images`: Empty state display (centered, 15% top margin)
 * - `.grid-no-images img`: Placeholder image (130x130px)
 * - `.grid-no-images p`: Description text (16px, semi-transparent white)
 * - `.grid-viewer-pagination-wrapper`: Fixed pagination bar at bottom (24px from bottom)
 */
declare const styles: CSSExport;

export default styles;