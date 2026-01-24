/**
 * CSS Module Loader Type Definition
 * Module ID: 467038
 * 
 * This module exports CSS styles for an autostyler component including:
 * - Button styles (primary and default variants)
 * - Modal overlay styles
 * - Form input and select styles
 * - Picture view component with loading/error masks
 */

/**
 * Webpack module definition function signature
 * @param exports - The module exports object
 * @param module - The module metadata object
 * @param require - The webpack require function for loading dependencies
 */
type WebpackModuleFunction = (
  exports: Record<string, any>,
  module: WebpackModule,
  require: WebpackRequire
) => void;

/**
 * Webpack module metadata
 */
interface WebpackModule {
  /** Unique module identifier */
  id: string | number;
  /** Module exports object */
  exports: any;
  /** Whether the module has been loaded */
  loaded?: boolean;
  /** Parent modules that depend on this module */
  parents?: Array<string | number>;
}

/**
 * Webpack require function for loading modules
 */
interface WebpackRequire {
  /** Load a module by ID */
  (moduleId: string | number): any;
  /** Cache of loaded modules */
  c?: Record<string, WebpackModule>;
  /** Module definition functions */
  m?: Record<string, WebpackModuleFunction>;
}

/**
 * CSS loader function that processes CSS content
 * @param sourceMap - Whether to generate source maps
 * @returns A function that pushes CSS content to the exports array
 */
type CSSLoaderFunction = (sourceMap: boolean) => {
  push: (entry: [string | number, string, string?]) => void;
};

/**
 * Module export structure for CSS modules
 * The module calls the CSS loader (module 986380) and pushes CSS content
 */
declare const moduleDefinition: WebpackModuleFunction;

export = moduleDefinition;