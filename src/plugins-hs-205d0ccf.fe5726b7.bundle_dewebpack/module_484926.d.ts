/**
 * CSS module loader type definition
 * Original module ID: 484926
 * 
 * This module exports task card component styles using a CSS-in-JS loader.
 * The styles define a card component with image container, selection states,
 * shadow effects, and responsive layout properties.
 */

/**
 * CSS module export function signature
 * @param exports - The module exports object to populate
 * @param moduleId - The unique module identifier
 * @param cssLoaderFactory - Factory function from the CSS loader (module 986380)
 */
declare function cssModuleLoader(
  exports: CSSModuleExports,
  moduleId: string | number,
  cssLoaderFactory: CSSLoaderFactory
): void;

/**
 * CSS loader factory function that creates a CSS module loader
 * @param sourceMap - Whether to include source maps in the output
 * @returns CSS loader instance with push method
 */
interface CSSLoaderFactory {
  (sourceMap: boolean): CSSLoader;
}

/**
 * CSS loader instance that processes and registers CSS content
 */
interface CSSLoader {
  /**
   * Registers CSS content with the loader
   * @param entry - Tuple containing module ID and CSS string content
   */
  push(entry: [string | number, string]): void;
}

/**
 * Module exports object for CSS modules
 */
interface CSSModuleExports {
  /** Exported module identifier */
  id: string | number;
  
  /** Additional module metadata and methods */
  [key: string]: unknown;
}

/**
 * Task card component CSS classes
 * 
 * Available classes:
 * - `.task-card` - Main container (136px height, 15px bottom margin)
 * - `.task-card .box` - Inner box (220x124px, 10px border radius, dark background)
 * - `.task-card.selected .box` - Selected state with blue border
 * - `.task-card.selected::after` - Left-pointing arrow indicator for selected state
 * - `.task-card .image-container` - Flexbox container for centered image content
 * - `.task-card .image-container .img` - Absolutely positioned centered image
 * - `.task-card .image-container .img-num` - Badge overlay showing image count
 * - `.task-card .image-container .progress-area` - Progress indicator area (80% width)
 * - `.task-card .shadow` - Shadow layer effect
 * - `.task-card .shadow.index-1` - Secondary shadow layer with different offset
 */
declare const CSS_CONTENT: string;

export = cssModuleLoader;