/**
 * CSS Module for property bar dropdown room type list component
 * Exports a stylesheet for webpack css-loader
 * @module PropertyBarDropdownRoomTypeList
 */

/**
 * Webpack module definition function
 * @param exports - The module exports object
 * @param module - The current module object
 * @param require - The webpack require function for loading dependencies
 */
declare function webpackModule(
  exports: CSSModuleExports,
  module: WebpackModule,
  require: WebpackRequire
): void;

/**
 * CSS Module exports interface
 */
interface CSSModuleExports {
  /** The module's unique identifier */
  id: string | number;
  /** The exported CSS content */
  exports?: unknown;
}

/**
 * Webpack module interface
 */
interface WebpackModule {
  /** The module's unique identifier */
  id: string | number;
  /** The module exports object */
  exports: CSSModuleExports;
  /** Whether the module has been loaded */
  loaded?: boolean;
}

/**
 * Webpack require function type
 * @param moduleId - The ID of the module to require
 * @returns The required module's exports
 */
type WebpackRequire = (moduleId: number) => CSSLoaderAPI;

/**
 * CSS Loader API interface
 * Represents the css-loader module (ID: 986380)
 */
interface CSSLoaderAPI {
  /**
   * Creates a CSS module with source map support
   * @param useSourceMap - Whether to include source maps
   * @returns A CSS module instance with push method
   */
  (useSourceMap: boolean): CSSModuleInstance;
}

/**
 * CSS Module instance with push method
 */
interface CSSModuleInstance {
  /**
   * Pushes a CSS entry to the module
   * @param entry - Tuple containing module ID and CSS content
   */
  push(entry: [moduleId: string | number, cssContent: string]): void;
}

/**
 * CSS class names for the property bar dropdown room type list component
 */
interface PropertyBarDropdownRoomTypeListStyles {
  /** Main container class for the dropdown room type list */
  'property-bar-dropdownroomtypelist': string;
  /** Label element class */
  'dropdownroomtypelist-label': string;
  /** Component wrapper class */
  'dropdownroomtypelist-comp': string;
  /** Component wrapper class when no selection */
  'dropdownroomtypelist-comp-none': string;
  /** TDesign select component class */
  'tp-select': string;
  /** TDesign select container class */
  'tp-select-container': string;
  /** TDesign input component class */
  'tp-input': string;
  /** TDesign input in inputting state */
  'tp-input__inputting': string;
  /** Countdown display element */
  'count-down': string;
  /** Countdown error state */
  'count-down__error': string;
  /** Hidden tooltip state for room name */
  'room-name-tooltip__hidden': string;
}

export type { 
  CSSModuleExports, 
  WebpackModule, 
  WebpackRequire, 
  CSSLoaderAPI, 
  CSSModuleInstance,
  PropertyBarDropdownRoomTypeListStyles 
};