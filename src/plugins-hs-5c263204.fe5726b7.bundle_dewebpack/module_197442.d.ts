/**
 * CSS Module for FP Collection Search Result Container
 * 
 * This module exports CSS styles for a search result dropdown component
 * that displays neighborhood and community search results with hover effects.
 */

/**
 * Webpack CSS loader function signature
 * @param moduleExports - The module.exports object to attach the CSS
 * @param requireFn - The webpack require function for loading dependencies
 * @param moduleId - The unique module identifier
 */
declare module 'module_197442' {
  /**
   * CSS Module Loader Function
   * Loads and processes CSS content through webpack's css-loader
   */
  export default function (
    moduleExports: ModuleExports,
    requireFn: WebpackRequire,
    moduleId: string | number
  ): void;

  /**
   * Webpack module.exports interface
   */
  interface ModuleExports {
    /** Unique module identifier */
    id: string | number;
    /** Exported module content */
    exports: CSSModuleExports;
  }

  /**
   * CSS Module Exports Interface
   * Represents the result from webpack's css-loader
   */
  interface CSSModuleExports {
    /**
     * Push CSS content to the loader pipeline
     * @param cssModule - Array containing module ID and CSS content
     */
    push(cssModule: [id: string | number, cssContent: string]): void;
  }

  /**
   * Webpack require function interface
   * @param moduleId - Module identifier to require
   * @returns The required module (css-loader in this case)
   */
  interface WebpackRequire {
    (moduleId: number): (sourceMap: boolean) => CSSModuleExports;
  }

  /**
   * CSS Content for FP Collection Search Result Container
   * 
   * Styles include:
   * - Main container (#fpcollection-search-result-container)
   * - Visibility states (.show, .hide)
   * - Search result items (.search-result-item)
   * - Nested elements: city, neighborNameWrapper, communityName, totalCount
   * - Tooltip wrapper (.search-result-tooltip-wrapper)
   */
  export const CSS_CONTENT: string;

  /**
   * CSS Selectors exported by this module
   */
  export interface CSSSelectors {
    /** Main container ID */
    readonly containerId: 'fpcollection-search-result-container';
    /** Show state class */
    readonly showClass: 'show';
    /** Hide state class */
    readonly hideClass: 'hide';
    /** Search result item class */
    readonly searchResultItem: 'search-result-item';
    /** City label class */
    readonly city: 'city';
    /** Neighbor name wrapper class */
    readonly neighborNameWrapper: 'neighborNameWrapper';
    /** Neighbor name class */
    readonly neighborName: 'neighborName';
    /** Community name class */
    readonly communityName: 'communityName';
    /** Total count class */
    readonly totalCount: 'totalCount';
    /** Tooltip wrapper class */
    readonly tooltipWrapper: 'search-result-tooltip-wrapper';
  }

  /**
   * Container dimensions and positioning
   */
  export interface ContainerStyles {
    /** Container width in pixels */
    readonly width: 500;
    /** Top offset in pixels */
    readonly top: 63;
    /** Left offset in pixels */
    readonly left: 140;
    /** Z-index value */
    readonly zIndex: 1;
    /** Border radius in pixels */
    readonly borderRadius: 8;
  }

  /**
   * Color palette used in the module
   */
  export interface ColorPalette {
    /** White background */
    readonly white: '#FFFFFF';
    /** Border color */
    readonly border: '#E3E3E3';
    /** Hover background */
    readonly hoverBackground: '#F5F5F5';
    /** Primary text color */
    readonly primaryText: '#33353B';
    /** Secondary text color */
    readonly secondaryText: '#808080';
  }
}