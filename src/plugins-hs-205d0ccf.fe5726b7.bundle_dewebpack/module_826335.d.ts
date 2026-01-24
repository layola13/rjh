/**
 * CSS Module Declaration
 * 
 * This module exports CSS styles for a full-screen loading overlay component.
 * Typically used with CSS-in-JS or CSS module loaders in webpack configurations.
 */

/**
 * CSS module export function type
 * @param useSourceMap - Whether to include source maps in the CSS output
 * @returns CSS loader instance with push method for adding style rules
 */
declare module 'module_826335' {
  /**
   * CSS Loader API interface
   */
  interface CSSLoader {
    /**
     * Pushes CSS content to the loader
     * @param content - Array containing module ID and CSS string
     */
    push(content: [string, string, string]): void;
  }

  /**
   * CSS Loader factory function
   * @param useSourceMap - Enable/disable source map generation
   * @returns Configured CSS loader instance
   */
  function createCSSLoader(useSourceMap: boolean): CSSLoader;

  /**
   * Module exports the CSS content for full-screen loading mask
   * 
   * CSS Classes exported:
   * - `.full-screen-loading-mask`: Fixed overlay covering entire viewport
   * - `.full-screen-loading-mask .full-screen-loading`: Centered loading spinner container
   */
  const cssModule: CSSLoader;
  
  export = cssModule;
}

/**
 * CSS Class Names exported by this module
 */
declare namespace FullScreenLoadingStyles {
  /**
   * Full-screen overlay mask styles
   * - Position: fixed, covering entire viewport (100% x 100%)
   * - Z-index: 2000
   * - Background: Semi-transparent black (rgba(0, 0, 0, 0.5))
   */
  export const fullScreenLoadingMask: string;

  /**
   * Centered loading indicator styles
   * - Position: Absolute, centered using transform
   * - Transform: translate(-50%, -50%) for perfect centering
   */
  export const fullScreenLoading: string;
}

export as namespace FullScreenLoadingStyles;
export = FullScreenLoadingStyles;