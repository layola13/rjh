/**
 * Webpack CSS module loader export
 * This module exports CSS styles for camera position navigator and scrollbar components
 */

/**
 * CSS module loader function type
 * @param sourceMap - Whether to include source maps in the CSS output
 * @returns CSS loader instance with push method for adding style rules
 */
type CSSLoaderFunction = (sourceMap: boolean) => {
  /**
   * Adds a CSS rule to the module
   * @param rule - Tuple containing module ID and CSS content
   */
  push(rule: [string, string]): void;
};

/**
 * Webpack module definition for camera navigator styles
 * @param exports - Module exports object
 * @param module - Webpack module object containing module metadata
 * @param require - Webpack require function for loading dependencies
 */
declare module 'module_273391' {
  /**
   * Module exports interface
   */
  interface ModuleExports {
    /** Module identifier */
    id: string;
    /** CSS content array */
    content: Array<[string, string]>;
    /** Push method for adding CSS rules */
    push(rule: [string, string]): void;
  }

  /**
   * Webpack module object
   */
  interface WebpackModule {
    /** Unique module identifier */
    id: string;
    /** Module exports */
    exports: ModuleExports;
  }

  /**
   * Webpack require function
   * @param moduleId - The ID of the module to require
   * @returns The required module's exports
   */
  type WebpackRequire = (moduleId: number) => CSSLoaderFunction;

  /**
   * Main module function
   * @param module - Webpack module object
   * @param exports - Module exports object
   * @param require - Webpack require function
   */
  function moduleFunction(
    module: WebpackModule,
    exports: ModuleExports,
    require: WebpackRequire
  ): void;

  export = moduleFunction;
}

/**
 * CSS Styles Definition
 * 
 * This module contains styles for:
 * - .ps-scrollbar-x-rail: Hides horizontal scrollbar
 * - #cameraposition_overlay: Camera position overlay container
 * - #np_navigator: Camera navigator component with carousel functionality
 * - Camera item cards with hover and active states
 * - Responsive layouts for phone and tablet devices
 */
declare namespace CameraNavigatorStyles {
  /**
   * Scrollbar configuration
   */
  interface ScrollbarConfig {
    /** Horizontal scrollbar rail display state */
    xRailDisplay: 'none';
  }

  /**
   * Camera position overlay configuration
   */
  interface OverlayConfig {
    /** Visibility state */
    visibility: 'hidden' | 'visible';
    /** Position from left */
    left: string;
    /** Position from top */
    top: string;
    /** Position from bottom */
    bottom: string;
    /** Width percentage */
    width: string;
    /** Z-index layer */
    zIndex: number;
    /** Height */
    height: string;
  }

  /**
   * Camera item dimensions
   */
  interface CameraItemDimensions {
    /** Item height in pixels */
    height: number;
    /** Item width in pixels */
    width: number;
    /** Border radius in pixels */
    borderRadius: number;
    /** Border width in pixels */
    borderWidth: number;
  }

  /**
   * Navigator responsive breakpoints
   */
  interface NavigatorBreakpoints {
    /** Desktop height */
    desktop: number;
    /** Phone/Tablet height */
    mobile: number;
  }
}