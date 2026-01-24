/**
 * CSS module definition for compass widget component
 * @module CompassWidgetStyles
 */

/**
 * Webpack CSS loader module function signature
 * @param exports - Module exports object
 * @param cssLoader - CSS loader factory function from webpack
 */
declare module 'module_672876' {
  /**
   * CSS content for the compass widget component
   * Defines styles for:
   * - .compasswidget: Main container with absolute positioning
   * - .compasspercentage: SVG percentage indicator overlay
   * - #compass: Main compass element with draggable area
   * - .compassdegree: Degree display label with angle indicator
   */
  const styles: string;
  export default styles;
}

/**
 * Webpack module loader function type
 * @param moduleExports - The module.exports object to populate
 * @param require - Webpack require function for loading dependencies
 * @param moduleId - Unique identifier for this webpack module
 */
type WebpackModuleLoader = (
  moduleExports: { exports: any; id: string | number },
  require: (moduleId: number) => any,
  moduleId: number
) => void;

/**
 * CSS loader result interface
 * Represents the output from webpack's css-loader
 */
interface CSSLoaderResult {
  /**
   * Adds CSS content to the compilation
   * @param entry - Array containing [moduleId, cssContent, sourceMap?]
   */
  push(entry: [string | number, string, string?]): void;
}

/**
 * CSS loader factory function type
 * @param sourceMap - Whether to include source maps
 * @returns CSS loader result object
 */
type CSSLoaderFactory = (sourceMap: boolean) => CSSLoaderResult;