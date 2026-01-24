/**
 * CSS module loader type definition
 * Module: module_958998
 * Original ID: 958998
 */

/**
 * Webpack CSS loader module function signature
 * @param exports - Module exports object
 * @param module - Module metadata object
 * @param require - Webpack require function for loading dependencies
 */
declare function cssModuleLoader(
  exports: CSSModuleExports,
  module: WebpackModule,
  require: WebpackRequire
): void;

/**
 * Webpack module metadata interface
 */
interface WebpackModule {
  /** Unique module identifier */
  id: string | number;
  /** Module exports object */
  exports: CSSModuleExports;
}

/**
 * CSS module exports interface
 */
interface CSSModuleExports {
  /**
   * Push CSS content to the style loader
   * @param entry - Array containing module ID and CSS content
   */
  push(entry: [string | number, string]): void;
}

/**
 * Webpack require function for resolving module dependencies
 */
interface WebpackRequire {
  /** Load a module by ID */
  (moduleId: number): unknown;
}

/**
 * CSS class names exported by this module
 */
interface PointerToolTipStyles {
  /** Base tooltip label styling with white background and border */
  'pointer-tool-tip-label': string;
  
  /** Utility class to display the tooltip */
  'show-tip': string;
  
  /** Animation class for fade-in effect (0.2s duration) */
  'pointer-tool-tip-animation': string;
}

/**
 * CSS content for pointer tooltip component
 * Includes:
 * - .pointer-tool-tip-label: Positioned tooltip with white background
 * - .show-tip: Display utility class
 * - .pointer-tool-tip-animation: Fade-in animation (0.2s)
 * - @keyframes mini-tip-animation: Opacity transition from 0 to 1
 */
declare const styles: PointerToolTipStyles;

export default styles;