/**
 * CSS Module Loader Type Definition
 * 
 * This module exports CSS styles for an image card component.
 * The styles are processed through a CSS loader (likely css-loader).
 */

/**
 * CSS loader function type that processes CSS content
 * 
 * @param sourceMap - Whether to generate source maps for the CSS
 * @returns A CSS loader instance with a push method
 */
type CSSLoaderFactory = (sourceMap: boolean) => CSSLoader;

/**
 * CSS Loader instance that collects CSS modules
 */
interface CSSLoader {
  /**
   * Adds a CSS module to the loader
   * 
   * @param module - Tuple containing module ID and CSS content
   */
  push(module: [string, string]): void;
}

/**
 * Webpack module wrapper parameters
 */
interface WebpackModuleParams {
  /** Module exports object */
  exports: {
    /** CSS loader instance to be assigned */
    [key: string]: unknown;
  };
  /** Module ID */
  id: string;
}

/**
 * Module loader function signature
 * 
 * @param moduleExports - The exports object for this module
 * @param moduleMetadata - Metadata containing module ID
 * @param requireFunction - Webpack require function to load dependencies
 */
type ModuleLoader = (
  moduleExports: WebpackModuleParams['exports'],
  moduleMetadata: { id: string },
  requireFunction: (moduleId: number) => CSSLoaderFactory
) => void;

/**
 * CSS styles for the image card component
 * 
 * Styles include:
 * - Base card layout with flexbox centering
 * - Hover effects with opacity changes
 * - Completed state styling
 * - Progress indicator area
 * - Failed state with error icon
 * - Tooltip items display on hover
 */
declare const imageCardStyles: ModuleLoader;

export default imageCardStyles;

/**
 * CSS Class Names exported by this module:
 * 
 * @property {string} image-card - Base card container with flex layout
 * @property {string} image-card.completed - Completed state variant
 * @property {string} image-card.failed - Failed state variant with error icon
 * @property {string} img - Image element styles with object-fit
 * @property {string} check-more - Centered overlay element (hidden by default)
 * @property {string} tooltip-items - Bottom tooltip bar with action items
 * @property {string} progress-area - Progress indicator container
 * @property {string} failed-icon - Error indicator icon for failed state
 */
export interface ImageCardClassNames {
  'image-card': string;
  'img': string;
  'check-more': string;
  'tooltip-items': string;
  'progress-area': string;
  'failed-icon': string;
}