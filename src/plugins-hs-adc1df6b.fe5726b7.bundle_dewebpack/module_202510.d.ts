/**
 * CSS module export type definition for property-bar-roof-angle-input component
 * Module ID: 202510
 * 
 * This module exports CSS styles for a roof angle input component in the property bar.
 * It uses a webpack CSS loader to inject styles at runtime.
 */

/**
 * Webpack CSS loader push function type
 * @param data - Array containing module ID and CSS string content
 */
type CssLoaderPushFunction = (data: [string, string]) => void;

/**
 * CSS module exports interface
 * Represents the structure returned by the webpack CSS loader
 */
interface CssModuleExports {
  /** Unique module identifier */
  id: string;
  
  /** Push method to add CSS content to the loader */
  push: CssLoaderPushFunction;
  
  /** Additional properties that may be added by the CSS loader */
  [key: string]: unknown;
}

/**
 * Webpack CSS loader factory function
 * @param sourceMap - Whether to include source maps in the CSS output
 * @returns CSS module exports object with push method
 */
type CssLoaderFactory = (sourceMap: boolean) => CssModuleExports;

/**
 * Module factory function parameters
 * @param exports - The module exports object to be populated
 * @param module - The module object containing id and exports
 * @param require - Webpack's require function to load dependencies
 */
declare function moduleFactory(
  exports: Record<string, unknown>,
  module: { id: string; exports: CssModuleExports },
  require: (moduleId: number) => CssLoaderFactory
): void;

/**
 * CSS content for property-bar-roof-angle-input component
 * 
 * Styles include:
 * - .property-bar-roof-angle-input: Main container with flexbox layout (height: 36px)
 * - .property-bar-label: Label styling with gray color (#888888, font-size: 12px)
 * - .angle-input: Input field wrapper (width: 100px, height: 24px)
 * - .homestyler-numberinput variants: Specific styling for number input components
 * - .homestyler-numberinput-suffix: Suffix icon styling (font-size: 20px)
 */
export type PropertyBarRoofAngleInputStyles = CssModuleExports;

export default moduleFactory;