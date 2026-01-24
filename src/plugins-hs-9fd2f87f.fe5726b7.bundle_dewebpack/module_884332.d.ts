/**
 * CSS Module Definition
 * Module: module_884332
 * Original ID: 884332
 * 
 * This module exports CSS styles for a light slot preview panel component.
 * It includes styles for panel layout, radio buttons, sliders, toggle buttons,
 * and ceiling indicator elements.
 */

/**
 * Webpack CSS loader module factory function type
 * @param exports - The module exports object
 * @param require - The module require function
 * @param module - The current module object
 */
type CSSModuleFactory = (
  exports: CSSModuleExports,
  require: WebpackRequire,
  module: WebpackModule
) => void;

/**
 * CSS module exports interface
 */
interface CSSModuleExports {
  /** Module ID */
  id: string | number;
  /** CSS content exports */
  exports: CSSExport[];
  /** Push method to add CSS content */
  push: (content: [string | number, string]) => void;
}

/**
 * CSS export tuple: [module_id, css_content, source_map?]
 */
type CSSExport = [string | number, string, string?];

/**
 * Webpack require function interface
 */
interface WebpackRequire {
  (moduleId: number | string): unknown;
}

/**
 * Webpack module object
 */
interface WebpackModule {
  /** Unique module identifier */
  id: string | number;
  /** Module exports */
  exports: CSSModuleExports;
  /** Module loaded status */
  loaded?: boolean;
}

/**
 * CSS loader function that returns a module export handler
 * @param sourceMap - Whether to include source maps
 * @returns A function that processes CSS content
 */
declare function cssLoader(sourceMap: boolean): {
  push: (content: CSSExport) => void;
};

/**
 * Light Slot Preview Panel CSS Styles
 * 
 * Contains comprehensive styling for:
 * - Panel wrapper and layout (.panel-wrap)
 * - Panel title (.panel-title)
 * - Radio button controls (.react-radio)
 * - Slider input components (.slider-input)
 * - Toggle button controls (.toggle-button)
 * - Panel body container (.panel-body)
 * - Action buttons (.createcustomizedmodelbuttons)
 * - Ceiling indicator (.ceiling-indicator)
 * - Slot elements (.slot, .slot-flipped)
 * - Preview image display (.preview-image)
 */
declare const styles: string;

export { CSSModuleFactory, CSSModuleExports, CSSExport, WebpackRequire, WebpackModule, styles };
export default CSSModuleFactory;