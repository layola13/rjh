/**
 * Webpack CSS module loader definition
 * This module exports CSS styles for single device login modal component
 */

/**
 * CSS Module Export Function
 * @param exports - The module exports object
 * @param require - The webpack require function
 * @param moduleId - The unique module identifier (821401)
 */
declare module 'module_821401' {
  /**
   * Webpack module factory function for CSS injection
   * @param exports - Module exports object to be populated
   * @param module - Module metadata object containing id and other properties
   * @param require - Webpack's require function for loading dependencies
   */
  export default function(
    exports: Record<string, unknown>,
    module: { id: string | number; exports: unknown },
    require: (moduleId: number) => CSSLoaderAPI
  ): void;

  /**
   * CSS Loader API interface
   * Provides methods for pushing CSS content into the style system
   */
  interface CSSLoaderAPI {
    /**
     * Creates a CSS module array with source map support
     * @param sourceMap - Whether to include source maps
     * @returns CSS module array with push method
     */
    (sourceMap: boolean): CSSModuleArray;
  }

  /**
   * CSS Module Array
   * Stores CSS rules and metadata for injection into the DOM
   */
  interface CSSModuleArray extends Array<string | string[]> {
    /**
     * Adds a CSS module entry
     * @param item - Tuple of [moduleId, cssContent, mediaQuery?, sourceMap?]
     */
    push(item: [string | number, string, string?, string?]): void;
  }

  /**
   * CSS Content for Single Device Login Modal
   * 
   * Styles include:
   * - `.singledevicelogin-modal-container .homestyler-modal-mask`: z-index 9009
   * - `.singledevicelogin-modal-container .homestyler-modal`: z-index 9010
   * 
   * These z-index values ensure the modal appears above other UI elements
   */
  export const cssContent: string;
}