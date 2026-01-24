/**
 * CSS module loader type definition
 * Module ID: 374940
 * 
 * This module exports CSS styles for a teaching interface component with theme support.
 * It uses webpack's css-loader to process CSS content and inject background images.
 */

/**
 * Webpack module factory function signature for CSS modules
 * 
 * @param exports - The module.exports object to populate
 * @param module - The current module metadata
 * @param require - Webpack's require function for loading dependencies
 */
declare function cssModuleFactory(
  exports: CSSModuleExports,
  module: WebpackModule,
  require: WebpackRequire
): void;

/**
 * Webpack module metadata
 */
interface WebpackModule {
  /** Unique module identifier */
  id: string | number;
  /** Module exports object */
  exports: CSSModuleExports;
}

/**
 * CSS module exports structure
 */
interface CSSModuleExports {
  /** 
   * Pushes CSS content into the style loader
   * @param content - Array containing module ID and CSS string
   */
  push(content: [string | number, string]): void;
}

/**
 * Webpack's require function
 */
interface WebpackRequire {
  /** 
   * Loads a module by ID
   * @param moduleId - The module identifier to load
   * @returns The loaded module's exports
   */
  (moduleId: number): unknown;
}

/**
 * CSS loader helper function (module 986380)
 * 
 * @param sourceMap - Whether to include source maps
 * @returns A CSS exports object with push method
 */
declare function cssLoader(sourceMap: boolean): CSSModuleExports;

/**
 * URL loader/file loader helper function (module 992716)
 * Processes asset imports and returns the final URL
 * 
 * @param assetPath - The imported asset module
 * @returns The processed asset URL string
 */
declare function urlLoader(assetPath: unknown): string;

/**
 * Light theme background image asset (module 495731)
 */
declare const lightThemeBackground: string;

/**
 * Dark theme background image asset (module 385359)
 */
declare const darkThemeBackground: string;

/**
 * Teaching component CSS classes
 */
interface TeachingStyles {
  /** Main container class with flex layout and full dimensions */
  'teaching-main': string;
  
  /** View wrapper positioned absolutely within main container */
  'view-wrapper': string;
  
  /** Hidden view wrapper (display: none) */
  'hidden-view-wrapper': string;
  
  /** Light theme variant with white background */
  'teaching-light': string;
  
  /** Dark theme variant with dark background */
  'teaching-black': string;
}

export type { TeachingStyles };
export default cssModuleFactory;