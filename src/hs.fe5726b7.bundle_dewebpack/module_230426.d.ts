/**
 * CSS Module Loader Type Definition
 * 
 * This module exports CSS content as a string array for webpack's css-loader.
 * The module loads styles for icon view components with hover effects.
 * 
 * @module CSSModuleLoader
 */

/**
 * CSS module export function type
 * 
 * @param exports - The module exports object to attach the CSS content
 * @param module - The current module metadata object
 * @param require - The webpack require function for loading dependencies
 */
type CSSModuleExportFunction = (
  exports: CSSModuleExports,
  module: ModuleMetadata,
  require: WebpackRequire
) => void;

/**
 * CSS loader module exports interface
 */
interface CSSModuleExports {
  /**
   * Push CSS content into the style collection
   * 
   * @param content - Tuple containing module ID and CSS string
   */
  push(content: [string, string]): void;
}

/**
 * Module metadata containing identification information
 */
interface ModuleMetadata {
  /** Unique module identifier (e.g., "230426") */
  id: string;
}

/**
 * Webpack require function for loading dependencies
 * 
 * @param moduleId - The numeric or string ID of the module to load
 * @returns The loaded module's exports, typically a function or object
 */
type WebpackRequire = (moduleId: number | string) => CSSLoaderFunction;

/**
 * CSS loader function that processes CSS content
 * 
 * @param sourceMap - Whether to include source maps (false for production)
 * @returns CSS module exports object with push method
 */
type CSSLoaderFunction = (sourceMap: boolean) => CSSModuleExports;

/**
 * CSS content for hs-iconfont-view component
 * 
 * Styles include:
 * - `.hs-iconfont-view`: Clickable icon container with pointer cursor
 * - `.hover-icon-bg`: Centered icon background using table display
 * - `.anticon`: Ant Design icon with vertical centering
 */
declare const cssModuleExport: CSSModuleExportFunction;

export default cssModuleExport;