/**
 * Carousel panel navigation styles module
 * @module CarouselPanelNavStyles
 */

/**
 * CSS module loader function signature
 * @param useSourceMap - Whether to include source maps in the CSS output
 * @returns CSS loader instance with push method
 */
type CSSLoaderFactory = (useSourceMap: boolean) => CSSLoader;

/**
 * CSS loader interface for managing stylesheet modules
 */
interface CSSLoader {
  /**
   * Adds CSS content to the loader
   * @param entry - Tuple containing module ID and CSS content string
   */
  push(entry: [string, string]): void;
}

/**
 * Webpack module exports interface
 */
interface ModuleExports {
  /** The exported CSS loader instance */
  exports: CSSLoader;
  
  /** Unique identifier for this module */
  id: string;
}

/**
 * Carousel panel navigation stylesheet module
 * Defines styles for carousel navigation components including container, items, images and labels
 * 
 * @param moduleExports - Webpack module exports object
 * @param _unusedExports - Unused exports parameter (placeholder)
 * @param requireFn - Webpack require function for loading dependencies
 * 
 * @remarks
 * This module exports CSS styles for:
 * - `.carousel-panel-nav` - Main navigation wrapper with inline-flex display
 * - `.carousel-panel-nav-container` - Container with fixed dimensions (550x90px)
 * - `.carousel-panel-nav-item` - Individual navigation items with column layout
 * - `.carousel-panel-nav-item-img` - Thumbnail images (85x48px) with hover effects
 * - `.carousel-panel-nav-item-label` - Text labels using PingFangSC-Regular font
 * - `.carousel-panel-nav-item--active` - Active state with blue border (#396efe)
 */
declare function carouselPanelNavStylesModule(
  moduleExports: ModuleExports,
  _unusedExports: unknown,
  requireFn: (moduleId: number) => CSSLoaderFactory
): void;

export = carouselPanelNavStylesModule;