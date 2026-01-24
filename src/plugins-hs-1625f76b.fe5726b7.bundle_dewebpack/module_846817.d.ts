/**
 * CSS Module Exports Type Definition
 * 
 * This module exports CSS styles for a layout design page component.
 * The styles define a responsive layout with categories sidebar and product grid.
 */

/**
 * CSS Module Export Function Type
 * 
 * Represents a webpack css-loader module that exports CSS content as a string array.
 * 
 * @param e - Module exports object
 * @param t - Module dependencies (unused in this module)
 * @param n - Webpack require function to load the css-loader runtime
 */
declare module 'module_846817' {
  /**
   * CSS content for the layout design page
   * 
   * Includes styles for:
   * - `.layout-design-page` - Main container with 100% height
   * - `.layout-design-page .content` - Flex container for layout content
   * - `.layout-design-page .content .categories` - Sidebar for category navigation (62px width)
   * - `.layout-design-page .content .categories .cate` - Individual category item with hover effects
   * - `.layout-design-page .content .categories .cate.selected` - Selected category state
   * - `.layout-design-page .content .scroll-area` - Scrollable content area
   * - `.layout-design-page .content .scroll-area .products` - Product grid container
   * - `.layout-design-page .content .scroll-area .products .product` - Individual product item
   * - `.layout-design-page .content .scroll-area .products .product .image-container` - Product image wrapper (85x85px)
   * - `.layout-design-page .content .scroll-area .products .product .text` - Product label text
   */
  const styles: readonly [
    string, // Module ID
    string  // CSS content string
  ];

  export default styles;
}

/**
 * CSS Loader Runtime Interface
 * 
 * Defines the structure of the css-loader module loaded via webpack require.
 */
interface CSSLoaderRuntime {
  /**
   * Creates a CSS module instance
   * 
   * @param sourceMap - Whether to include source map in output
   * @returns CSS module instance with push method
   */
  (sourceMap: boolean): {
    /**
     * Adds CSS content to the module
     * 
     * @param entry - Tuple containing module ID and CSS content string
     */
    push(entry: [string, string]): void;
  };
}

/**
 * Module Exports Interface
 * 
 * Represents the webpack module exports object structure.
 */
interface ModuleExports {
  /** Module ID */
  id: string;
  
  /** Exported CSS loader instance */
  exports: ReturnType<CSSLoaderRuntime>;
}

/**
 * Webpack Require Function Type
 * 
 * @param moduleId - The numeric ID of the module to require
 * @returns The required module (css-loader runtime in this case)
 */
type WebpackRequire = (moduleId: number) => CSSLoaderRuntime;

/**
 * Module Factory Function Type
 * 
 * Standard webpack module wrapper function signature.
 * 
 * @param moduleExports - The module.exports object to populate
 * @param moduleObject - The full module object (unused in this module)
 * @param webpackRequire - Function to load other webpack modules
 */
type ModuleFactory = (
  moduleExports: ModuleExports,
  moduleObject: unknown,
  webpackRequire: WebpackRequire
) => void;