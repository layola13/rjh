/**
 * CSS Module for Image Cropper Component
 * 
 * This module exports CSS styles for an image cropping interface with the following features:
 * - Draggable and resizable crop box
 * - Anchor points for precise positioning
 * - Image mask overlay
 * - Resize handles on all edges and corners
 * - Smooth animations and transitions
 * 
 * @module ImageCropperStyles
 */

/**
 * Webpack module loader function type
 * 
 * @param exports - The module exports object
 * @param require - The require function for loading dependencies
 * @param module - The current module object with id property
 */
type WebpackModuleLoader = (
  exports: WebpackExports,
  require: WebpackRequire,
  module: WebpackModule
) => void;

/**
 * Webpack module exports object
 */
interface WebpackExports {
  /** Module exports, typically containing the compiled CSS */
  exports?: unknown;
  [key: string]: unknown;
}

/**
 * Webpack require function for loading dependencies
 */
interface WebpackRequire {
  /**
   * Load a module by its ID
   * @param moduleId - The unique identifier of the module to load
   * @returns The loaded module's exports
   */
  (moduleId: number): CssLoader;
}

/**
 * Webpack module object
 */
interface WebpackModule {
  /** Unique module identifier */
  id: number | string;
  /** Module exports */
  exports: unknown;
  [key: string]: unknown;
}

/**
 * CSS loader module interface
 * Represents the css-loader webpack plugin that processes CSS files
 */
interface CssLoader {
  /**
   * Process CSS content
   * 
   * @param sourceMaps - Whether to include source maps
   * @returns CSS loader instance with push method
   */
  (sourceMaps: boolean): CssLoaderInstance;
}

/**
 * CSS loader instance with push method for adding CSS rules
 */
interface CssLoaderInstance {
  /**
   * Add CSS content to the loader
   * 
   * @param entry - Tuple containing module ID and CSS content
   */
  push(entry: [moduleId: number | string, cssContent: string]): void;
}

/**
 * CSS class names exported by this module
 */
export interface ImageCropperClasses {
  /** Main container for the image with dragging disabled */
  'img-box': string;
  
  /** Circular anchor point for positioning */
  'anchor-point': string;
  
  /** Semi-transparent mask overlay on the image */
  'img-mask': string;
  
  /** Draggable crop box container */
  'clip-box': string;
  
  /** Image viewport container with overflow hidden */
  'img-view': string;
  
  /** Base class for resize handles */
  'handle': string;
  
  /** Top edge resize handle */
  'handle-top': string;
  
  /** Bottom edge resize handle */
  'handle-bottom': string;
  
  /** Left edge resize handle */
  'handle-left': string;
  
  /** Right edge resize handle */
  'handle-right': string;
  
  /** Resize handle interaction area */
  'handle-area': string;
  
  /** Top-left corner resize handle */
  'handle-lefttop': string;
  
  /** Bottom-left corner resize handle */
  'handle-leftbottom': string;
  
  /** Top-right corner resize handle */
  'handle-righttop': string;
  
  /** Bottom-right corner resize handle */
  'handle-rightbottom': string;
  
  /** Animation transition class */
  'animation': string;
}

/**
 * Default export - CSS module class names
 */
declare const classes: ImageCropperClasses;
export default classes;