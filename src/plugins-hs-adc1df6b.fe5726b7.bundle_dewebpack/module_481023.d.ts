/**
 * CSS Module: PageHeader Item Disabled Styles
 * 
 * This module exports CSS styles for disabled page header items.
 * The styles include cursor changes, opacity reduction, and pointer event blocking.
 * 
 * @module PageHeaderDisabledStyles
 */

/**
 * Type definition for a CSS module loader function
 * Typically used by webpack's css-loader
 */
type CSSLoaderFunction = (sourceMap: boolean) => CSSModuleExports;

/**
 * Interface representing the exports from a CSS module
 */
interface CSSModuleExports {
  /**
   * Pushes CSS content into the module system
   * @param content - Array containing module ID and CSS string
   */
  push(content: [string, string, string]): void;
}

/**
 * Webpack module wrapper signature
 * @param exports - The module's exports object
 * @param module - The module object containing id and exports
 * @param require - The webpack require function for loading dependencies
 */
declare function webpackModule(
  exports: Record<string, unknown>,
  module: { id: string; exports: CSSModuleExports },
  require: (moduleId: number) => CSSLoaderFunction
): void;

/**
 * CSS class name for disabled page header items
 * 
 * Applies the following styles:
 * - cursor: not-allowed
 * - opacity: 0.4
 */
declare const pageHeaderItemDisabled: string;

/**
 * CSS styles exported by this module
 * 
 * Classes:
 * - `.pageheader-item-disabled`: Styles the disabled state of page header items
 *   - Sets cursor to not-allowed
 *   - Reduces opacity to 0.4
 *   - Child div elements have pointer-events disabled
 */
export interface PageHeaderStyles {
  'pageheader-item-disabled': string;
}

export default PageHeaderStyles;