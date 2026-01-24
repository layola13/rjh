/**
 * CSS module export for spark_pic_right_panel component styles
 * @module SparkPicRightPanelStyles
 */

/**
 * CSS module loader function type
 * Represents a webpack css-loader module that exports CSS content as a string array
 * 
 * @param exports - The module exports object to be populated
 * @param require - The module require function for loading dependencies
 * @param module - The current module object containing metadata
 */
declare function CssModuleLoader(
  exports: CssModuleExports,
  require: RequireFunction,
  module: ModuleObject
): void;

/**
 * CSS module exports interface
 * Provides methods for managing CSS content as string arrays
 */
interface CssModuleExports {
  /**
   * CSS content identifier (module ID)
   */
  id: string | number;

  /**
   * Adds CSS rules to the export
   * @param content - Array containing module ID and CSS string content
   */
  push(content: [string | number, string]): void;
}

/**
 * Module require function interface
 * Used to load webpack module dependencies
 * 
 * @param moduleId - The numeric ID of the module to require
 * @returns The required module's exports
 */
interface RequireFunction {
  (moduleId: number): CssLoaderApi;
}

/**
 * CSS Loader API interface
 * Represents the css-loader module (ID: 986380) that processes CSS content
 * 
 * @param sourceMap - Whether to generate source maps for the CSS
 * @returns A CSS module exports object with push method
 */
interface CssLoaderApi {
  (sourceMap: boolean): CssModuleExports;
}

/**
 * Module object interface
 * Contains metadata about the current webpack module
 */
interface ModuleObject {
  /**
   * Unique identifier for this module
   */
  id: string | number;

  /**
   * The exports object that will be returned when this module is required
   */
  exports: CssModuleExports;
}

/**
 * Spark Picture Right Panel CSS Styles
 * 
 * This module contains all CSS rules for the spark_pic_right_panel component including:
 * - Main panel positioning and layout (.spark_pic_right_panel)
 * - Header section styles (.header)
 * - Camera settings container with custom scrollbar (.camera_setting)
 * - Larger panel variant (.larger_panel)
 * - Camera switch bar with Ant Design switch component overrides (.camera-switch-bar)
 * 
 * The styles include custom scrollbar theming, switch component customizations,
 * and responsive layout rules for absolute-positioned panels.
 */
export {};