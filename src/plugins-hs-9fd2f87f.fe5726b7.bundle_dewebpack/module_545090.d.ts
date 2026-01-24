/**
 * Light Band Settings Panel CSS Module Type Definitions
 * 
 * This module exports CSS styles for a light band settings panel component.
 * The panel includes temperature controls, sliders, and action buttons.
 * 
 * @module LightBandSettingsPanelStyles
 */

/**
 * CSS module loader function type
 * Represents a webpack css-loader that processes CSS and returns a module array
 */
type CSSLoaderFunction = (useSourceMap: boolean) => CSSModuleExports;

/**
 * CSS Module exports structure
 * Contains the push method to add CSS content to the module system
 */
interface CSSModuleExports {
  /**
   * Pushes CSS content as a module entry
   * @param entry - Tuple containing module ID and CSS content string
   */
  push(entry: [string, string]): void;
}

/**
 * Asset URL resolver function
 * Converts asset references to properly formatted URLs for use in CSS
 * 
 * @param assetPath - The path or module reference to the asset
 * @returns Formatted URL string for CSS url() function
 */
type AssetURLResolver = (assetPath: string | number) => string;

/**
 * Webpack module context
 * Provides access to other modules in the bundle
 */
interface WebpackRequire {
  /**
   * Resolves and returns a module by its ID
   * @param moduleId - The unique identifier of the module to load
   * @returns The requested module's exports
   */
  (moduleId: number): any;
}

/**
 * Webpack module definition
 * Represents the structure of a webpack module
 */
interface WebpackModule {
  /** Unique module identifier */
  id: string;
  
  /** Module exports object */
  exports: any;
}

/**
 * Module factory function signature
 * Standard webpack module wrapper function
 * 
 * @param module - The module object to populate with exports
 * @param exports - Direct reference to module.exports
 * @param require - Webpack's require function for loading dependencies
 */
type ModuleFactory = (
  module: WebpackModule,
  exports: any,
  require: WebpackRequire
) => void;

/**
 * Light Band Settings Panel CSS Module
 * 
 * Defines all styles for the light band settings panel UI component including:
 * - Panel container and positioning
 * - Title bar with close button
 * - Body content area with controls
 * - Temperature selector with range slider
 * - Numeric input fields
 * - Action buttons (reset/confirm)
 * 
 * CSS class structure:
 * - `.light-band-settings-panel` - Root container
 * - `.panel-wrap` - Main panel wrapper
 * - `.panel-title` - Header section
 * - `.panel-body` - Content area with controls
 * - `.panel-bottom` - Footer with action buttons
 * 
 * @remarks
 * This module uses webpack's css-loader to inject styles into the page.
 * Asset URLs are resolved at build time using the asset resolver (module 992716).
 * The CSS includes cross-browser support for range inputs (webkit, moz, ms).
 * 
 * Dependencies:
 * - Module 992716: Asset URL resolver
 * - Module 986380: CSS loader factory
 * - Module 233253: Temperature gradient background image
 * - Module 540272: Range slider thumb image
 */
declare const lightBandSettingsPanelStyles: ModuleFactory;

export default lightBandSettingsPanelStyles;

/**
 * CSS class names available in this module
 */
export interface LightBandSettingsPanelClasses {
  /** Root container class */
  'light-band-settings-panel': string;
  
  /** Panel wrapper with positioning and z-index */
  'panel-wrap': string;
  
  /** Panel title/header section */
  'panel-title': string;
  
  /** Close button in title bar */
  'closeBtn': string;
  
  /** Main content body */
  'panel-body': string;
  
  /** Reminder text styling */
  'reminder-text': string;
  
  /** Top reminder text with padding */
  'reminder-text-top': string;
  
  /** Settings controls container */
  'settings-controls': string;
  
  /** Temperature label */
  'temperatureLabel': string;
  
  /** Image selector container */
  'imageselector': string;
  
  /** Image label (hidden) */
  'imglabel': string;
  
  /** Image div container */
  'imgdiv': string;
  
  /** Image button */
  'imgbtn': string;
  
  /** Temperature selector component */
  'temperSelector': string;
  
  /** Selector name label */
  'selectorname': string;
  
  /** Numeric input container */
  'numerInput': string;
  
  /** Input box field */
  'inputBox': string;
  
  /** Slider item container */
  'slider-item': string;
  
  /** Slider name label */
  'slider-name': string;
  
  /** Panel bottom section */
  'panel-bottom': string;
  
  /** Reset button */
  'resetbutton': string;
  
  /** Confirm button */
  'confirmbutton': string;
}