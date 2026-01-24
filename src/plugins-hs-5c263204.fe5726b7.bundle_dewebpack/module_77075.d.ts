/**
 * CSS module export for "nolistview" empty state component
 * This module exports CSS styles for a centered empty state display
 */

/**
 * Webpack CSS loader function signature
 * @param useSourceMap - Whether to include source maps in the CSS output
 * @returns A CSS loader instance with push method for adding style rules
 */
declare function cssLoader(useSourceMap: boolean): {
  /**
   * Adds a CSS rule to the stylesheet
   * @param rule - Tuple containing module ID, CSS content, and optional source map
   */
  push(rule: [string, string, string?]): void;
};

/**
 * Module exports CSS styles for an empty list view component
 * 
 * Styles include:
 * - #nolistview: Flexbox container centered vertically and horizontally
 *   - Height: calc(100% - 64px) to account for header/footer
 * - #nolistview img: 88px width placeholder image
 * - #nolistview div: 12px gray text with PingFang font
 * 
 * @param exports - Module exports object
 * @param require - Module require function (not used)
 * @param cssLoaderFactory - Factory function from module 986380 that creates CSS loader
 */
declare module "module_77075" {
  /**
   * CSS content for the nolistview component
   * Defines styles for empty state with centered image and text
   */
  const styles: string;
  export = styles;
}

/**
 * CSS Module Content:
 * 
 * #nolistview - Main container styles
 * - display: flex
 * - flex-direction: column
 * - justify-content: center
 * - align-items: center
 * - height: calc(100% - 64px)
 * 
 * #nolistview img - Image placeholder
 * - width: 88px
 * 
 * #nolistview div - Text label
 * - font-size: 12px
 * - line-height: 17px
 * - font-family: 'PingFang-SC-Regular'
 * - color: #8C8C96
 * - margin-top: 3px
 */