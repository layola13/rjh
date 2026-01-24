/**
 * CSS Module Loader Type Definition
 * 
 * This module exports CSS styles for the AI Modeler page component.
 * It uses a CSS loader (likely css-loader from webpack) to process and inject styles.
 * 
 * @module MyAIModelerPageStyles
 */

/**
 * CSS loader function type
 * Returns an array containing CSS content with source map support
 */
type CSSLoaderFunction = (useSourceMap: boolean) => CSSLoaderResult;

/**
 * Result object returned by CSS loader
 * Contains methods to manipulate and export CSS content
 */
interface CSSLoaderResult {
  /**
   * Pushes CSS content entry to the loader result
   * @param entry - Tuple containing module ID and CSS content string
   */
  push(entry: [string, string]): void;
}

/**
 * Webpack module exports object
 */
interface ModuleExports {
  id: string;
  exports: CSSLoaderResult;
}

/**
 * Webpack require function
 * @param moduleId - The ID of the module to require
 * @returns The CSS loader function
 */
type WebpackRequire = (moduleId: number) => CSSLoaderFunction;

/**
 * CSS Module Definition for My AI Modeler Page
 * 
 * Exports styles for:
 * - `.my-ai-modeler-page` - Main container with rounded corners
 * - `.my-ai-modeler-page .hsc-hint-view` - Hint view positioning
 * - `.my-ai-modeler-page .my-ai-modeler-page-header` - Header layout and spacing
 * - `.my-ai-modeler-page .my-ai-modeler-page-header .left` - Left section with title
 * - `.my-ai-modeler-page .my-ai-modeler-page-header .right` - Right section with controls
 * - `.my-ai-modeler-page .model-list .is-generating` - Loading overlay during model generation
 * 
 * @param moduleExports - The webpack module exports object
 * @param _unused - Unused parameter (typically module metadata)
 * @param webpackRequire - Webpack's require function for loading dependencies
 */
declare function cssModuleLoader(
  moduleExports: ModuleExports,
  _unused: unknown,
  webpackRequire: WebpackRequire
): void;

export default cssModuleLoader;

/**
 * CSS Classes exported by this module:
 */
export interface MyAIModelerPageStyles {
  /** Main container class with 10px border radius */
  'my-ai-modeler-page': string;
  
  /** Hint view overlay positioned at 50% top */
  'hsc-hint-view': string;
  
  /** Header section with flex layout, 40px height */
  'my-ai-modeler-page-header': string;
  
  /** Left section of header containing title */
  left: string;
  
  /** Title text with 16px font, AlibabaPuHuiTi-Bold font family */
  title: string;
  
  /** Right section of header containing action buttons */
  right: string;
  
  /** Container for refresh button */
  'refresh-container': string;
  
  /** Refresh icon with 30x30px dimensions */
  'refresh-icon': string;
  
  /** Model list container */
  'model-list': string;
  
  /** Loading overlay with semi-transparent white background (rgba(255, 255, 255, 0.6)) */
  'is-generating': string;
}