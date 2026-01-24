/**
 * CSS module export for property bar slider input component
 * @module PropertyBarSliderInput
 */

/**
 * Webpack CSS loader module function type
 * @param exports - Module exports object
 * @param require - Webpack require function for loading dependencies
 * @param module - Webpack module object containing module metadata
 */
type WebpackCssLoaderModule = (
  exports: WebpackModuleExports,
  require: WebpackRequire,
  module: WebpackModule
) => void;

/**
 * Webpack module exports interface
 */
interface WebpackModuleExports {
  /** Module identifier */
  id: string | number;
  /** Module exports value */
  exports: unknown;
  /** Indicates if module has been loaded */
  loaded?: boolean;
}

/**
 * Webpack require function interface
 */
interface WebpackRequire {
  /** Load a module by ID */
  (moduleId: string | number): unknown;
}

/**
 * Webpack module metadata interface
 */
interface WebpackModule {
  /** Unique module identifier */
  id: string | number;
  /** Module exports object */
  exports: CssModuleExports;
  /** Module loading status */
  loaded?: boolean;
}

/**
 * CSS module exports interface returned by css-loader
 */
interface CssModuleExports {
  /**
   * Push CSS content to the exports array
   * @param content - Tuple containing module ID and CSS string
   */
  push: (content: [string | number, string]) => void;
  /** CSS string content */
  toString?: () => string;
}

/**
 * CSS loader factory function type
 * @param sourceMap - Whether to generate source maps for CSS
 * @returns CSS module exports object
 */
type CssLoaderFactory = (sourceMap: boolean) => CssModuleExports;

/**
 * Property bar slider input CSS styles
 * Contains styles for:
 * - .property-bar-slider-input: Main container with vertical padding
 * - .property-bar-slider-input-content: Flexbox layout for slider and input
 * - .property-bar-slider: Slider component with label and custom styling
 * - .property-bar-input: Fixed-width input field (64x24px)
 * - Ant Design slider customizations with hover effects
 */
declare const cssModule: WebpackCssLoaderModule;

export = cssModule;