/**
 * CSS Module Type Definition
 * 
 * This module exports CSS styles for the property bar component's "no choice" view.
 * The styles define the layout and appearance of an empty state indicator.
 */

/**
 * Represents the structure of a CSS module loader function parameter.
 */
interface CSSModuleExports {
  /** Unique identifier for this CSS module */
  id: string | number;
}

/**
 * Represents a CSS loader instance that processes CSS content.
 */
interface CSSLoader {
  /**
   * Adds a CSS module to the compilation.
   * 
   * @param data - Array containing module metadata and CSS content
   *   - data[0]: Module ID
   *   - data[1]: CSS string content
   */
  push(data: [string | number, string]): void;
}

/**
 * Factory function type that creates a CSS loader instance.
 * 
 * @param sourceMap - Whether to generate source maps for the CSS
 * @returns A CSS loader instance
 */
type CSSLoaderFactory = (sourceMap: boolean) => CSSLoader;

/**
 * Module loader function signature for Webpack-style module systems.
 * 
 * @param exports - The exports object to populate
 * @param module - Module metadata including id
 * @param require - Function to require other modules by ID
 */
declare function cssModuleLoader(
  exports: CSSModuleExports,
  module: CSSModuleExports,
  require: (moduleId: number) => CSSLoaderFactory
): void;

/**
 * CSS content for the property bar "no choice" view component.
 * 
 * Defines styles for:
 * - `.propertybar-container .noChoiceView` - Main empty state container (centered, 120px height)
 * - `.propertybar-container .noChoiceView img` - Empty state icon (80x80px)
 * - `.propertybar-container .noChoiceView div` - Empty state text label (14px font)
 */
declare const cssContent: string;

export { cssModuleLoader as default, cssContent, CSSModuleExports, CSSLoader, CSSLoaderFactory };