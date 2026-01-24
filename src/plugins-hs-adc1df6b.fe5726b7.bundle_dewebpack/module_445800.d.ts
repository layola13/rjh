/**
 * CSS module loader type definition
 * This module exports CSS styles for a Level 2 property bar component
 * 
 * @module PropertyBarLevel2Styles
 * @description Defines the structure and types for a webpack CSS module loader export
 */

/**
 * CSS module export function signature
 * 
 * @param exports - The module exports object to be populated
 * @param require - The webpack require function for loading dependencies
 * @param moduleFactory - Factory function from module 986380 that processes CSS
 * @returns void
 * 
 * @remarks
 * This module loads and processes CSS styles for the property-bar-level2 component.
 * The styles include:
 * - Level 2 property bar container styles
 * - Title section with left/right alignment
 * - Interactive elements (delete button, dropdown, reset)
 * - Hover and active states
 * - Responsive layout with flexbox
 */
declare module 'module_445800' {
  /**
   * CSS content array item structure
   */
  interface CSSModuleItem {
    /** Module identifier */
    id: string | number;
    /** CSS content string */
    content: string;
    /** Source map (optional) */
    sourceMap?: string;
  }

  /**
   * CSS module loader result
   */
  interface CSSModuleExport {
    /**
     * Push CSS content to the module
     * @param item - Array containing module ID and CSS content
     */
    push(item: [string | number, string]): void;
  }

  /**
   * Webpack require function type
   */
  interface WebpackRequire {
    /**
     * Require a module by ID
     * @param moduleId - The module identifier
     * @returns CSS module export handler
     */
    (moduleId: number): (sourceMap: boolean) => CSSModuleExport;
  }

  /**
   * Module exports object
   */
  interface ModuleExports {
    /** The exported CSS module */
    exports: CSSModuleExport;
    /** Module identifier */
    id: string | number;
  }

  /**
   * CSS Module Loader Function
   * 
   * @param moduleExports - The module exports object
   * @param webpackRequire - Webpack's require function for dependencies
   * @param __unused - Unused parameter (typically webpack namespace object)
   */
  export default function(
    moduleExports: ModuleExports,
    webpackRequire: WebpackRequire,
    __unused?: unknown
  ): void;
}