/**
 * CSS Module: Grid Viewer Card Styles
 * 
 * This module exports CSS styles for a grid viewer card component with hover effects,
 * checkboxes, and view-more buttons.
 * 
 * @module GridViewerCardStyles
 */

/**
 * Module export function signature for CSS loader integration.
 * 
 * @param exports - The module exports object that will contain the CSS content
 * @param require - The require function for loading dependencies (CSS loader utility)
 * @param module - The module metadata object containing the module ID
 * 
 * @remarks
 * This function is typically called by webpack's module system to inject CSS content
 * into the build. The CSS loader utility (module 986380) processes the styles and
 * returns a function that pushes the CSS rules into the exports array.
 * 
 * The styles include:
 * - `.grid-viewer-card:hover .card-checkbox` - Shows checkbox on card hover
 * - `.grid-viewer-card:hover .click-view-more` - Shows "view more" button on hover
 * - `.grid-viewer-card:hover .hover-mask` - Shows dark overlay mask on hover
 * - `.grid-viewer-card .card-checkbox` - Positions checkbox in top-right corner
 * - `.grid-viewer-card .checked` - Ensures checked state is always visible
 * - `.grid-viewer-card .click-view-more` - Styles the centered action button
 * - `.grid-viewer-card .hover-mask` - Styles the semi-transparent overlay
 */
declare function cssModuleLoader(
  exports: CSSModuleExports,
  require: RequireFunction,
  module: WebpackModule
): void;

/**
 * CSS Module exports object containing processed styles
 */
interface CSSModuleExports {
  /** Module ID reference */
  id: string | number;
  
  /** Array of CSS rules and metadata */
  exports: Array<[string | number, string]>;
}

/**
 * Webpack require function for loading dependencies
 */
interface RequireFunction {
  /**
   * Load a module by ID
   * @param moduleId - Numeric or string identifier for the webpack module
   * @returns The loaded module (in this case, CSS loader utility)
   */
  (moduleId: number | string): CSSLoaderFunction;
}

/**
 * CSS Loader utility function that processes CSS content
 */
interface CSSLoaderFunction {
  /**
   * Process CSS content with sourcemap configuration
   * @param enableSourceMap - Whether to generate source maps for the CSS
   * @returns Object with push method to add CSS rules
   */
  (enableSourceMap: boolean): CSSRuleCollector;
}

/**
 * Collector object for CSS rules
 */
interface CSSRuleCollector {
  /**
   * Add CSS rules to the collection
   * @param rule - Tuple of [moduleId, cssContent]
   */
  push(rule: [string | number, string]): void;
}

/**
 * Webpack module metadata
 */
interface WebpackModule {
  /** Unique identifier for this module */
  id: string | number;
  
  /** Module exports object */
  exports: CSSModuleExports;
}

export default cssModuleLoader;