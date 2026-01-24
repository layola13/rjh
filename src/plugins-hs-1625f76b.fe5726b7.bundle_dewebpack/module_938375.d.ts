/**
 * CSS Module Loader Type Definition
 * Module: module_938375
 * Original ID: 938375
 * 
 * This module exports CSS styles for a product thumbnail component using css-loader.
 */

/**
 * CSS Loader function type
 * @param sourceMap - Whether to generate source maps for the CSS
 * @returns CSS loader instance with push method
 */
type CSSLoaderFactory = (sourceMap: boolean) => CSSLoader;

/**
 * CSS Loader instance interface
 */
interface CSSLoader {
  /**
   * Pushes CSS content to the loader
   * @param entry - Tuple containing module ID and CSS content string
   */
  push(entry: [string, string]): void;
}

/**
 * Module interface representing the exports object
 */
interface ModuleExports {
  /** The CSS loader instance */
  exports: CSSLoader;
  /** The module identifier */
  id: string;
}

/**
 * Webpack module dependencies
 */
interface ModuleDependencies {
  /** CSS loader factory function (module 986380) */
  (moduleId: 986380): CSSLoaderFactory;
}

/**
 * Product Thumbnail CSS Module
 * 
 * Defines styles for a product thumbnail component including:
 * - Main container with shadow and rounded corners (444x565px)
 * - Header section with title and close button
 * - Content area with scrollable image display
 * - Bottom section with action button
 * 
 * @param exports - Module exports object
 * @param module - Module metadata (unused)
 * @param require - Webpack require function for loading dependencies
 */
declare function productThumbnailModule(
  exports: ModuleExports,
  module: unknown,
  require: ModuleDependencies
): void;

export default productThumbnailModule;

/**
 * CSS Class Names exported by this module
 */
export interface ProductThumbnailStyles {
  /** Main container class (444x565px, white background, shadowed) */
  'product-thumbnail': string;
  /** Header section class (60px height) */
  'product-thumbnail-head': string;
  /** Title text class (16px PingFangSC font) */
  'product-thumbnail-title': string;
  /** Close button class (12x12px, top-right positioned) */
  'product-thumbnail-close': string;
  /** Content area class (416x445px, dotted border, scrollable) */
  'product-thumbnail-content': string;
  /** Image class (responsive sizing) */
  'product-thumbnail-img': string;
  /** Bottom section class (60px height) */
  'product-thumbnail-bottom': string;
  /** Action button class (88x32px, blue background) */
  'product-thumbnail-buttom': string;
}