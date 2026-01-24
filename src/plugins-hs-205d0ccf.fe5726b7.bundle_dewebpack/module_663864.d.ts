/**
 * CSS Module Type Definition
 * 
 * This module exports CSS styles for a teaching view component.
 * The styles define layout, positioning, and appearance for various
 * elements within the teaching interface.
 * 
 * @module TeachingViewStyles
 */

/**
 * CSS module loader function signature
 * 
 * @param exports - The module exports object to be populated
 * @param require - The require function for loading dependencies
 * @param moduleLoader - The CSS loader function from webpack
 * @returns void
 */
declare function cssModuleLoader(
  exports: CSSModuleExports,
  require: NodeRequire,
  moduleLoader: CSSLoaderFunction
): void;

/**
 * CSS loader function type
 * Processes CSS content and returns a pushable array interface
 * 
 * @param sourceMap - Whether to include source maps (false for production)
 * @returns An object with a push method for adding CSS rules
 */
type CSSLoaderFunction = (sourceMap: boolean) => CSSModulePusher;

/**
 * CSS module pusher interface
 * Allows pushing CSS content with module metadata
 */
interface CSSModulePusher {
  /**
   * Push CSS content to the module
   * 
   * @param content - Tuple containing module ID and CSS string
   */
  push(content: [moduleId: string, css: string]): void;
}

/**
 * CSS Module exports object
 */
interface CSSModuleExports {
  /** The module ID */
  id: string;
  
  /** The exported module content */
  exports: CSSContent;
}

/**
 * CSS content structure
 * Contains the processed CSS rules and class names
 */
interface CSSContent {
  /** CSS class names exported by this module */
  readonly locals?: Record<string, string>;
  
  /** Raw CSS content as string */
  toString(): string;
}

/**
 * Teaching view CSS class names
 * Auto-generated from the CSS module
 */
export interface TeachingViewStyles {
  /** Main container class for the teaching view (100% width/height, flex column layout) */
  'teaching-view': string;
  
  /** Top navigation/header wrapper (fixed height: 62px) */
  'teaching-top-wrapper': string;
  
  /** Main content area wrapper (flexible, scrollable) */
  'teaching-content-wrapper': string;
  
  /** Absolute positioned view container (fills parent) */
  'view-wrapper': string;
  
  /** Loading spinner/indicator container (centered, absolute positioning) */
  'teaching-loading-wrapper': string;
  
  /** Scroll-to-top button (positioned bottom-right) */
  'to-top-btn': string;
  
  /** Perfect scrollbar Y-axis rail override (transparent background) */
  'ps__rail-y': string;
}

export default cssModuleLoader;