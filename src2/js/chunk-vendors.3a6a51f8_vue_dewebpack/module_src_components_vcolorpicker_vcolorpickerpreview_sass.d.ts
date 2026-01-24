/**
 * VColorPicker Preview Component Styles
 * 
 * This module contains the styles for the VColorPicker preview component.
 * As a Sass module, it doesn't export any runtime JavaScript values.
 * 
 * @module VColorPickerPreview
 * @packageDocumentation
 */

/**
 * Sass style module for VColorPicker preview component.
 * This module is imported for its side effects (CSS injection) and does not export any values.
 * 
 * @remarks
 * This is a style-only module that gets processed by webpack's style-loader.
 * It applies visual styling to the color picker preview area.
 */
declare module '*/VColorPickerPreview.sass' {
  /**
   * No exports - this module is imported for side effects only.
   * The styles are automatically injected into the document when imported.
   */
  const styles: void;
  export = styles;
}

/**
 * Alternative module declaration for direct path imports
 */
declare module './src/components/VColorPicker/VColorPickerPreview.sass' {
  const styles: void;
  export = styles;
}