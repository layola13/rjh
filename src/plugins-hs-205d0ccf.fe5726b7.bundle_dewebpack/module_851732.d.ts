/**
 * CSS Module Export Type Definition
 * Original Module ID: 851732
 * 
 * This module exports CSS styles for a picture view switcher component.
 * The component provides a floating control panel for switching between different view modes (e.g., 2D/3D).
 */

/**
 * CSS Module Loader Function Type
 * @param useSourceMap - Whether to include source maps in the CSS output
 * @returns CSS loader instance with push method for adding style rules
 */
type CSSModuleLoader = (useSourceMap: boolean) => {
  /**
   * Adds a CSS module to the stylesheet collection
   * @param moduleData - Tuple containing module ID and CSS content
   */
  push(moduleData: [moduleId: string, cssContent: string]): void;
};

/**
 * Webpack Module Definition
 * @param exports - The module exports object
 * @param module - The webpack module object
 * @param require - The webpack require function for loading dependencies
 */
declare function module_851732(
  exports: Record<string, unknown>,
  module: { id: string; exports: Record<string, unknown> },
  require: (moduleId: number) => CSSModuleLoader
): void;

/**
 * CSS Class Names exported by this module
 */
export interface SparkPicSwitchViewStyles {
  /** Main container for the view switch control panel */
  'spark_pic_switch-view-container': string;
  
  /** Individual switch item button */
  'switch-item': string;
  
  /** 3D view switch button with additional left margin */
  'switch-3d': string;
  
  /** Active state for the currently selected view */
  'switch-active': string;
}

/**
 * CSS Module Exports
 * Contains style definitions for a floating view switcher component with:
 * - Absolute positioning at bottom-left of parent
 * - Semi-transparent dark background
 * - Hover and active state styling
 * - Support for multiple view modes (2D/3D)
 */
declare const styles: SparkPicSwitchViewStyles;

export default styles;