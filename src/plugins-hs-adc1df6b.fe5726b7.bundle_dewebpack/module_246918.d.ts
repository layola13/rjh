/**
 * Camera view popup styles module
 * @module CameraViewPopupStyles
 */

/**
 * Webpack CSS loader module function signature
 * @param exports - The module exports object
 * @param require - The webpack require function
 * @param module - The webpack module loader utility function
 */
declare function cssLoaderModule(
  exports: CSSModuleExports,
  require: WebpackRequire,
  moduleLoader: CSSLoaderFunction
): void;

/**
 * CSS module exports interface
 */
interface CSSModuleExports {
  /** Module identifier */
  id: string | number;
  /** Module exports, typically containing the push method for CSS content */
  exports: CSSExportsObject;
}

/**
 * CSS exports object with push method for style injection
 */
interface CSSExportsObject {
  /**
   * Push CSS content array to the style collection
   * @param content - Array containing module ID and CSS string
   */
  push(content: [string | number, string]): void;
}

/**
 * Webpack require function type
 */
type WebpackRequire = (moduleId: number) => CSSLoaderFunction;

/**
 * CSS loader function that processes CSS content
 * @param sourceMap - Whether to include source maps
 * @returns CSS loader instance with push method
 */
type CSSLoaderFunction = (sourceMap: boolean) => CSSExportsObject;

/**
 * Camera view popup CSS styles
 * Contains styles for fixed position popup with shadow and button states
 */
declare const cameraViewPopupStyles: string;

export default cssLoaderModule;
export { cameraViewPopupStyles, CSSModuleExports, CSSExportsObject, WebpackRequire, CSSLoaderFunction };