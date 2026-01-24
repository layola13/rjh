/**
 * CSS module export for pin button styles
 * @module PinButtonStyles
 */

/**
 * Webpack CSS loader module function
 * @param exports - Module exports object
 * @param require - Webpack require function
 * @param module - Webpack module loader utility function
 */
declare function cssModule(
  exports: CSSModuleExports,
  require: WebpackRequire,
  module: CSSLoaderModule
): void;

/**
 * Webpack require function type
 */
interface WebpackRequire {
  (moduleId: number): unknown;
}

/**
 * CSS module exports interface
 */
interface CSSModuleExports {
  id: string | number;
  exports: CSSLoaderModule;
}

/**
 * CSS loader module with push method for adding styles
 */
interface CSSLoaderModule {
  /**
   * Push CSS content to the loader
   * @param content - Array containing module id and CSS string
   */
  push(content: [string | number, string, string?]): void;
}

/**
 * Pin button CSS class names
 */
export interface PinButtonStyles {
  /** Base pin button class */
  'hsw-pinbtn': string;
  /** Active state class */
  'active': string;
}

/**
 * CSS content for pin button component
 * Includes styles for:
 * - Base button container (.hsw-pinbtn)
 * - SVG icon sizing
 * - Selected/normal state toggle (.select, .normal)
 * - Active state styling (.active)
 */
export const cssContent: string;

export default cssModule;