/**
 * CSS module loader function type definition
 * This module exports CSS styles for block options component
 */

/**
 * Webpack module loader function signature
 * @param exports - The module exports object
 * @param require - The webpack require function for loading dependencies
 * @param moduleId - The unique module identifier
 */
type WebpackModuleLoader = (
  exports: WebpackModuleExports,
  require: WebpackRequire,
  moduleId: string | number
) => void;

/**
 * Webpack module exports object
 */
interface WebpackModuleExports {
  /** Module ID */
  id: string | number;
  /** Exported content */
  exports?: unknown;
}

/**
 * Webpack require function for dynamic module loading
 */
interface WebpackRequire {
  /**
   * Load a module by ID
   * @param moduleId - The module identifier to load
   * @returns The loaded module's exports
   */
  (moduleId: number): CssModuleLoader;
}

/**
 * CSS module loader interface
 */
interface CssModuleLoader {
  /**
   * Push CSS content to the style loader
   * @param content - Array containing module metadata and CSS string
   */
  push(content: [string | number, string]): void;
}

/**
 * Block options CSS module
 * Contains styles for:
 * - Block options container with flex layout
 * - Individual block option items (83x83px cards)
 * - Radio button positioning
 * - Image zoom functionality
 * - Pagination controls
 * - Watermark override styles
 * - Homestyler UI component customizations
 */
declare const blockOptionsCssModule: WebpackModuleLoader;

export default blockOptionsCssModule;