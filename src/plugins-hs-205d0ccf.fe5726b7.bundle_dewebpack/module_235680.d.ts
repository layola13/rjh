/**
 * CSS Module for Camera Position Panel
 * 
 * This module exports CSS styles for the camera position component in the Spark Pic right panel.
 * It includes styles for tabs, camera position cards, refresh/delete actions, and intelligence camera positions.
 */

/**
 * CSS module loader function signature
 * @param exports - The module exports object
 * @param require - The require function for loading dependencies
 * @param module - The module metadata object
 */
type WebpackModuleFunction = (
  exports: ModuleExports,
  require: RequireFunction,
  module: Module
) => void;

/**
 * Module exports interface
 */
interface ModuleExports {
  /** Module ID */
  id: string;
  /** Exported values */
  exports: CssModuleExports;
}

/**
 * CSS Module exports interface
 */
interface CssModuleExports {
  /** Pushes CSS content to the stylesheet */
  push(content: [string, string]): void;
}

/**
 * Module metadata
 */
interface Module {
  /** Unique module identifier */
  id: string;
  /** Module exports */
  exports: CssModuleExports;
}

/**
 * Require function for loading dependencies
 */
interface RequireFunction {
  /** 
   * Load a module by ID
   * @param moduleId - The numeric ID of the module to load
   */
  (moduleId: number): unknown;
}

/**
 * Camera position card configuration
 */
interface CameraPositionCard {
  /** Card width in pixels */
  width: 96;
  /** Card height in pixels */
  height: 60;
  /** Bottom margin in pixels */
  marginBottom: 35;
  /** Border radius in pixels */
  borderRadius: 4;
}

/**
 * Intelligence camera position configuration
 */
interface IntelligenceCameraPosition {
  /** Image width in pixels */
  imageWidth: 96;
  /** Image height in pixels */
  imageHeight: 60;
  /** Right margin in pixels */
  marginRight: 8;
  /** Bottom margin in pixels */
  marginBottom: 15;
}

/**
 * Camera position panel style configuration
 */
interface CameraPositionStyles {
  /** Panel padding configuration */
  padding: {
    top: 0;
    right: 16;
    bottom: 26;
    left: 16;
  };
  /** Card dimensions */
  card: CameraPositionCard;
  /** Intelligence position configuration */
  intelligencePosition: IntelligenceCameraPosition;
  /** Color scheme */
  colors: {
    textPrimary: 'rgba(255, 255, 255, 0.9)';
    background: '#494A4C';
    cardBackground: '#1c1c1c';
    primary: '#396efe';
    white: '#ffffff';
    black: '#000000';
  };
}

/**
 * CSS loader utility type
 */
type CssLoader = (useSourceMap: boolean) => CssModuleExports;

/**
 * Asset URL resolver utility type
 */
type AssetResolver = (assetPath: string) => string;

declare module 'module_235680' {
  /**
   * Camera position panel CSS module
   * 
   * Provides styling for:
   * - Camera position tabs and navigation
   * - Camera position cards with hover states
   * - Delete and refresh actions
   * - Intelligence-generated camera positions
   * - Add new position button
   * 
   * @remarks
   * This module is part of the Spark Pic right panel component system
   * and requires the Homestyler UI component library.
   */
  const cameraPositionStyles: CssModuleExports;
  export default cameraPositionStyles;
}