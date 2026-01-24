/**
 * CSS module exports for Export 2D component
 * Provides styling definitions for 2D export overlay and controls
 */

/**
 * Webpack CSS loader module definition
 * @param exports - Module exports object
 * @param require - Module require function
 * @param moduleLoader - CSS loader function from webpack
 */
declare module 'module_283273' {
  /**
   * Initializes and exports CSS styles for the Export 2D component
   * 
   * @param exports - The module exports object to populate
   * @param require - Function to require other modules
   * @param cssLoader - CSS loader utility function (module 986380)
   * 
   * @remarks
   * This module defines styles for:
   * - `.export2d_mask` - Full-screen transparent overlay (z-index: 51)
   * - `#export2d` - Main container with Frutiger Next font family
   * - `#export2d .footer` - Bottom footer bar (50px height, hidden by default)
   * - `#export2d .closeBtn` - Close button (top-right, blue background)
   * - `#export2d .brand` - Left-aligned brand section with border
   * - `#export2d .title` - Title text container
   * - `#export2d .unit` - Right-aligned unit selector with border
   */
  export default function(
    exports: CSSModuleExports,
    require: RequireFunction,
    cssLoader: CSSLoaderFunction
  ): void;

  /**
   * CSS module exports interface
   */
  interface CSSModuleExports {
    /** Module identifier */
    id: number | string;
    /** Exported CSS content */
    exports: unknown;
  }

  /**
   * Module require function type
   */
  type RequireFunction = (moduleId: number) => CSSLoaderFunction;

  /**
   * CSS loader function that processes CSS content
   * @param sourceMap - Whether to include source maps
   * @returns CSS loader instance with push method
   */
  type CSSLoaderFunction = (sourceMap: boolean) => CSSLoader;

  /**
   * CSS loader instance
   */
  interface CSSLoader {
    /**
     * Pushes CSS content to the loader
     * @param content - Array containing module ID and CSS string
     */
    push(content: [number | string, string]): void;
  }

  /**
   * CSS class definitions exported by this module
   */
  export interface Export2DStyles {
    /** Full-screen transparent overlay mask (z-index: 51) */
    export2d_mask: string;
    /** Main export2d container ID selector */
    export2d: string;
    /** Footer bar (hidden by default, z-index: 52, 50px height) */
    footer: string;
    /** Close button (top-right, blue background #297bb7) */
    closeBtn: string;
    /** Brand logo container (left-aligned with right border) */
    brand: string;
    /** Title text container (left-aligned, 15px padding) */
    title: string;
    /** Unit selector (right-aligned with left border) */
    unit: string;
  }
}