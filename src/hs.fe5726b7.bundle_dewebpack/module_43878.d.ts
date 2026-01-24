/**
 * Webpack CSS loader module export
 * Exports CSS styles for scroll tip component with theme support
 */

/**
 * Module function signature for webpack CSS loader
 * @param exports - Module exports object
 * @param require - Webpack require function for dependencies
 * @param module - Current module metadata
 */
declare function module_43878(
  exports: ModuleExports,
  require: WebpackRequire,
  module: Module
): void;

/**
 * Webpack require function type
 */
interface WebpackRequire {
  /**
   * Require a module by ID
   * @param moduleId - Numeric module identifier
   * @returns The required module's exports
   */
  (moduleId: number): unknown;
}

/**
 * Module metadata interface
 */
interface Module {
  /** Unique module identifier */
  id: string | number;
  /** Module exports object */
  exports: ModuleExports;
}

/**
 * CSS loader module exports interface
 */
interface ModuleExports {
  /**
   * Push CSS content to the styles array
   * @param content - Array containing module ID and CSS string
   */
  push(content: [string | number, string]): void;
}

/**
 * CSS styles for scroll tip component
 * 
 * Features:
 * - Positioned at bottom-right corner
 * - Semi-transparent background (#D5E5FF with 0.9 opacity)
 * - Animated arrow indicator
 * - Theme variant with gradient background
 * - High z-index (100) for overlay display
 */
declare const styles: string;

export = module_43878;