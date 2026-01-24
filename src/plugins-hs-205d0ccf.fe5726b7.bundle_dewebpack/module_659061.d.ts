/**
 * Camera clip component CSS module definition
 * This module exports CSS styles for camera clipping UI controls
 * 
 * @module CameraClipStyles
 */

/**
 * CSS module loader function type
 * @param shouldUseSourceMap - Whether to include source maps in the output
 * @returns CSS module with push method for adding styles
 */
type CSSModuleLoader = (shouldUseSourceMap: boolean) => CSSModule;

/**
 * CSS module interface with push method for registering styles
 */
interface CSSModule {
  /**
   * Adds CSS content to the module
   * @param styleEntry - Tuple containing module ID and CSS content
   */
  push(styleEntry: [string, string]): void;
}

/**
 * Webpack module interface
 */
interface WebpackModule {
  /** Module ID */
  id: string;
  /** Module exports */
  exports: CSSModule;
}

/**
 * Camera clip styles export function
 * Loads and registers CSS styles for the camera clip component including:
 * - Title bar with switch control
 * - Slider controls for clip adjustments
 * - Disabled state styles
 * - Ant Design component customizations
 * 
 * @param module - Webpack module object
 * @param exports - Module exports object (unused)
 * @param require - Webpack require function to load the CSS loader
 */
declare function exportCameraClipStyles(
  module: WebpackModule,
  exports: unknown,
  require: (moduleId: number) => CSSModuleLoader
): void;

/**
 * Camera clip component CSS class names
 */
interface CameraClipClassNames {
  /** Main container class */
  'camera-clip': string;
  /** Title section class */
  'title': string;
  /** Title span element */
  'title-span': string;
  /** Icon view class */
  'hs-iconfont-view': string;
  /** Toggle switch class */
  'camera-clip-switch': string;
  /** Content section class */
  'content': string;
  /** Slider container class */
  'camera-clip-slider-container': string;
  /** Disabled clip state class */
  'disable-clip': string;
  /** Camera clip slider wrapper class */
  'camera-clip-slider': string;
}

/**
 * CSS style content for camera clip component
 * Includes styles for:
 * - Title bar layout and styling (50px height, flexbox alignment)
 * - Custom switch component (30x17px, blue #396efe background)
 * - Slider controls with custom handle styling
 * - Disabled states with reduced opacity
 * - Ant Design component overrides
 */
declare const cameraClipStyles: string;

export { CameraClipClassNames, cameraClipStyles, exportCameraClipStyles };