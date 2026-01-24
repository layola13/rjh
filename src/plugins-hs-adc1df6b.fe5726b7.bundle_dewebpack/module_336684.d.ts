/**
 * CSS module loader export for property bar level 1 styles
 * 
 * This module exports CSS styles for a property bar component with multiple levels,
 * tabs support, floating items, and disabled states.
 */

/**
 * CSS module export function signature
 * 
 * @param exports - The module exports object to be populated
 * @param require - The require function for loading dependencies
 * @param moduleLoader - The CSS loader function from module 986380
 */
declare module "module_336684" {
  /**
   * CSS Module Loader Function
   * 
   * Loads and processes CSS content for the property bar component.
   * The loader returns an array with module metadata and CSS string.
   * 
   * @param exports - Module exports object
   * @param require - CommonJS require function
   * @param moduleLoader - CSS loader utility function
   * @returns void
   */
  export default function (
    exports: CSSModuleExports,
    require: RequireFunction,
    moduleLoader: CSSLoaderFunction
  ): void;

  /**
   * CSS Module Exports Interface
   * 
   * Standard webpack module.exports object for CSS modules
   */
  interface CSSModuleExports {
    /** Module identifier */
    id: string | number;
    /** Exports property for CSS content */
    exports?: unknown;
  }

  /**
   * CommonJS Require Function
   * 
   * @param moduleId - The numeric or string identifier of the module to require
   * @returns The required module's exports
   */
  type RequireFunction = (moduleId: number | string) => CSSLoader;

  /**
   * CSS Loader Interface
   * 
   * Represents the CSS loader utility that processes CSS content
   */
  interface CSSLoader {
    /**
     * Process CSS content and return loader result
     * 
     * @param sourceMap - Whether to include source maps (false = no source maps)
     * @returns CSS loader result with push method
     */
    (sourceMap: boolean): CSSLoaderResult;
  }

  /**
   * CSS Loader Function Type
   * 
   * Function returned by the CSS loader module (986380)
   */
  type CSSLoaderFunction = (sourceMap: boolean) => CSSLoaderResult;

  /**
   * CSS Loader Result Interface
   * 
   * Result object from CSS loader with push method for adding CSS content
   */
  interface CSSLoaderResult {
    /**
     * Push CSS content into the loader result
     * 
     * @param content - Tuple containing module ID and CSS string content
     */
    push(content: [string | number, string]): void;
  }

  /**
   * Property Bar CSS Classes
   * 
   * Exported CSS class names available for import
   */
  export interface PropertyBarStyles {
    /** Main container class for property bar level 1 */
    "property-bar-level1": string;
    /** Disabled state class */
    disable: string;
    /** Title area class */
    "property-bar-level1-title": string;
    /** Main content area class */
    "property-bar-level1-area": string;
    /** Modifier for area with tabs */
    "has-tabs": string;
    /** Modifier for area with 1 floating item */
    "has-float-item-1": string;
    /** Modifier for area with 2 floating items */
    "has-float-item-2": string;
    /** Modifier for area with 3 floating items */
    "has-float-item-3": string;
    /** Floating item container class */
    "property-bar-float-item": string;
    /** Button within floating item */
    "property-bar-button": string;
    /** Floating item with height for 1 item */
    "property-bar-float-item-1": string;
    /** Floating item with height for 2 items */
    "property-bar-float-item-2": string;
    /** Floating item with height for 3 items */
    "property-bar-float-item-3": string;
    /** Homestyler tabs small variant */
    "homestyler-tabs-small": string;
    /** Homestyler UI components class */
    "homestyler-ui-components": string;
  }
}