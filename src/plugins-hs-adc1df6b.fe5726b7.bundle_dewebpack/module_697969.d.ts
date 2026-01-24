/**
 * CSS Module Export
 * 
 * This module exports a CSS style definition for property bar text component.
 * Typically used in webpack-based applications with css-loader.
 */

/**
 * CSS Loader API function that processes CSS modules
 * @param sourceMap - Whether to include source maps
 * @returns CSS loader instance with push method
 */
declare function cssLoaderApi(sourceMap: boolean): CSSLoaderInstance;

/**
 * CSS Loader instance interface
 */
interface CSSLoaderInstance {
  /**
   * Pushes CSS module data into the loader
   * @param data - Tuple containing module ID, CSS content, and optional source map
   */
  push(data: [string, string, string?]): void;
}

/**
 * CSS style definitions for property bar text component
 */
interface PropertyBarTextStyles {
  /**
   * Main container style for property bar text
   * - Height: 28px
   * - Display: flex with center-aligned items
   * - Font: 12px, #1C1C1C color
   * - Text alignment: left
   */
  'property-bar-text': string;
}

/**
 * Module exports the CSS styles for property bar text component
 */
declare const styles: PropertyBarTextStyles;

export default styles;