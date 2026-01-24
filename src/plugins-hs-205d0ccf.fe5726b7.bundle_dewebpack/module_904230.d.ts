/**
 * CSS module export for slider component styles
 * @module SliderStyles
 */

/**
 * Webpack CSS loader module function signature
 * @param exports - The module exports object
 * @param require - The webpack require function for loading dependencies
 * @param module - The webpack module metadata object
 */
declare function webpackCssModule(
  exports: WebpackModuleExports,
  require: WebpackRequireFunction,
  module: WebpackModule
): void;

/**
 * Webpack module exports interface
 */
interface WebpackModuleExports {
  /** Module ID assigned by webpack */
  id: string | number;
  /** Module exports value */
  exports: CssModuleExports;
}

/**
 * CSS module exports from css-loader
 */
interface CssModuleExports {
  /**
   * Push CSS content to the stylesheet array
   * @param content - Array containing module ID and CSS string
   */
  push(content: [string | number, string]): void;
}

/**
 * Webpack require function for loading modules
 */
interface WebpackRequireFunction {
  /**
   * Load a module by its ID
   * @param moduleId - The numeric module identifier
   * @returns The css-loader API instance
   */
  (moduleId: number): CssLoaderApi;
}

/**
 * CSS loader API interface
 * @param sourceMap - Whether to include source maps
 * @returns CSS module exports object with push method
 */
interface CssLoaderApi {
  (sourceMap: boolean): CssModuleExports;
}

/**
 * Webpack module metadata
 */
interface WebpackModule {
  /** Unique module identifier */
  id: string | number;
  /** Module exports object */
  exports: CssModuleExports;
  /** Whether the module has been loaded */
  loaded?: boolean;
  /** Parent modules that required this module */
  parents?: Array<string | number>;
}

/**
 * Slider component CSS class names
 * Contains styles for:
 * - Main wrapper with relative positioning
 * - Slider content container with rounded borders
 * - Flexbox-based slider items layout
 * - Navigation arrows with hover effects
 * - Dot navigation indicators
 * - Light and dark theme variants
 */
declare const sliderStyles: string;

export default webpackCssModule;
export { sliderStyles };