/**
 * CSS module type definitions for double-slider-input component
 * This module exports CSS styles as a string array for webpack css-loader
 */

/**
 * CSS module export function type
 * @param useSourceMap - Whether to include source maps in the CSS output
 * @returns CSS loader instance with push method for style injection
 */
type CSSModuleLoader = (useSourceMap: boolean) => {
  /**
   * Pushes CSS content to the style array
   * @param content - Tuple containing module ID and CSS string
   */
  push(content: [string | number, string]): void;
};

/**
 * Webpack module definition for CSS styles
 * @param exports - Module exports object
 * @param module - Webpack module metadata
 * @param require - Webpack require function for loading dependencies
 */
declare function module_665078(
  exports: { push(content: [string | number, string]): void },
  module: { id: string | number; exports: unknown },
  require: (moduleId: number) => CSSModuleLoader
): void;

/**
 * CSS class definitions exported by this module
 */
interface DoubleSliderInputStyles {
  /** Main container for double slider input component */
  'double-slider-input': string;
  /** Outer wrapper for the slider track */
  'double-slider-outer': string;
}

/**
 * CSS content string for double-slider-input component styles
 * 
 * Styles include:
 * - `.double-slider-input`: Container with 220px width, inline-flex layout, 34px height
 * - `.double-slider-input .double-slider-outer`: Right margin of 6px for spacing
 */
declare const cssContent: string;

export { DoubleSliderInputStyles, cssContent };
export default module_665078;