/**
 * CSS module loader type definition
 * 
 * This module exports CSS styles for property bar tab selection components.
 * The styles are loaded via a CSS loader (likely css-loader) and pushed to a stylesheet collection.
 * 
 * @module PropertyBarTabsSelectStyles
 */

/**
 * CSS module export function signature
 * 
 * @param exports - Module exports object to attach the CSS styles
 * @param require - Module require function for loading dependencies
 * @param cssLoader - CSS loader function that processes and returns CSS content
 */
declare function cssModuleLoader(
  exports: CSSModuleExports,
  require: ModuleRequire,
  cssLoader: CSSLoaderFunction
): void;

/**
 * CSS module exports interface
 */
interface CSSModuleExports {
  /** Module identifier */
  id: string | number;
  /** Exported module content */
  exports: CSSContent;
}

/**
 * Module require function type
 */
interface ModuleRequire {
  /** 
   * Loads a module by ID
   * @param moduleId - The numeric ID of the module to load
   */
  (moduleId: number): CSSLoaderFunction;
}

/**
 * CSS loader function that processes CSS content
 * 
 * @param sourceMap - Whether to generate source maps for the CSS
 * @returns CSS content handler with push method
 */
interface CSSLoaderFunction {
  (sourceMap: boolean): CSSContentHandler;
}

/**
 * CSS content handler that manages stylesheet entries
 */
interface CSSContentHandler {
  /**
   * Adds a CSS entry to the stylesheet collection
   * 
   * @param entry - Array containing module ID and CSS string
   *                entry[0]: Module identifier
   *                entry[1]: Raw CSS styles as string
   *                entry[2]: Optional media query or source map
   */
  push(entry: [string | number, string, string?]): void;
}

/**
 * CSS content container
 */
interface CSSContent {
  /** CSS stylesheet entries */
  styles: Array<[string | number, string]>;
}

/**
 * Style classes exported by this CSS module
 */
declare const styles: {
  /** Main container class for property bar tab selection */
  readonly 'property-bar-tabs-select': string;
  /** Individual tab element class within the tab selector */
  readonly 'homestyler-tabs-select-tab': string;
  /** Disabled state overlay class for the tab selector */
  readonly 'property-bar-tabs-select-disabled': string;
};

export default styles;