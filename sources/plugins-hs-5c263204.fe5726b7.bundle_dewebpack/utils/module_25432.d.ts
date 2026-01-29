/**
 * CSS Module for Perfect Scrollbar component
 * Provides custom scrollbar styling and behavior
 */

/**
 * CSS loader module function type
 * @param api - CSS loader API instance (typically from css-loader)
 * @returns Array containing module ID and CSS content string
 */
type CSSModuleLoader = (api: CSSLoaderAPI) => [moduleId: string | number, cssContent: string];

/**
 * CSS Loader API interface
 * @param sourceMap - Whether to generate source maps for the CSS
 * @returns CSS module push function
 */
interface CSSLoaderAPI {
  (sourceMap: boolean): {
    push: (entry: [id: string | number, css: string]) => void;
  };
}

/**
 * Webpack module exports structure for CSS modules
 */
interface WebpackCSSModule {
  /** Module identifier */
  id: string | number;
  
  /** Module exports - will be populated by css-loader */
  exports: {
    push: (entry: [id: string | number, css: string]) => void;
  };
}

/**
 * Perfect Scrollbar CSS styles
 * 
 * This module contains all the styling for the Perfect Scrollbar library,
 * which provides custom scrollbars with smooth scrolling behavior.
 * 
 * Key features:
 * - Auto touch-action for mobile compatibility
 * - Hidden native scrollbars (replaced with custom ones)
 * - Separate X and Y axis scrollbar rails
 * - Smooth transitions and hover effects
 * - IE/Edge compatibility via -ms-overflow-style
 * 
 * @see https://github.com/mdbootstrap/perfect-scrollbar
 */
declare const cssContent: string;

/**
 * Module export function
 * @param module - Webpack module object
 * @param exports - Module exports object
 * @param require - Webpack require function
 */
export default function (
  module: WebpackCSSModule,
  exports: WebpackCSSModule['exports'],
  require: (moduleId: number) => CSSLoaderAPI
): void;

/**
 * Raw CSS content exported by this module
 * Contains Perfect Scrollbar styles including:
 * - Base container styles (.ps)
 * - Scrollbar rail styles (.ps__scrollbar-x-rail, .ps__scrollbar-y-rail)
 * - Scrollbar thumb styles (.ps__scrollbar-x, .ps__scrollbar-y)
 * - Active and hover state styles
 * - Browser-specific compatibility rules
 */
export { cssContent };