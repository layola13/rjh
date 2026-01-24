/**
 * CSS Module Definition
 * 
 * This module exports CSS styles for a whole-product component.
 * It defines styles for product cards including image wrappers, favorite icons,
 * author information, and hover animations.
 * 
 * @module WholeProductStyles
 */

/**
 * CSS module loader function type
 * Represents a function that processes and returns CSS content
 */
type CSSModuleLoader = (sourceMap: boolean) => CSSModule;

/**
 * CSS Module interface
 * Represents a CSS module with push capability for adding styles
 */
interface CSSModule {
  /**
   * Adds CSS content to the module
   * @param entry - Array containing module ID and CSS content string
   */
  push(entry: [string, string]): void;
}

/**
 * Webpack module export parameters
 */
interface WebpackModuleParams {
  /** Module exports object */
  exports: CSSModule;
  /** Module ID */
  id: string;
}

/**
 * CSS content for whole-product component
 * 
 * Styles include:
 * - `.whole-product-wrapper .whole-product-container`: Main container (244px × 197px)
 * - `.whole-product-content-image-wrapper`: Image wrapper with 137px height
 * - `.whole-product-content-image`: Centered product image with border-radius
 * - `.whole-product-favorite-icon`: Favorite icon positioned at top-left
 * - `.whole-product-icons-block`: Icon block positioned at top-right
 * - `.author-info`: Author information overlay with gradient background
 * - `.whole-product-content-info`: Product text information section (60px height)
 * - `.whole-product-text-container`: Text content with ellipsis overflow
 * - `.whole-product-icon-info`: Hidden icon information (visible on hover)
 * - `.whole-product-no-selection`: No selection message overlay
 * 
 * Animations:
 * - `wholeProductHover`: Scale and shadow animation for product card
 * - `open_product_img`: Scale and shadow animation for product image
 * 
 * @param exports - Webpack module exports object
 * @param id - Module identifier
 * @param loader - CSS module loader function (webpack require function)
 */
declare function moduleExport(
  exports: WebpackModuleParams,
  id: string,
  loader: (moduleId: number) => CSSModuleLoader
): void;

export default moduleExport;