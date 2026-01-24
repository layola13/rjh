/**
 * Webpack CSS loader module that exports CSS styles for AI result page category items
 * @module module_933275
 * @originalId 933275
 */

/**
 * Module exports function signature for Webpack CSS loader
 * @param exports - The module exports object
 * @param module - The module metadata object containing id and other properties
 * @param require - The Webpack require function for loading dependencies
 */
declare function cssLoaderModule(
  exports: ModuleExports,
  module: WebpackModule,
  require: WebpackRequire
): void;

export default cssLoaderModule;

/**
 * Module exports object
 */
interface ModuleExports {
  /** The actual exports that will be assigned */
  exports: CSSLoaderExport;
}

/**
 * Webpack module metadata
 */
interface WebpackModule {
  /** Unique module identifier */
  id: string | number;
  /** Module exports */
  exports: unknown;
}

/**
 * Webpack require function type
 */
interface WebpackRequire {
  /** 
   * Load a module by ID
   * @param moduleId - The ID of the module to load
   */
  (moduleId: number): CSSLoader;
}

/**
 * CSS loader instance that processes CSS content
 */
interface CSSLoader {
  /**
   * Add CSS content to the loader
   * @param useSoureMaps - Whether to include source maps
   * @returns CSS loader instance with push method
   */
  (useSourceMaps: boolean): CSSLoaderInstance;
}

/**
 * CSS loader instance with push method
 */
interface CSSLoaderInstance {
  /**
   * Push CSS content array to the loader
   * @param content - Array containing module ID and CSS string
   */
  push(content: [string | number, string]): void;
}

/**
 * CSS loader export type
 */
type CSSLoaderExport = CSSLoaderInstance;

/**
 * CSS styles for AI result page category grid layout
 * 
 * Styles include:
 * - Grid layout with 2 columns (50% each)
 * - Category items with 64px circular images
 * - Centered text labels
 * - Absolute positioned data badges with two variants (default dark, refill light)
 * - 20px horizontal margin, 30px bottom margin between items
 */
declare const CSS_CONTENT: string;