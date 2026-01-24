/**
 * CSS module definition for double slider component
 * @module DoubleSliderStyles
 */

/**
 * CSS module export function type
 * Represents a webpack CSS loader module that pushes styles to the compilation
 */
type CSSModuleExport = (useSourceMap: boolean) => {
  push: (entry: [string, string]) => void;
};

/**
 * Webpack module context
 * @param exports - Module exports object
 * @param module - Current module metadata
 * @param require - Webpack require function for importing dependencies
 */
declare function module_444300(
  exports: { exports?: unknown },
  module: { id: string; exports?: unknown },
  require: (moduleId: number) => CSSModuleExport
): void;

/**
 * Double slider component CSS styles
 * Contains styles for:
 * - Main wrapper (.double-slider-wrapper)
 * - Slider bar container (.slider-bar)
 * - Slider track segments (left/right/center)
 * - Draggable circle handle (.slider-circle)
 * - Label styling (.slider-label)
 * - Disabled state mask (.slider-disabled-mask)
 */
declare const styles: string;

export default module_444300;
export { styles };