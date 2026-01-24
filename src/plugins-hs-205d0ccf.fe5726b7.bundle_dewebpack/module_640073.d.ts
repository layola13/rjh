/**
 * Webpack CSS loader module type definition
 * This module exports CSS styles for the status bar component
 * Original Module ID: 640073
 */

/**
 * Module factory function type for Webpack CSS loader
 * @param exports - The module exports object
 * @param module - The module metadata object containing id and other properties
 * @param require - The Webpack require function for loading dependencies
 */
type CSSLoaderModuleFactory = (
  exports: CSSLoaderExports,
  module: WebpackModule,
  require: WebpackRequire
) => void;

/**
 * Webpack module metadata
 */
interface WebpackModule {
  /** Unique module identifier */
  id: string | number;
  /** Module exports object */
  exports: CSSLoaderExports;
  /** Whether the module has been loaded */
  loaded?: boolean;
}

/**
 * Webpack require function for dynamic module loading
 */
interface WebpackRequire {
  /** Load a module by ID */
  (moduleId: string | number): unknown;
}

/**
 * CSS loader exports interface
 * Provides methods for processing and bundling CSS content
 */
interface CSSLoaderExports {
  /**
   * Push CSS content to the compilation
   * @param entry - Array containing module ID and CSS string content
   */
  push(entry: [string | number, string]): void;
  
  /** CSS content as string */
  toString(): string;
  
  /** Additional loader-specific properties */
  [key: string]: unknown;
}

/**
 * CSS Loader API function type
 * @param sourceMap - Whether to generate source maps for CSS
 * @returns CSS loader exports object with push and other methods
 */
type CSSLoaderAPI = (sourceMap: boolean) => CSSLoaderExports;

/**
 * Status bar CSS styles module
 * Contains all styling rules for the application status bar component including:
 * - Main status bar container positioning and layout
 * - Left status bar section with plugin containers
 * - Right status bar section with action buttons
 * - View switcher component styles
 * - Disabled state styles
 * - Responsive styling and hover effects
 */
declare module "module_640073" {
  const factory: CSSLoaderModuleFactory;
  export = factory;
}

/**
 * Status bar CSS class names available for use
 */
export interface StatusBarClassNames {
  /** Main status bar container */
  "status-bar": string;
  
  /** Disabled state modifier */
  "disable": string;
  
  /** Status bar content wrapper */
  "status-bar-contents": string;
  
  /** Hidden bar mixin class */
  "hidden-bar-mixin": string;
  
  /** Hidden bar state */
  "hidden-bar": string;
  
  /** Left section of status bar */
  "left-status-bar": string;
  
  /** Vertical divider in status bar */
  "vdivider-status-bar": string;
  
  /** Plugin container in status bar */
  "status-bar-plugin-container": string;
  
  /** View switcher component */
  "viewswitch": string;
  
  /** Views container */
  "views": string;
  
  /** View levels container */
  "viewlevels": string;
  
  /** Individual view item */
  "view": string;
  
  /** View image element */
  "img": string;
  
  /** View text label */
  "text": string;
  
  /** View dropdown arrow */
  "arrow": string;
  
  /** Active view state */
  "viewactive": string;
  
  /** Hotkey display in view */
  "hot-key-view": string;
  
  /** Right section of status bar */
  "right-status-bar": string;
  
  /** Fit button in 2D view */
  "fit-button-in-2d": string;
  
  /** Fit button in mix paint view */
  "fit-button-in-mixpaint": string;
  
  /** Image button wrapper */
  "imagebutton-wrapper": string;
  
  /** Empty right items state */
  "empty-right-items": string;
  
  /** Vertical divider element */
  "verticaldivider": string;
}