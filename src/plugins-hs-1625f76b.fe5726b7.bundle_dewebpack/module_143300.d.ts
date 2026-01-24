/**
 * CSS Module Loader Type Definition
 * 
 * This module exports CSS styles for an image viewer modal component.
 * The styles are injected via webpack's css-loader.
 * 
 * @module ImageViewerModalStyles
 */

/**
 * CSS loader function type that processes CSS modules
 * 
 * @param sourceMap - Whether to include source maps in the output
 * @returns A CSS loader instance with push method for adding styles
 */
type CssLoaderFunction = (sourceMap: boolean) => CssLoader;

/**
 * CSS loader interface for managing stylesheets
 */
interface CssLoader {
  /**
   * Adds a CSS module to the loader
   * 
   * @param module - Tuple containing module ID and CSS content
   */
  push(module: [string, string]): void;
}

/**
 * Webpack module definition for CSS styles
 * 
 * @param exports - Module exports object
 * @param module - Current module metadata
 * @param require - Webpack require function for loading dependencies
 */
declare function cssModule(
  exports: Record<string, unknown>,
  module: { id: string; exports: unknown },
  require: CssLoaderFunction
): void;

/**
 * CSS content for the image viewer modal component
 * 
 * Styles include:
 * - `.ant-modal-confirm.imageViewerModal` - Main modal container with rounded corners
 * - `.image-viewer-content` - Content area with fixed height (550px)
 * - `.image-viewer-action` - Action button bar positioned at bottom center
 * - Hides default Ant Design modal buttons
 */
declare const imageViewerModalStyles: string;

export default cssModule;
export { imageViewerModalStyles, CssLoader, CssLoaderFunction };