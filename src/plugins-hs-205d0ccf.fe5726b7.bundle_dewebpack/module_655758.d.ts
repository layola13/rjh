/**
 * CSS module loader declaration
 * 
 * This module exports CSS styles for the inspiration room selection dialog component.
 * The styles are processed through a CSS loader and injected into the application.
 */

/**
 * CSS Module Export Function
 * 
 * @param exports - The module exports object that will contain the CSS content
 * @param module - The current module metadata object
 * @param cssLoader - The CSS loader function from webpack that processes CSS content
 * 
 * @remarks
 * This module defines styles for:
 * - `.inspiration-selectRoom2d-dialog .homestyler-modal-outer` - Modal container with fixed width
 * - `.inspiration-selectRoom2d-dialog .inspiration-selectRoom-layers` - Layer container spacing
 * - `.inspiration-selectRoom2d-dialog .inspiration-selectRoom2d-div` - Main 2D room selection container
 */
declare module 'module_655758' {
  /**
   * CSS content array containing style definitions
   * Format: [moduleId, cssContent, sourceMap?]
   */
  interface CSSModuleExport {
    /** Module identifier */
    id: string | number;
    /** Raw CSS content as string */
    toString(): string;
    /** CSS content entries */
    [index: number]: [string | number, string, string?];
  }

  /**
   * CSS Loader function that processes raw CSS content
   * 
   * @param sourceMap - Whether to include source maps (false in this case)
   * @returns CSS module export object with push method
   */
  interface CSSLoader {
    (sourceMap: boolean): {
      /**
       * Adds CSS content to the module exports
       * 
       * @param content - Array containing [moduleId, cssString]
       */
      push(content: [string | number, string]): void;
    };
  }

  const cssModuleExport: CSSModuleExport;
  export = cssModuleExport;
}

/**
 * CSS Content Details:
 * 
 * .inspiration-selectRoom2d-dialog .homestyler-modal-outer
 * - width: 820px (forced with !important)
 * 
 * .inspiration-selectRoom2d-dialog .inspiration-selectRoom-layers
 * - margin-bottom: 8px
 * 
 * .inspiration-selectRoom2d-dialog .inspiration-selectRoom2d-div
 * - width: 820px
 * - height: 432px
 * - position: relative
 */