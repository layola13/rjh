/**
 * CSS Module Loader Type Definition
 * 
 * This module exports CSS styles for a feedback uploader component.
 * The styles are processed through a CSS loader (module 986380).
 */

/**
 * Webpack module definition function
 * 
 * @param exports - The module exports object
 * @param module - The current module metadata
 * @param require - The webpack require function for loading dependencies
 */
declare module 'module_625187' {
  /**
   * CSS content array type
   * First element: module ID
   * Second element: CSS string content
   */
  type CSSModuleContent = [string, string];

  /**
   * CSS Loader result interface
   */
  interface CSSLoaderResult {
    /**
     * Adds CSS content to the result array
     * @param content - Tuple containing module ID and CSS string
     */
    push(content: CSSModuleContent): void;
    
    /**
     * Returns string representation of the CSS content
     */
    toString(): string;
  }

  /**
   * CSS Loader factory function type
   * @param sourceMap - Whether to include source maps
   * @returns CSS loader result object
   */
  type CSSLoaderFactory = (sourceMap: boolean) => CSSLoaderResult;

  /**
   * Webpack require function type
   * @param moduleId - The ID of the module to require
   * @returns The requested module (CSSLoaderFactory in this case)
   */
  type WebpackRequire = (moduleId: number) => CSSLoaderFactory;

  /**
   * Webpack module metadata interface
   */
  interface WebpackModule {
    /** Unique module identifier */
    id: string;
    /** Module exports object */
    exports: CSSLoaderResult;
  }

  /**
   * Module factory function signature
   * Initializes the CSS module by loading styles through the CSS loader
   * 
   * @param exports - Object to attach module exports
   * @param module - Current module metadata
   * @param require - Function to load dependency modules
   */
  export default function(
    exports: Record<string, unknown>,
    module: WebpackModule,
    require: WebpackRequire
  ): void;
}