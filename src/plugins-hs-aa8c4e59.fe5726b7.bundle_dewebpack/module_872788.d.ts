/**
 * CSS Module Export Type Definition
 * Module: module_872788
 * Original ID: 872788
 * 
 * @description Type definitions for webpack css-loader module export
 */

/**
 * CSS loader module interface
 * Represents the structure returned by webpack's css-loader
 */
interface CssLoaderModule {
  /**
   * Push method to add CSS content to the exports array
   * @param entry - Tuple containing module metadata and CSS content
   */
  push(entry: [moduleId: string, cssContent: string, sourceMap?: string]): void;
}

/**
 * Webpack module factory function signature
 * @param exports - The module.exports object to be populated
 * @param module - The current module object
 * @param require - Webpack's require function for loading dependencies
 */
type WebpackModuleFactory = (
  exports: { exports: CssLoaderModule },
  module: unknown,
  require: (moduleId: number) => (includeSourceMap: boolean) => CssLoaderModule
) => void;

/**
 * CSS class names exported by this module
 */
interface AutostylerRoomTypeTipStyles {
  /** Main container class for room type tip component */
  'autostyler-roomtype-tip': string;
  
  /** Action button within the tip component */
  'action-btn': string;
  
  /** Standalone action button class */
  'autostyler-roomtype-tip-action-btn': string;
  
  /** Tip image container */
  'tip-img': string;
}

/**
 * Module exports declaration
 * Contains CSS styling for autostyler room type tip component
 */
declare const styles: AutostylerRoomTypeTipStyles;

export default styles;