/**
 * CSS module for React Radio component
 * Exports CSS styles for a custom radio button group with title, buttons, and active states
 */

/**
 * Webpack css-loader module factory function
 * @param exports - The module exports object
 * @param require - Webpack require function (unused in this module)
 * @param cssLoaderApi - CSS loader API factory function (module 986380)
 */
declare function moduleCssLoader(
  exports: ModuleExports,
  require: WebpackRequire,
  cssLoaderApi: CssLoaderApiFactory
): void;

/**
 * Module exports interface
 */
interface ModuleExports {
  /** Module identifier */
  id: string | number;
  /** Exports value - typically the css-loader result */
  exports: CssLoaderResult;
}

/**
 * Webpack require function
 */
interface WebpackRequire {
  (moduleId: string | number): unknown;
}

/**
 * CSS Loader API factory function
 * @param sourceMap - Whether to include source maps
 * @returns CSS loader instance
 */
interface CssLoaderApiFactory {
  (sourceMap: boolean): CssLoaderInstance;
}

/**
 * CSS Loader instance with push method for adding CSS rules
 */
interface CssLoaderInstance {
  /**
   * Add CSS rule to the loader
   * @param rule - Tuple containing [moduleId, cssContent, sourceMap?]
   */
  push(rule: [string | number, string, string?]): void;
  
  /** String representation of all CSS rules */
  toString(): string;
}

/**
 * CSS Loader result type
 */
type CssLoaderResult = CssLoaderInstance;

/**
 * CSS class definitions for React Radio component
 */
interface ReactRadioCssModule {
  /** Main container with flex layout */
  'react-radio': string;
  
  /** Title label (36px width, 12px font, gray color) */
  'radio-title': string;
  
  /** Button container (24px height, white background, rounded corners) */
  'react-radio-btn': string;
  
  /** Individual radio item (62px width, centered content) */
  'radio-item': string;
  
  /** Active/selected radio item (blue gradient background) */
  'active-item': string;
  
  /** Label text inside radio item (12px font, dark gray) */
  'inputlabel': string;
  
  /** Radio label container with tooltip */
  'radio-label': string;
  
  /** Tooltip text (12px font, dark color) */
  'label-tooltip': string;
  
  /** Hidden label state */
  'label-hidden': string;
  
  /** Info/help image button (14px width, positioned top) */
  'imageButton': string;
  
  /** Disabled state for entire radio group (no-drop cursor) */
  'disabled': string;
}

export default moduleCssLoader;
export type { ReactRadioCssModule, CssLoaderResult, CssLoaderInstance };