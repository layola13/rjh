/**
 * CSS Module Export Type Definition
 * 
 * This module exports CSS styles for a round-select component with theming support.
 * Supports both light and dark (teaching-black) themes with custom styling for Ant Design Select.
 */

/**
 * CSS Module Loader Function Type
 * @param useSourceMap - Whether to include source maps in the CSS output
 * @returns CSS loader instance with push method for adding stylesheets
 */
type CSSModuleLoader = (useSourceMap: boolean) => {
  /**
   * Adds a CSS module to the stylesheet collection
   * @param module - Tuple containing module ID and CSS content
   */
  push(module: [id: string, css: string]): void;
};

/**
 * Webpack Module Exports Interface
 */
interface ModuleExports {
  /** Unique module identifier */
  id: string;
  /** Module exports object */
  exports: unknown;
}

/**
 * Webpack Module Definition
 * 
 * @param exports - The module exports object
 * @param module - The current module metadata
 * @param require - Webpack's require function for loading dependencies
 * 
 * @description
 * Exports CSS styles for a round-select wrapper component with the following features:
 * - Rounded border select dropdown (18px border-radius)
 * - Unmounted state with opacity transitions
 * - Icon positioning (prefix and suffix)
 * - Two theme variants:
 *   - `teaching-light`: Light theme with rgba(111, 129, 175, 0.1) background
 *   - `teaching-black`: Dark theme with rgba(255, 255, 255, 0.1) background
 * - Ant Design Select integration with custom styling overrides
 * - Focus state with #396efe border color
 * - Smooth opacity transitions (0.6s duration)
 */
declare function module(
  exports: ModuleExports,
  module: ModuleExports,
  require: (moduleId: number) => CSSModuleLoader
): void;

export default module;