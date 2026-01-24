/**
 * Webpack CSS loader module export
 * 
 * This module exports CSS styles for a property bar color picker component.
 * The styles define a grid-based layout with specific column templates and styling
 * for various child elements including switches, labels, and select controls.
 * 
 * @module PropertyBarColorPickerStyles
 */

/**
 * Type definition for Webpack CSS loader function
 * 
 * @param strict - When false, allows non-strict CSS processing
 * @returns A CSS loader instance with a push method for adding CSS rules
 */
type CSSLoaderFunction = (strict: boolean) => CSSLoader;

/**
 * CSS loader interface that provides methods to manage CSS content
 */
interface CSSLoader {
  /**
   * Adds a CSS rule to the loader
   * 
   * @param rule - A tuple containing the module ID and CSS content string
   */
  push(rule: [moduleId: string, cssContent: string]): void;
}

/**
 * Webpack module context
 */
interface WebpackModuleExports {
  /** The exports object to be populated by the module */
  exports: CSSLoader;
  
  /** Unique identifier for this module */
  id: string;
}

/**
 * Webpack require function for loading dependencies
 * 
 * @param moduleId - The numeric ID of the module to require
 * @returns The required module's exports
 */
type WebpackRequire = (moduleId: number) => CSSLoaderFunction;

/**
 * Module factory function signature
 * 
 * @param exports - The module's exports object
 * @param require - Webpack's require function for loading dependencies
 * @param module - The current module context
 */
export type ModuleFactory = (
  module: WebpackModuleExports,
  exports: unknown,
  require: WebpackRequire
) => void;

/**
 * CSS class definitions for the property bar color picker component
 */
export interface PropertyBarColorPickerStyles {
  /** Main container class with grid layout (96px and 112px columns) */
  'property-bar-colorpicker': string;
  
  /** Switch variant with modified grid template (72px, 36px, 100px columns) */
  'property-bar-colorpicker__switch': string;
  
  /** Homestyler UI components text styling within the color picker */
  'property-bar-colorpicker .homestyler-ui-components.homestyler-smart-text': string;
  
  /** Label styling for switches (60px width, gray color) */
  'property-bar-colorpicker .switch-label': string;
  
  /** Select dropdown styling (24px height, aligned to end) */
  'property-bar-colorpicker .tp-select': string;
  
  /** Select container value styling (18px height) */
  'property-bar-colorpicker .tp-select-container-value': string;
}

/**
 * CSS content exported by this module
 * 
 * Defines styles for:
 * - Grid-based layout with specific column configurations
 * - Switch controls with labels
 * - Text components with 12px font size
 * - Select dropdowns with custom heights
 * - Color scheme using #888888 for labels
 */
export const cssContent: string;