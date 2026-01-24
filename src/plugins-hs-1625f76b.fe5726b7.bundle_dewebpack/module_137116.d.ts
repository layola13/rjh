/**
 * CSS module for AIGC image search page loading component
 * Exports CSS styles as a string array for webpack css-loader
 */

/**
 * CSS module export function type
 * @param pushToExports - Function to push CSS content to exports array
 */
type CSSModuleExportFunction = (pushToExports: boolean) => CSSExportArray;

/**
 * CSS export array with push method
 * Contains module ID and CSS string content
 */
interface CSSExportArray {
  /**
   * Pushes CSS module data to the exports array
   * @param data - Tuple containing module ID and CSS string
   */
  push(data: [moduleId: string | number, cssContent: string]): void;
}

/**
 * Webpack module interface for CSS modules
 */
interface WebpackCSSModule {
  /**
   * Module ID assigned by webpack
   */
  id: string | number;
  
  /**
   * Module exports object
   */
  exports: CSSExportArray;
}

/**
 * Webpack require function for loading other modules
 * @param moduleId - The ID of the module to require
 * @returns The CSS module export function
 */
type WebpackRequire = (moduleId: number) => CSSModuleExportFunction;

/**
 * CSS Module Loader Function
 * @param module - Webpack module object containing id and exports
 * @param exports - Module exports object (unused in this module)
 * @param require - Webpack require function to load dependencies
 */
declare function loadCSSModule(
  module: WebpackCSSModule,
  exports: unknown,
  require: WebpackRequire
): void;

export default loadCSSModule;