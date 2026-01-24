/**
 * Image Cropper Module Type Definitions
 * 
 * This module provides type definitions for an image cropper component with
 * desktop and mobile responsive layouts, based on Cropper.js v1.5.12.
 * 
 * @module ImageCropperStyles
 * @see https://fengyuanchen.github.io/cropperjs
 */

/**
 * CSS module loader function type
 * Used by webpack's css-loader to inject styles into the build
 */
type CSSLoaderFunction = (useSourceMap: boolean) => CSSModule;

/**
 * CSS Module interface representing the exported CSS content
 */
interface CSSModule {
  /**
   * Pushes CSS content into the module exports array
   * @param content - Array containing module ID and CSS string
   */
  push(content: [string, string]): void;
}

/**
 * Webpack module export structure for CSS styles
 */
interface CSSModuleExports {
  /** Module identifier */
  id: string;
  
  /** Module exports containing the CSS loader result */
  exports: CSSModule;
}

/**
 * Webpack require function for loading dependencies
 * 
 * @param moduleId - The numeric or string identifier of the module to load
 * @returns The loaded module's exports
 */
type WebpackRequire = (moduleId: number | string) => unknown;

/**
 * Asset URL helper function
 * Processes asset paths (e.g., images) for use in CSS url() values
 * 
 * @param assetPath - The path to the asset file
 * @returns Processed URL string suitable for CSS
 */
type AssetURLHelper = (assetPath: string) => string;

/**
 * Main module factory function signature
 * Standard webpack module wrapper pattern
 * 
 * @param module - The module object containing id and exports
 * @param exports - Direct reference to module.exports
 * @param require - Webpack's require function for loading dependencies
 */
type ModuleFactory = (
  module: CSSModuleExports,
  exports: CSSModule,
  require: WebpackRequire
) => void;

/**
 * Image Cropper Component Style Classes
 * 
 * This interface defines all CSS class names available in the cropper component.
 * The component supports both desktop and mobile layouts with comprehensive
 * cropping controls.
 */
interface ImageCropperStyleClasses {
  /** Main container class for the cropper component */
  'aimaterial-cropper-container': string;
  
  /** Hidden state modifier */
  'hidden': string;
  
  /** Mobile layout modifier */
  'mobile': string;
  
  /** Header section containing title and close button */
  'image-cropper-header': string;
  
  /** Title text element */
  'image-cropper-title': string;
  
  /** Close button element */
  'close-button': string;
  
  /** Wrapper for the cropper canvas area */
  'cropper-wrapper': string;
  
  /** Main cropper.js container */
  'cropper-container': string;
  
  /** Action buttons container (desktop) */
  'action-buttons': string;
  
  /** Reset/cancel button (desktop) */
  'reset-button': string;
  
  /** Confirm/apply button (desktop) */
  'confirm-button': string;
  
  /** Action buttons container (mobile) */
  'mobile-action-buttons': string;
  
  /** Cancel button (mobile) */
  'cancel-button': string;
  
  /** Complete/done button (mobile) */
  'complete-button': string;
  
  // Cropper.js internal classes
  
  /** Wrapping box for the cropper */
  'cropper-wrap-box': string;
  
  /** Canvas element containing the image */
  'cropper-canvas': string;
  
  /** Draggable area box */
  'cropper-drag-box': string;
  
  /** Crop selection box */
  'cropper-crop-box': string;
  
  /** Modal overlay outside crop area */
  'cropper-modal': string;
  
  /** Visible crop area viewport */
  'cropper-view-box': string;
  
  /** Dashed grid lines */
  'cropper-dashed': string;
  
  /** Horizontal dashed line */
  'dashed-h': string;
  
  /** Vertical dashed line */
  'dashed-v': string;
  
  /** Center point indicator */
  'cropper-center': string;
  
  /** Crop box face (main area) */
  'cropper-face': string;
  
  /** Resize line handle */
  'cropper-line': string;
  
  /** East (right) line */
  'line-e': string;
  
  /** North (top) line */
  'line-n': string;
  
  /** West (left) line */
  'line-w': string;
  
  /** South (bottom) line */
  'line-s': string;
  
  /** Resize point handle */
  'cropper-point': string;
  
  /** East (right) point */
  'point-e': string;
  
  /** North (top) point */
  'point-n': string;
  
  /** West (left) point */
  'point-w': string;
  
  /** South (bottom) point */
  'point-s': string;
  
  /** Northeast (top-right) corner point */
  'point-ne': string;
  
  /** Northwest (top-left) corner point */
  'point-nw': string;
  
  /** Southwest (bottom-left) corner point */
  'point-sw': string;
  
  /** Southeast (bottom-right) corner point */
  'point-se': string;
  
  /** Invisible state class */
  'cropper-invisible': string;
  
  /** Background pattern class */
  'cropper-bg': string;
  
  /** Hide with zero dimensions */
  'cropper-hide': string;
  
  /** Completely hidden (display: none) */
  'cropper-hidden': string;
  
  /** Move cursor state */
  'cropper-move': string;
  
  /** Crop/crosshair cursor state */
  'cropper-crop': string;
  
  /** Disabled state modifier */
  'cropper-disabled': string;
}

/**
 * Module exports
 * The module exports a CSS module object that can be pushed to webpack's compilation
 */
declare const cropperStyles: CSSModule;

export default cropperStyles;
export type { 
  CSSLoaderFunction, 
  CSSModule, 
  CSSModuleExports, 
  WebpackRequire, 
  AssetURLHelper, 
  ModuleFactory,
  ImageCropperStyleClasses 
};