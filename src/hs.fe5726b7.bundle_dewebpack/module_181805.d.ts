/**
 * CSS Module exports for Homestyler first tooltip overlay styles
 * @module FirstTooltipOverlayStyles
 */

/**
 * Webpack CSS loader module function type
 * @param e - Module exports object
 * @param t - Module metadata
 * @param n - Webpack require function
 */
declare function cssModuleLoader(
  e: { 
    /** Module ID identifier */
    id: string | number; 
    /** Module exports container */
    exports: unknown 
  },
  t: unknown,
  n: (moduleId: number) => CssLoaderFunction
): void;

/**
 * CSS loader function that processes CSS content
 */
interface CssLoaderFunction {
  /**
   * Creates a CSS loader with source map support
   * @param useSourceMap - Whether to include source maps
   * @returns CSS loader instance with push method
   */
  (useSourceMap: boolean): {
    /**
     * Adds CSS content to the loader
     * @param content - Array containing module ID and CSS string
     */
    push(content: [string | number, string]): void;
  };
}

/**
 * CSS classes for Homestyler first tooltip overlay component
 * 
 * Main styles:
 * - `.homestyler-ui-components.homestyler-popover-item.first-tooltip-overlay` - Base overlay container with blue background (#396EFE)
 * - `.tool-tip-area` - Flexbox container for tooltip content (height: 30px)
 * - `.tool-tip-title` - White text title with bold font (AlibabaPuHuiTi-Bold)
 * - `.homestyler-popover-caret` - Tooltip arrow indicator
 * 
 * Variants:
 * - `.teaching-light` - Light theme variant (blue background #396efe)
 * - `.teaching-black` - Dark theme variant (white background with dark text)
 * - `.homestyler-popover-bottomRight` - Right-aligned bottom positioned tooltip
 * 
 * Internationalization:
 * - `.global-en` - English locale adjustments (max-width: 300px, auto height)
 */
declare module 'module_181805' {
  const styles: string;
  export default styles;
}