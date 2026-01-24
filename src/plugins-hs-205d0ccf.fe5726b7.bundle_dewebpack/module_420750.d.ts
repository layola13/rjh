/**
 * CSS Module Loader Type Definition
 * 
 * This module exports CSS styles for the render preview widget component.
 * It uses a CSS-in-JS loader to inject styles into the application.
 */

/**
 * CSS loader function type
 * @param sourceMap - Whether to include source maps for debugging
 * @returns CSS loader instance with push method
 */
type CSSLoaderFunction = (sourceMap: boolean) => CSSLoader;

/**
 * CSS Loader instance interface
 * Provides methods to add CSS content to the style bundle
 */
interface CSSLoader {
  /**
   * Add CSS content to the loader
   * @param entry - Tuple containing module ID and CSS content string
   */
  push(entry: [string, string]): void;
}

/**
 * Webpack module interface
 */
interface WebpackModule {
  /** Unique module identifier */
  id: string;
  /** Module exports object */
  exports: unknown;
}

/**
 * Module factory function signature
 * @param module - The webpack module object
 * @param exports - The module exports object
 * @param require - The webpack require function to load dependencies
 */
type ModuleFactory = (
  module: WebpackModule,
  exports: Record<string, unknown>,
  require: (moduleId: number) => CSSLoaderFunction
) => void;

/**
 * Render Preview Widget CSS Module
 * 
 * Defines styles for:
 * - `.renderpreviewwidget-wrapper` - Main container (36×36px flex layout)
 * - `.renderpreviewwidget-center` - Center content area (26×26px clickable)
 * - `.renderpreviewwidget-image` - Image display element
 * - `.renderpreviewwidget-triangle` - Triangle indicator (CSS border trick)
 * - `.render-preview-dialog` - Modal dialog with dark theme (#323237)
 * - `.render-preview-dialog-img` - Preview image (450px height)
 * - `.pano-preview-viewer` - Panoramic viewer (800×450px)
 * - `.render-preview-tips-*` - Tooltip and preview tips styling
 * 
 * Color scheme:
 * - Primary background: #323237 (dark gray)
 * - Text: #ffffff (white)
 * - Accent: #327dff (blue)
 * - Secondary text: #959595 (light gray)
 * - Borders: #19191e (very dark gray)
 */
declare const cssModule: string;

export default cssModule;