/**
 * CSS module for grid viewer pagination component
 * Exports styles for pagination controls including navigation buttons, page items, and ellipsis indicators
 */

/**
 * Webpack CSS loader module function signature
 * @param e - Module exports object
 * @param t - Module metadata (unused)
 * @param n - Webpack require function for loading dependencies
 */
declare function cssModule(
  e: { 
    /** Module exports object */
    exports: unknown; 
    /** Module ID */
    id: string | number 
  },
  t: unknown,
  n: (moduleId: number) => CssLoader
): void;

/**
 * CSS loader interface returned by webpack require
 */
interface CssLoader {
  /**
   * Pushes CSS content to the loader
   * @param sourceMap - Whether to include source maps
   * @returns Function that accepts CSS module data
   */
  (sourceMap: boolean): {
    /**
     * Add CSS rules to the module
     * @param data - Tuple containing module ID and CSS content
     */
    push(data: [string | number, string]): void;
  };
}

/**
 * Grid viewer pagination styles module
 * Contains CSS rules for:
 * - Main pagination container (.grid-viewer-pagination)
 * - Navigation buttons (.prev-button, .next-button)
 * - Page number items (.page-item)
 * - Current page indicator (.page-item.current)
 * - Disabled state (.disable)
 * - Ellipsis separator (.ellipsis-icon)
 * - Pagination icons (.pagation-icon)
 */
declare const gridViewerPaginationStyles: typeof cssModule;

export = gridViewerPaginationStyles;